import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const traverse = traverseModule.default;
const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, 'src');
const backupRoot = process.argv[2];
const applyChanges = process.argv.includes('--apply');

if (!backupRoot) {
  throw new Error('Usage: node scripts/i18n-migrate.mjs <backup-directory> [--apply]');
}

const cachePath = path.join(backupRoot, 'translation-cache.json');
const planPath = path.join(backupRoot, 'i18n-migration-plan.json');
const enPath = path.join(sourceRoot, 'locales', 'langs', 'en.json');
const zhPath = path.join(sourceRoot, 'locales', 'langs', 'zh.json');

if (process.argv.includes('--repair-icon-data')) {
  const relativeIconDataPath = path.join('src', 'lib', 'iconify', 'icon-datasets.js');
  fs.copyFileSync(
    path.join(backupRoot, 'files', relativeIconDataPath),
    path.join(projectRoot, relativeIconDataPath),
  );
  for (const localePath of [enPath, zhPath]) {
    const locale = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    if (locale.ui?.lib?.iconify) delete locale.ui.lib.iconify.icon_datasets;
    fs.writeFileSync(localePath, `${JSON.stringify(locale, null, 2)}\n`);
  }
  process.stdout.write('Restored icon dataset and removed accidental locale entries.\n');
  process.exit(0);
}
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
const validationMethods = new Set([
  'email',
  'max',
  'min',
  'matches',
  'notOneOf',
  'oneOf',
  'required',
  'typeError',
]);
const technicalOnly =
  /^(?:FFA-X|API|URL|ID|HTTP|HTTPS|USD|EUR|BDT|CNY|INR|SAR|JavaScript|TypeScript|React|MUI|CRM|HRM|FAQ|JWT|Firebase|Auth0|Figma|Webflow|GitHub|Google|Microsoft|Apple|YouTube|LinkedIn|Instagram|Facebook|Twitter|Stripe|PayPal|Visa|Mastercard|AWS|Azure|Slack|Dropbox|Zoom|Adobe|Photoshop|Illustrator|Jira|Asana|Trello|Notion|GitLab|Discord|HTML|CSS|JSON|CSV|PDF|PNG|JPG|JPEG|SVG|MP3|MP4)$/i;
const technicalPattern =
  /^(?:https?:\/\/|www\.|mailto:|tel:|#[0-9a-f]{3,8}$|[A-Z]:\\|\/[^ ]+\/|[a-z]+\.[a-z0-9]{2,5}$|<[^>]+>)/i;
const glossary = {
  'Add to cart': '加入购物车',
  'Out of stock': '缺货',
  Account: '账户',
  Admin: '管理端',
  Analytics: '数据分析',
  Apps: '应用',
  Arabic: '阿拉伯语',
  Aurora: 'FFA-X',
  Boards: '看板',
  Cart: '购物车',
  Checkout: '结算',
  Confirm: '确认',
  Create: '创建',
  Customer: '客户',
  Default: '默认',
  Discard: '放弃更改',
  English: '英语',
  Error: '错误',
  Export: '导出',
  Filter: '筛选',
  Homepage: '首页',
  Import: '导入',
  Landing: '落地页',
  Light: '浅色',
  Dark: '深色',
  Member: '成员',
  Misc: '其他',
  Notifications: '通知',
  Order: '订单',
  Pages: '页面',
  Pipeline: '流程',
  Products: '商品',
  Save: '保存',
  Scheduler: '日程安排',
  Search: '搜索',
  Select: '选择',
  Starter: '起始页',
  State: '状态',
  Status: '状态',
  System: '跟随系统',
  Team: '团队',
  Total: '合计',
  Wishlist: '收藏夹',
  'Sign up': '注册',
  'Forgot password': '忘记密码',
  'Time Tracker': '工时追踪',
  'File manager': '文件管理',
  'Order list': '订单列表',
  'Product list': '商品列表',
  'Product listing': '商品目录',
  'Create order': '创建订单',
  'Invoice list': '发票列表',
  'Project Pages': '项目页面',
  'Team Member List': '团队成员列表',
  'Job list': '职位列表',
  'New Member': '新增成员',
};

const walkFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(absolute);
    return /\.(?:js|jsx)$/.test(entry.name) ? [absolute] : [];
  });

const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const splitSentenceFragments = new Set([
  'and',
  'at',
  'for',
  'in',
  'of',
  'on',
  'or',
  'rmation',
  'than',
  'then',
  'to',
  'with',
  'you',
]);
const shouldTranslate = (value) => {
  const text = normalize(value);
  if (text.length < 2 || !/[A-Za-z]/.test(text)) return false;
  if (splitSentenceFragments.has(text)) return false;
  if (Object.prototype.hasOwnProperty.call(glossary, text)) return true;
  if (technicalOnly.test(text) || technicalPattern.test(text)) return false;
  if (/^[A-Z0-9_-]{2,}$/.test(text)) return false;
  if (/^(?:[a-z][a-z0-9]*[-_][a-z0-9_-]+|gradient\d+|subtitle\d+|[a-z]\d+[a-z0-9]*)$/i.test(text))
    return false;
  if (/^(?:rgb|rgba|hsl|linear-gradient|radial-gradient|var)\(/i.test(text)) return false;
  return true;
};

const propertyName = (node) => {
  if (node?.type === 'Identifier') return node.name;
  if (node?.type === 'StringLiteral') return node.value;
  return null;
};

const componentFunction = (pathRef) => {
  let current = pathRef;
  while (current) {
    if (current.isFunctionDeclaration?.() && /^[A-Z]/.test(current.node.id?.name || '')) {
      return current;
    }
    if (
      (current.isArrowFunctionExpression?.() || current.isFunctionExpression?.()) &&
      current.parentPath?.isVariableDeclarator?.() &&
      /^[A-Z]/.test(current.parentPath.node.id?.name || '')
    ) {
      return current;
    }
    current = current.parentPath;
  }
  return null;
};

const featureFor = (file) => {
  const relative = path
    .relative(sourceRoot, file)
    .replaceAll('\\', '/')
    .replace(/\.(?:js|jsx)$/, '');
  const parts = relative.split('/').filter((part) => part !== 'index');
  if (parts[0] === 'components' && parts[1] === 'sections')
    return ['sections', ...parts.slice(2, 5)];
  if (parts[0] === 'pages') return ['pages', ...parts.slice(1, 4)];
  if (parts[0] === 'layouts') return ['layouts', ...parts.slice(1, 4)];
  if (parts[0] === 'data') return ['data', ...parts.slice(1, 4)];
  return [parts[0] || 'common', ...parts.slice(1, 3)];
};

const slug = (value) =>
  normalize(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 52) || 'text';

const keyFor = (file, value) => {
  const feature = featureFor(file)
    .map((part) => slug(part))
    .join('.');
  const hash = crypto.createHash('sha1').update(normalize(value)).digest('hex').slice(0, 8);
  return `ui.${feature}.${slug(value)}_${hash}`;
};

const protectTokens = (value) => {
  const tokens = [];
  const protectedText = value.replace(
    /(https?:\/\/\S+|\b\S+@\S+\.\S+\b|\{\{[^}]+\}\}|\$\{[^}]+\}|%[sdif]|#[A-Z0-9_-]+)/gi,
    (token) => {
      const marker = `ZZFFAXTOKEN${tokens.length}ZZ`;
      tokens.push(token);
      return marker;
    },
  );
  return {
    protectedText,
    restore: (translated) =>
      tokens.reduce(
        (result, token, index) => result.replaceAll(`ZZFFAXTOKEN${index}ZZ`, token),
        translated,
      ),
  };
};

const translateBatch = async (values) => {
  const separator = '[[[FFAX_SPLIT]]]';
  const protectedValues = values.map(protectTokens);
  const joined = protectedValues.map(({ protectedText }) => protectedText).join(`\n${separator}\n`);
  const url = new globalThis.URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', 'zh-CN');
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', joined);
  const response = await globalThis.fetch(url, {
    signal: globalThis.AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Translation request failed: ${response.status}`);
  const payload = await response.json();
  const translated = payload[0].map((part) => part[0]).join('');
  const parts = translated.split(separator).map((part) => part.trim());
  if (parts.length !== values.length) {
    throw new Error(`Translation batch mismatch: expected ${values.length}, got ${parts.length}`);
  }
  return parts.map((part, index) => protectedValues[index].restore(part));
};

const collectFile = (file) => {
  const source = fs.readFileSync(file, 'utf8');
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties', 'objectRestSpread', 'optionalChaining'],
  });
  const items = [];

  traverse(ast, {
    JSXText(pathRef) {
      if (shouldTranslate(pathRef.node.value)) {
        items.push({
          pathRef,
          node: pathRef.node,
          kind: 'jsx-text',
          value: normalize(pathRef.node.value),
        });
      }
    },
    JSXAttribute(pathRef) {
      const prop = pathRef.node.name?.name;
      if (
        visibleProps.has(prop) &&
        pathRef.node.value?.type === 'StringLiteral' &&
        shouldTranslate(pathRef.node.value.value)
      ) {
        items.push({
          pathRef,
          node: pathRef.node.value,
          kind: 'jsx-attribute',
          value: normalize(pathRef.node.value.value),
        });
      }
    },
    ObjectProperty(pathRef) {
      const prop = propertyName(pathRef.node.key);
      const value = pathRef.node.value?.value;
      if (
        objectVisibleKeys.has(prop) &&
        pathRef.node.value?.type === 'StringLiteral' &&
        shouldTranslate(value) &&
        !(prop === 'name' && /^[a-z][a-z0-9_-]*$/.test(value))
      ) {
        items.push({
          pathRef,
          node: pathRef.node.value,
          propertyNode: pathRef.node,
          propertyName: prop,
          kind: 'object-property',
          value: normalize(pathRef.node.value.value),
        });
      }
    },
    StringLiteral(pathRef) {
      if (pathRef.parentPath?.isJSXExpressionContainer?.() && shouldTranslate(pathRef.node.value)) {
        items.push({
          pathRef,
          node: pathRef.node,
          kind: 'jsx-expression',
          value: normalize(pathRef.node.value),
        });
      }
    },
    CallExpression(pathRef) {
      const method = propertyName(pathRef.node.callee?.property);
      if (!validationMethods.has(method)) return;
      for (const argument of pathRef.node.arguments) {
        if (argument.type === 'StringLiteral' && shouldTranslate(argument.value)) {
          items.push({
            pathRef,
            node: argument,
            kind: 'validation-message',
            value: normalize(argument.value),
          });
        }
      }
    },
  });

  return { file, source, items };
};

const files = walkFiles(sourceRoot)
  .map(collectFile)
  .filter(({ items }) => items.length);
const allValues = [...new Set(files.flatMap(({ items }) => items.map(({ value }) => value)))];
const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, 'utf8')) : {};

for (const [english, chinese] of Object.entries(glossary)) cache[english] = chinese;

const pending = allValues.filter((value) => !cache[value]);
const batches = [];
let batch = [];
let batchLength = 0;
for (const value of pending) {
  if (batch.length >= 24 || batchLength + value.length > 2800) {
    batches.push(batch);
    batch = [];
    batchLength = 0;
  }
  batch.push(value);
  batchLength += value.length;
}
if (batch.length) batches.push(batch);

if (applyChanges) {
  for (let index = 0; index < batches.length; index += 1) {
    const values = batches[index];
    let translated;
    try {
      translated = await translateBatch(values);
    } catch {
      translated = [];
      for (const value of values) {
        const [single] = await translateBatch([value]);
        translated.push(single);
      }
    }
    values.forEach((value, valueIndex) => {
      cache[value] = translated[valueIndex];
    });
    fs.writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
    process.stdout.write(`translated ${index + 1}/${batches.length}\n`);
  }
}

const migrationPlan = {
  sourceFiles: files.length,
  occurrences: files.reduce((total, file) => total + file.items.length, 0),
  uniqueStrings: allValues.length,
  untranslatedStrings: allValues.filter((value) => !cache[value]).length,
  files: files.map(({ file, items }) => ({
    file: path.relative(projectRoot, file).replaceAll('\\', '/'),
    occurrences: items.length,
  })),
};
fs.writeFileSync(planPath, `${JSON.stringify(migrationPlan, null, 2)}\n`);
process.stdout.write(
  `${JSON.stringify(
    {
      sourceFiles: migrationPlan.sourceFiles,
      occurrences: migrationPlan.occurrences,
      uniqueStrings: migrationPlan.uniqueStrings,
      untranslatedStrings: migrationPlan.untranslatedStrings,
      plannedFiles: migrationPlan.files.length,
      apply: applyChanges,
    },
    null,
    2,
  )}\n`,
);

if (!applyChanges) process.exit(0);
if (migrationPlan.untranslatedStrings) throw new Error('Translation cache is incomplete.');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const zh = JSON.parse(fs.readFileSync(zhPath, 'utf8'));
en.ui ||= {};
zh.ui ||= {};

const setNested = (target, key, value) => {
  const parts = key.split('.');
  let cursor = target;
  for (const part of parts.slice(1, -1)) cursor = cursor[part] ||= {};
  cursor[parts.at(-1)] = value;
};

for (const { file, source, items } of files) {
  const replacements = [];
  const hookFunctions = new Map();
  let needsI18n = false;

  for (const item of items) {
    const key = keyFor(file, item.value);
    setNested(en.ui, key, item.value);
    setNested(zh.ui, key, cache[item.value]);
    const owner = componentFunction(item.pathRef);
    const canUseHook = owner?.node.body?.type === 'BlockStatement';
    const translator = canUseHook ? 'translateUi' : 'i18n.t';

    if (canUseHook) hookFunctions.set(owner.node.body.start, owner.node.body);
    else needsI18n = true;

    if (item.kind === 'jsx-text') {
      replacements.push({
        start: item.node.start,
        end: item.node.end,
        text: `{${translator}('${key}')}`,
      });
    } else if (item.kind === 'jsx-attribute') {
      replacements.push({
        start: item.node.start,
        end: item.node.end,
        text: `{${translator}('${key}')}`,
      });
    } else if (item.kind === 'object-property' && !canUseHook) {
      const propertySource = source.slice(item.propertyNode.key.start, item.propertyNode.key.end);
      replacements.push({
        start: item.propertyNode.start,
        end: item.propertyNode.end,
        text: `get ${propertySource}() { return i18n.t('${key}'); }`,
      });
    } else {
      replacements.push({
        start: item.node.start,
        end: item.node.end,
        text: `${translator}('${key}')`,
      });
    }
  }

  for (const [bodyStart, body] of hookFunctions) {
    const bodySource = source.slice(body.start, body.end);
    if (!/\btranslateUi\s*[,}]?\s*=\s*useTranslation\(/.test(bodySource)) {
      replacements.push({
        start: bodyStart + 1,
        end: bodyStart + 1,
        text: '\n  const { t: translateUi } = useTranslation();',
      });
    }
  }

  let importText = '';
  if (hookFunctions.size && !source.includes("from 'react-i18next'")) {
    importText += "import { useTranslation } from 'react-i18next';\n";
  } else if (
    hookFunctions.size &&
    source.includes("from 'react-i18next'") &&
    !source.includes('useTranslation')
  ) {
    importText += "import { useTranslation } from 'react-i18next';\n";
  }
  if (needsI18n && !source.includes("from 'locales/i18n'")) {
    importText += "import i18n from 'locales/i18n';\n";
  }
  if (importText) {
    const directive = source.match(/^(['"]use client['"];\s*)/);
    const insertAt = directive ? directive[0].length : 0;
    replacements.push({ start: insertAt, end: insertAt, text: importText });
  }

  replacements.sort((a, b) => b.start - a.start || b.end - a.end);
  let output = source;
  let lastStart = Infinity;
  for (const replacement of replacements) {
    if (replacement.end > lastStart) continue;
    output = `${output.slice(0, replacement.start)}${replacement.text}${output.slice(replacement.end)}`;
    lastStart = replacement.start;
  }
  fs.writeFileSync(file, output);
}

fs.writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`);
fs.writeFileSync(zhPath, `${JSON.stringify(zh, null, 2)}\n`);
