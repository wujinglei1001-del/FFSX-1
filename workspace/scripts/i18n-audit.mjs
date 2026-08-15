import { parse } from '@babel/parser';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(process.cwd(), 'src');
const localeDir = path.join(root, 'locales', 'langs');
const visibleProps = new Set([
  'alt',
  'aria-label',
  'caption',
  'description',
  'emptyText',
  'helperText',
  'headerName',
  'label',
  'message',
  'noOptionsText',
  'placeholder',
  'primary',
  'secondary',
  'subheader',
  'subtitle',
  'text',
  'title',
  'tooltip',
]);
const objectVisibleKeys = new Set([
  'answer',
  'body',
  'caption',
  'content',
  'description',
  'helperText',
  'headerName',
  'label',
  'message',
  'placeholder',
  'question',
  'subheader',
  'subject',
  'subtitle',
  'text',
  'title',
]);
const allowedEnglish =
  /^(?:FFA-X|API|URL|ID|HTTP|HTTPS|USD|EUR|BDT|CNY|INR|SAR|JavaScript|TypeScript|React|MUI|CRM|HRM|FAQ|JWT|Firebase|Auth0|Figma|Webflow|GitHub|Google|Microsoft|Apple|YouTube|LinkedIn|Instagram|Facebook|Twitter|Stripe|PayPal|Visa|Mastercard|AWS|Azure|Slack|Dropbox|Zoom|Adobe|Photoshop|Illustrator|Jira|Asana|Trello|Notion|GitLab|Discord|HTML|CSS|JSON|CSV|PDF|PNG|JPG|JPEG|SVG|MP3|MP4|2FA|CVC|US|UK|SMS|ZIP|GB|GMT|EST|CET|ETA|UPC|EAN|GCID|TBA|CC|BCC|VIP|HR|AR|AI|MQL|SQL|LPCVD|PET-CT|W-8BEN|RTL|LTR|SAVE30|subtitle\d+)$/i;

const walkFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(absolute);
    return /\.(?:js|jsx)$/.test(entry.name) ? [absolute] : [];
  });

const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const looksVisible = (value) => {
  const text = normalize(value);
  if (text.length <= 1 || !/[A-Za-z]/.test(text) || allowedEnglish.test(text)) return false;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return false;
  if (/^\d+(?:\.\d+)?px(?:\s*!important)?$/i.test(text)) return false;
  if (/^(?:material-symbols(?:-light)?):[\w-]+$/i.test(text)) return false;
  if (/^(?:xs|sm|md|lg|xl|timeGridWeek)$/i.test(text)) return false;
  return true;
};

const keyName = (node) => {
  if (!node) return null;
  if (node.type === 'Identifier') return node.name;
  if (node.type === 'StringLiteral') return node.value;
  return null;
};

const candidates = [];
const parseFailures = [];
const transformedNonVisibleAttributes = [];
const transformedNameProperties = [];
const isTranslationCall = (node) =>
  node?.type === 'CallExpression' &&
  ((node.callee?.type === 'Identifier' && node.callee.name === 'translateUi') ||
    (node.callee?.type === 'MemberExpression' &&
      node.callee.object?.type === 'Identifier' &&
      node.callee.object.name === 'i18n' &&
      node.callee.property?.type === 'Identifier' &&
      node.callee.property.name === 't'));

for (const file of walkFiles(root)) {
  if (file.endsWith(path.join('src', 'lib', 'iconify', 'icon-datasets.js'))) continue;
  const source = fs.readFileSync(file, 'utf8');
  let ast;
  try {
    ast = parse(source, {
      sourceType: 'module',
      plugins: ['jsx', 'classProperties', 'objectRestSpread', 'optionalChaining'],
    });
  } catch (error) {
    parseFailures.push({ file: path.relative(process.cwd(), file), error: error.message });
    continue;
  }

  const add = (node, kind, value) => {
    const text = normalize(value);
    if (!looksVisible(text)) return;
    candidates.push({
      file: path.relative(process.cwd(), file).replaceAll('\\', '/'),
      line: node.loc?.start.line ?? 0,
      kind,
      text,
    });
  };

  const visit = (node, parent = null) => {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'JSXText') add(node, 'jsx-text', node.value);

    if (node.type === 'JSXAttribute') {
      const prop = node.name?.name;
      if (visibleProps.has(prop) && node.value?.type === 'StringLiteral') {
        add(node.value, `jsx-prop:${prop}`, node.value.value);
      }
      if (
        !visibleProps.has(prop) &&
        node.value?.type === 'JSXExpressionContainer' &&
        isTranslationCall(node.value.expression)
      ) {
        transformedNonVisibleAttributes.push({
          file: path.relative(process.cwd(), file).replaceAll('\\', '/'),
          line: node.loc?.start.line ?? 0,
          prop,
        });
      }
    }

    if (node.type === 'ObjectProperty') {
      const prop = keyName(node.key);
      if (objectVisibleKeys.has(prop) && node.value?.type === 'StringLiteral') {
        add(node.value, `object-prop:${prop}`, node.value.value);
      }
      if (prop === 'name' && isTranslationCall(node.value)) {
        transformedNameProperties.push({
          file: path.relative(process.cwd(), file).replaceAll('\\', '/'),
          line: node.loc?.start.line ?? 0,
        });
      }
    }

    if (
      node.type === 'StringLiteral' &&
      parent?.type === 'JSXExpressionContainer' &&
      looksVisible(node.value)
    ) {
      add(node, 'jsx-expression', node.value);
    }

    for (const [key, value] of Object.entries(node)) {
      if (key === 'loc' || key === 'start' || key === 'end') continue;
      if (Array.isArray(value)) value.forEach((child) => visit(child, node));
      else if (value && typeof value === 'object' && value.type) visit(value, node);
    }
  };

  visit(ast);
}

const flatten = (value, prefix = '', output = {}) => {
  for (const [key, child] of Object.entries(value)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object' && !Array.isArray(child))
      flatten(child, fullKey, output);
    else output[fullKey] = child;
  }
  return output;
};

const en = flatten(JSON.parse(fs.readFileSync(path.join(localeDir, 'en.json'), 'utf8')));
const zh = flatten(JSON.parse(fs.readFileSync(path.join(localeDir, 'zh.json'), 'utf8')));
const enKeys = Object.keys(en).sort();
const zhKeys = Object.keys(zh).sort();
const missingInZh = enKeys.filter((key) => !(key in zh));
const missingInEn = zhKeys.filter((key) => !(key in en));
const emptyZh = zhKeys.filter((key) => typeof zh[key] !== 'string' || !zh[key].trim());
const interpolationVariables = (value) =>
  [...String(value).matchAll(/{{\s*([\w.-]+)\s*}}/g)].map((match) => match[1]).sort();
const placeholderMismatches = enKeys.flatMap((key) => {
  if (!(key in zh)) return [];
  const enVariables = interpolationVariables(en[key]);
  const zhVariables = interpolationVariables(zh[key]);
  return JSON.stringify(enVariables) === JSON.stringify(zhVariables)
    ? []
    : [{ key, enVariables, zhVariables }];
});

const report = {
  summary: {
    scannedFiles: walkFiles(root).length,
    candidateCount: candidates.length,
    candidateFiles: new Set(candidates.map(({ file }) => file)).size,
    parseFailures: parseFailures.length,
    enKeys: enKeys.length,
    zhKeys: zhKeys.length,
    missingInZh: missingInZh.length,
    missingInEn: missingInEn.length,
    emptyZh: emptyZh.length,
    placeholderMismatches: placeholderMismatches.length,
    transformedNonVisibleAttributes: transformedNonVisibleAttributes.length,
    transformedNameProperties: transformedNameProperties.length,
  },
  missingInZh,
  missingInEn,
  emptyZh,
  placeholderMismatches,
  transformedNonVisibleAttributes,
  transformedNameProperties,
  parseFailures,
  candidates,
};

const outputPath = process.argv[2];
if (outputPath) fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
if (
  candidates.length ||
  parseFailures.length ||
  missingInZh.length ||
  missingInEn.length ||
  emptyZh.length ||
  placeholderMismatches.length ||
  transformedNonVisibleAttributes.length
) {
  process.exitCode = 2;
}
