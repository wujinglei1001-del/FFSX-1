import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';

const traverse = traverseModule.default;
const projectRoot = process.cwd();
const backupRoot = process.argv[2];
if (!backupRoot) throw new Error('Backup directory is required.');

const sourceRoot = path.join(projectRoot, 'src');
const backupFilesRoot = path.join(backupRoot, 'files');
const parseSource = (source) =>
  parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties', 'objectRestSpread', 'optionalChaining'],
  });
const propertyName = (node) => {
  if (node?.type === 'Identifier') return node.name;
  if (node?.type === 'StringLiteral') return node.value;
  return null;
};
const walkFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(absolute);
    return /\.(?:js|jsx)$/.test(entry.name) ? [absolute] : [];
  });
const collectNameMembers = (ast) => {
  const members = [];
  traverse(ast, {
    ObjectProperty(pathRef) {
      if (propertyName(pathRef.node.key) === 'name') members.push(pathRef.node);
    },
    ObjectMethod(pathRef) {
      if (propertyName(pathRef.node.key) === 'name') members.push(pathRef.node);
    },
  });
  return members.sort((a, b) => a.start - b.start);
};
const writeWithRetry = async (file, content) => {
  for (let attempt = 1; attempt <= 10; attempt += 1) {
    try {
      fs.writeFileSync(file, content);
      return;
    } catch (error) {
      if (attempt === 10) throw error;
      await delay(attempt * 50);
    }
  }
};

let repairedFiles = 0;
let repairedNames = 0;
let cleanedImports = 0;
const mismatches = [];
for (const currentFile of walkFiles(sourceRoot)) {
  const relative = path.relative(projectRoot, currentFile);
  const backupFile = path.join(backupFilesRoot, relative);
  if (!fs.existsSync(backupFile)) continue;
  const currentSource = fs.readFileSync(currentFile, 'utf8');
  const originalSource = fs.readFileSync(backupFile, 'utf8');
  const currentMembers = collectNameMembers(parseSource(currentSource));
  const originalMembers = collectNameMembers(parseSource(originalSource));
  if (currentMembers.length !== originalMembers.length) {
    mismatches.push({ relative, current: currentMembers.length, original: originalMembers.length });
    continue;
  }
  const replacements = [];
  for (let index = 0; index < originalMembers.length; index += 1) {
    const original = originalMembers[index];
    const current = currentMembers[index];
    if (original.type !== 'ObjectProperty' || original.value?.type !== 'StringLiteral') continue;
    const currentText = currentSource.slice(current.start, current.end);
    if (!/(?:i18n\.t|translateUi)\(['"]ui\./.test(currentText)) continue;
    replacements.push({
      start: current.start,
      end: current.end,
      text: originalSource.slice(original.start, original.end),
    });
  }
  if (!replacements.length) continue;
  let output = currentSource;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    output = `${output.slice(0, replacement.start)}${replacement.text}${output.slice(replacement.end)}`;
  }
  await writeWithRetry(currentFile, output);
  repairedFiles += 1;
  repairedNames += replacements.length;
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
  if (output !== source) {
    await writeWithRetry(file, output);
    cleanedImports += 1;
  }
}

process.stdout.write(
  `${JSON.stringify({ repairedFiles, repairedNames, cleanedImports, mismatches }, null, 2)}\n`,
);
if (mismatches.length) process.exitCode = 1;
