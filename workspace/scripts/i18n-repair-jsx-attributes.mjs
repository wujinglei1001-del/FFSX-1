import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const traverse = traverseModule.default;
const projectRoot = process.cwd();
const backupRoot = process.argv[2];
if (!backupRoot) throw new Error('Backup directory is required.');

const sourceRoot = path.join(projectRoot, 'src');
const backupFilesRoot = path.join(backupRoot, 'files');
const visibleProps = new Set([
  'alt',
  'aria-label',
  'caption',
  'description',
  'emptyText',
  'helperText',
  'label',
  'noOptionsText',
  'placeholder',
  'subtitle',
  'text',
  'title',
]);

const parseSource = (source) =>
  parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties', 'objectRestSpread', 'optionalChaining'],
  });

const attributeName = (node) => (node?.name?.type === 'JSXIdentifier' ? node.name.name : null);
const isTranslationCall = (node) =>
  node?.type === 'CallExpression' &&
  ((node.callee?.type === 'Identifier' && node.callee.name === 'translateUi') ||
    (node.callee?.type === 'MemberExpression' &&
      node.callee.object?.type === 'Identifier' &&
      node.callee.object.name === 'i18n' &&
      node.callee.property?.type === 'Identifier' &&
      node.callee.property.name === 't'));

const walkFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(absolute);
    return /\.(?:js|jsx)$/.test(entry.name) ? [absolute] : [];
  });

const collectAttributes = (ast) => {
  const byName = new Map();
  traverse(ast, {
    JSXAttribute(pathRef) {
      const name = attributeName(pathRef.node);
      if (!name) return;
      const entries = byName.get(name) ?? [];
      entries.push(pathRef.node);
      byName.set(name, entries);
    },
  });
  return byName;
};

let repairedFiles = 0;
let repairedAttributes = 0;
const mismatches = [];

for (const currentFile of walkFiles(sourceRoot)) {
  const relative = path.relative(projectRoot, currentFile);
  const backupFile = path.join(backupFilesRoot, relative);
  if (!fs.existsSync(backupFile)) continue;

  const currentSource = fs.readFileSync(currentFile, 'utf8');
  const originalSource = fs.readFileSync(backupFile, 'utf8');
  const currentByName = collectAttributes(parseSource(currentSource));
  const originalByName = collectAttributes(parseSource(originalSource));
  const replacements = [];

  for (const [name, currentAttributes] of currentByName) {
    if (visibleProps.has(name)) continue;
    const originalAttributes = originalByName.get(name) ?? [];
    if (currentAttributes.length !== originalAttributes.length) {
      const translatedCount = currentAttributes.filter(
        (attribute) =>
          attribute.value?.type === 'JSXExpressionContainer' &&
          isTranslationCall(attribute.value.expression),
      ).length;
      if (translatedCount) {
        mismatches.push({
          relative,
          name,
          current: currentAttributes.length,
          original: originalAttributes.length,
          translatedCount,
        });
      }
      continue;
    }

    for (let index = 0; index < currentAttributes.length; index += 1) {
      const current = currentAttributes[index];
      const original = originalAttributes[index];
      if (
        current.value?.type !== 'JSXExpressionContainer' ||
        !isTranslationCall(current.value.expression)
      ) {
        continue;
      }
      if (
        original.value?.type !== 'JSXExpressionContainer' ||
        original.value.expression?.type !== 'StringLiteral'
      ) {
        continue;
      }
      replacements.push({
        start: current.value.expression.start,
        end: current.value.expression.end,
        text: originalSource.slice(original.value.expression.start, original.value.expression.end),
      });
    }
  }

  if (!replacements.length) continue;
  let output = currentSource;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    output = `${output.slice(0, replacement.start)}${replacement.text}${output.slice(replacement.end)}`;
  }
  fs.writeFileSync(currentFile, output);
  repairedFiles += 1;
  repairedAttributes += replacements.length;
}

for (const file of walkFiles(sourceRoot)) {
  const source = fs.readFileSync(file, 'utf8');
  let output = source;
  if ((output.match(/\bi18n\b/g) ?? []).length === 1) {
    output = output.replace(/^import i18n from 'locales\/i18n';\r?\n/m, '');
  }
  if ((output.match(/\btranslateUi\b/g) ?? []).length === 1) {
    output = output.replace(/^\s*const \{ t: translateUi \} = useTranslation\(\);\r?\n/m, '');
  }
  if ((output.match(/\buseTranslation\b/g) ?? []).length === 1) {
    output = output.replace(/^import \{ useTranslation \} from 'react-i18next';\r?\n/m, '');
  }
  if (output !== source) fs.writeFileSync(file, output);
}

process.stdout.write(
  `${JSON.stringify({ repairedFiles, repairedAttributes, mismatches }, null, 2)}\n`,
);
if (mismatches.length) process.exitCode = 1;
