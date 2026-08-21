import fs from 'node:fs';
import path from 'node:path';

const workspaceRoot = process.cwd();
const srcRoot = path.join(workspaceRoot, 'src');

const sourceExtensions = ['.js', '.jsx', '.mjs', '.cjs', '.json', '.css', '.scss'];
const crawlableExtensions = new Set(sourceExtensions);
const repositoryTextExtensions = new Set([
  ...sourceExtensions,
  '.ts',
  '.tsx',
  '.sql',
  '.md',
  '.html',
  '.sh',
  '.ps1',
  '.yml',
  '.yaml',
  '.toml',
  '.xml',
  '.txt',
  '.env',
  '.example',
]);
const repositoryIgnoredDirectories = new Set([
  '.git',
  '.medusa',
  '.mercur',
  '.turbo',
  '.vite',
  'node_modules',
  'dist',
  'dist-root',
  'build',
  'coverage',
]);
const repositoryIgnoredFiles = new Set([
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
]);

const bundleDefinitions = [
  {
    name: 'root-home',
    entry: path.join(srcRoot, 'root-main.jsx'),
    aliases: new Map([
      ['routes/paths', path.join(srcRoot, 'routes/production-paths.js')],
      ['locales/langs/en.json', path.join(srcRoot, 'locales/production/en.json')],
      ['locales/langs/zh.json', path.join(srcRoot, 'locales/production/zh.json')],
    ]),
  },
  {
    name: 'workbench',
    entry: path.join(srcRoot, 'main.jsx'),
    aliases: new Map([
      ['routes/router', path.join(srcRoot, 'routes/production-router.jsx')],
      ['routes/sitemap', path.join(srcRoot, 'routes/production-sitemap.js')],
      ['routes/paths', path.join(srcRoot, 'routes/production-paths.js')],
      ['locales/langs/en.json', path.join(srcRoot, 'locales/production/en.json')],
      ['locales/langs/zh.json', path.join(srcRoot, 'locales/production/zh.json')],
    ]),
  },
];

const residualRules = [
  { id: 'old-brand-aurora', pattern: /\baurora\b/i },
  { id: 'old-vendor', pattern: /themeforest|bootstrapdash|ui-lib|envato/i },
  { id: 'figma-preview-link', pattern: /figma\.com\/(?:design|proto|file)/i },
  {
    id: 'old-demo-copy',
    pattern:
      /remote teams?|remote work|skyline innovations|quantum leap initiative|ecovision project|front-end development|limitless ltd|madeline wuntch|sophia perez|terry jeffords|jake peralta|amy santiago|rosa diaz|gina linetti|raymond holt|charles boyle|kevin cozner|carry williams|carrie williams|jordan smith|alex johnson|trusted by creators worldwide|modern and beautiful ui|supported languages|real time team chat/i,
  },
  { id: 'old-promo-copy', pattern: /book a demo|try our app|live preview/i },
  {
    id: 'invalid-navigation-target',
    pattern:
      /\b(?:href|to)\s*=\s*(?:["'](?:\s*|#|javascript:[^"']*)["']|\{\s*["'](?:\s*|#|javascript:[^"']*)["']\s*\})/i,
  },
  {
    id: 'old-auth-provider',
    pattern:
      /VITE_(?:AUTH0|FIREBASE|AZURE_AD|GOOGLE_CLIENT_ID)|Auth(?:0|Firebase|Jwt)Provider|firebase\/auth|@auth0\//i,
  },
  {
    id: 'placeholder-data',
    pattern: /lorem ipsum|dummy data|mock data|placeholder data|sample data/i,
  },
  {
    id: 'placeholder-identity',
    pattern: /\b(?:acme corp|john doe|jane doe)\b|[A-Za-z0-9._%+-]+@example\.com\b/i,
  },
  {
    id: 'forbidden-ui-shell',
    pattern: /<iframe\b|\bMicroAppHost\b|\bIntegrationControlPlane\b|\bMyWorkspace\b/i,
  },
  {
    id: 'forbidden-css-injection',
    pattern:
      /createElement\(\s*['"]style['"]\s*\)|dangerouslySetInnerHTML|document\.head\.append|\.insertRule\s*\(|new\s+CSSStyleSheet\s*\(/i,
  },
  {
    id: 'forbidden-ffax-platform-shell',
    pattern: /\bFFAX_PLATFORM\b/,
  },
  {
    id: 'legacy-template-route',
    pattern: /\/(?:dashboard\/(?:ecommerce|crm|analytics|hrm|hiring)|apps\/(?:ecommerce|crm|hrm|hiring))\b/i,
  },
  {
    id: 'legacy-public-showcase-route',
    pattern: /["']\/showcase["']/i,
  },
  {
    id: 'legacy-public-homepage-route',
    pattern: /["']\/pages\/landing\/homepage["']/i,
  },
  {
    id: 'runtime-not-connected',
    pattern:
      /\b(?:plugin|connector)_runtime_not_connected\b|["']not_connected["']|\.status\(\s*501\s*\)/i,
  },
];

const reviewedExceptions = [
  {
    rule: 'old-demo-copy',
    file: 'src/components/sections/landing/about-us/OurMission.jsx',
    disposition: 'pending-approved-figma-copy',
  },
  {
    rule: 'old-demo-copy',
    file: 'src/components/sections/landing/about-us/Team.jsx',
    disposition: 'user-directed-keep-non-ceo-members',
  },
  {
    rule: 'runtime-not-connected',
    file: 'src/locales/production/en.json',
    disposition: 'runtime-contract-localization-key',
  },
  {
    rule: 'runtime-not-connected',
    file: 'src/locales/production/zh.json',
    disposition: 'runtime-contract-localization-key',
  },
];

const normalize = (filePath) => path.relative(workspaceRoot, filePath).replaceAll('\\', '/');

const isFile = (filePath) => {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
};

const isDirectory = (filePath) => {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
};

const resolveCandidate = (candidate) => {
  if (isFile(candidate)) return candidate;

  if (!path.extname(candidate)) {
    for (const extension of sourceExtensions) {
      const withExtension = `${candidate}${extension}`;
      if (isFile(withExtension)) return withExtension;
    }
  }

  if (isDirectory(candidate)) {
    for (const extension of sourceExtensions) {
      const indexFile = path.join(candidate, `index${extension}`);
      if (isFile(indexFile)) return indexFile;
    }
  }

  return null;
};

const extractSpecifiers = (source) => {
  const specifiers = new Set();
  const patterns = [
    /(?:import|export)\s+(?:[^'";]*?\s+from\s*)?['"]([^'"]+)['"]/g,
    /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /@import\s+(?:url\()?\s*['"]?([^'"\)\s;]+)['"]?\s*\)?/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) specifiers.add(match[1]);
  }

  return [...specifiers];
};

const resolveSpecifier = (specifier, importer, aliases) => {
  const cleanSpecifier = specifier.split('?')[0].split('#')[0];
  if (!cleanSpecifier || /^(?:node:|data:|https?:|virtual:)/.test(cleanSpecifier)) return null;

  const exactAlias = aliases.get(cleanSpecifier);
  if (exactAlias) return resolveCandidate(exactAlias);

  if (cleanSpecifier.startsWith('.')) {
    return resolveCandidate(path.resolve(path.dirname(importer), cleanSpecifier));
  }

  return resolveCandidate(path.join(srcRoot, cleanSpecifier));
};

const looksLocal = (specifier) => {
  if (specifier.startsWith('.')) return true;
  const firstSegment = specifier.split('/')[0];
  return isDirectory(path.join(srcRoot, firstSegment));
};

const crawlBundle = ({ name, entry, aliases }) => {
  const visited = new Set();
  const pending = [entry];
  const unresolved = [];

  while (pending.length > 0) {
    const current = pending.pop();
    if (!current || visited.has(current)) continue;
    visited.add(current);

    const extension = path.extname(current).toLowerCase();
    if (!crawlableExtensions.has(extension) || extension === '.json') continue;

    const source = fs.readFileSync(current, 'utf8');
    for (const specifier of extractSpecifiers(source)) {
      const resolved = resolveSpecifier(specifier, current, aliases);
      if (resolved) {
        if (!visited.has(resolved)) pending.push(resolved);
      } else if (looksLocal(specifier)) {
        unresolved.push({ importer: normalize(current), specifier });
      }
    }
  }

  return {
    name,
    entry: normalize(entry),
    files: [...visited].sort().map(normalize),
    unresolved: unresolved.sort((a, b) =>
      `${a.importer}:${a.specifier}`.localeCompare(`${b.importer}:${b.specifier}`),
    ),
  };
};

const enumerateSourceFiles = (directory) => {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...enumerateSourceFiles(absolute));
    else if (sourceExtensions.includes(path.extname(entry.name).toLowerCase())) files.push(absolute);
  }
  return files;
};

const enumerateRepositoryTextFiles = (directory) => {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    const relative = normalize(absolute);

    if (entry.isDirectory()) {
      if (
        repositoryIgnoredDirectories.has(entry.name) ||
        relative === 'docs/api-integrations/reports' ||
        relative.startsWith('docs/api-integrations/reports/')
      ) {
        continue;
      }
      files.push(...enumerateRepositoryTextFiles(absolute));
      continue;
    }

    if (repositoryIgnoredFiles.has(entry.name)) continue;

    const extension = path.extname(entry.name).toLowerCase();
    if (
      repositoryTextExtensions.has(extension) ||
      entry.name === 'Dockerfile' ||
      entry.name === '.gitignore' ||
      entry.name.startsWith('.env')
    ) {
      files.push(absolute);
    }
  }

  return files;
};

const exceptionFor = (rule, file) =>
  reviewedExceptions.find((item) => item.rule === rule && item.file === file)?.disposition ?? null;

const scanFiles = (files, reachableByFile, dispositionFor = exceptionFor) => {
  const findings = [];
  let linesScanned = 0;

  for (const file of files) {
    const relativeFile = normalize(file);
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    linesScanned += lines.length;

    lines.forEach((line, index) => {
      for (const rule of residualRules) {
        if (!rule.pattern.test(line)) continue;
        findings.push({
          rule: rule.id,
          file: relativeFile,
          line: index + 1,
          reachableBy: reachableByFile.get(relativeFile) ?? [],
          disposition: dispositionFor(rule.id, relativeFile, line),
          text: line.trim().slice(0, 240),
        });
      }
    });
  }

  return { findings, linesScanned };
};

const collectTranslationKeys = (files) => {
  const keys = new Set();
  const dynamicCalls = [];
  const literalCall = /(?:\btranslateUi|\bi18n\.t|\bt)\s*\(\s*['"]([^'"]+)['"]/g;
  const localeKeyLiteral = /['"`]((?:ffax|ui|common_labels)\.[A-Za-z0-9_.-]+)['"`]/g;
  const anyCall = /(?:\btranslateUi|\bi18n\.t)\s*\(([^\n]*)/g;

  for (const file of files) {
    if (!['.js', '.jsx', '.mjs', '.cjs'].includes(path.extname(file).toLowerCase())) continue;
    const relativeFile = normalize(file);
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(literalCall)) keys.add(match[1]);
    for (const match of source.matchAll(localeKeyLiteral)) keys.add(match[1]);

    const lines = source.split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const match of line.matchAll(anyCall)) {
        if (/^\s*['"]/.test(match[1])) continue;
        dynamicCalls.push({ file: relativeFile, line: index + 1, text: line.trim().slice(0, 240) });
      }
    });
  }

  return { keys: [...keys].sort(), dynamicCalls };
};

const collectPublicAssetReferences = (files, reachableByFile) => {
  const references = [];
  const publicAssetPattern = /assetsDir|['"`]\/(?:assets|images)\//;
  for (const file of files) {
    if (!['.js', '.jsx', '.mjs', '.cjs', '.css', '.scss'].includes(path.extname(file))) continue;
    const relativeFile = normalize(file);
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, index) => {
        if (!publicAssetPattern.test(line)) return;
        references.push({
          file: relativeFile,
          line: index + 1,
          reachableBy: reachableByFile.get(relativeFile) ?? [],
          text: line.trim().slice(0, 240),
        });
      });
  }
  return references;
};

const collectBrowserLoopbackReferences = (files, reachableByFile) => {
  const references = [];
  const browserLoopbackPattern = /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/i;

  for (const file of files) {
    if (!['.js', '.jsx', '.mjs', '.cjs', '.json', '.css', '.scss'].includes(path.extname(file))) {
      continue;
    }

    const relativeFile = normalize(file);
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, index) => {
        if (!browserLoopbackPattern.test(line)) return;
        references.push({
          file: relativeFile,
          line: index + 1,
          reachableBy: reachableByFile.get(relativeFile) ?? [],
          text: line.trim().slice(0, 240),
        });
      });
  }

  return references;
};

const collectLiteralExternalReferences = (files, reachableByFile) => {
  const references = [];
  const literalExternalPattern = /https?:\/\/[^\s'"`<>]+/gi;
  const approvedTechnicalPatterns = [
    /iconify\.design\/docs\/icon-components\/react/i,
    /w3\.org\/2000\/svg/i,
  ];

  for (const file of files) {
    if (!['.js', '.jsx', '.mjs', '.cjs', '.json', '.css', '.scss'].includes(path.extname(file))) {
      continue;
    }

    const relativeFile = normalize(file);
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, index) => {
        const matches = [...line.matchAll(literalExternalPattern)].map((match) => match[0]);
        if (!matches.length) return;
        references.push({
          file: relativeFile,
          line: index + 1,
          reachableBy: reachableByFile.get(relativeFile) ?? [],
          references: matches,
          disposition: approvedTechnicalPatterns.some((pattern) => pattern.test(line))
            ? 'technical-source-metadata'
            : null,
          text: line.trim().slice(0, 240),
        });
      });
  }

  return references;
};

const collectProductionRouteReferences = (files) => {
  const references = {
    paths: new Set(),
    rootPaths: new Set(),
    apiEndpoints: new Set(),
  };
  const importPattern = /import\s+([^;]+?)\s+from\s+['"]routes\/paths['"]/g;

  const collectForAlias = (source, contractName, alias) => {
    if (!alias) return;
    const memberPattern = new RegExp(`\\b${alias}\\.([A-Za-z_$][A-Za-z0-9_$]*)`, 'g');
    for (const match of source.matchAll(memberPattern)) references[contractName].add(match[1]);
  };

  for (const file of files) {
    if (!['.js', '.jsx', '.mjs', '.cjs'].includes(path.extname(file))) continue;
    const source = fs.readFileSync(file, 'utf8');

    for (const match of source.matchAll(importPattern)) {
      const clause = match[1].trim();
      const namedStart = clause.indexOf('{');
      const defaultAlias = (namedStart === -1 ? clause : clause.slice(0, namedStart))
        .trim()
        .replace(/,$/, '')
        .trim();
      collectForAlias(source, 'paths', defaultAlias);

      const namedMatch = clause.match(/\{([^}]+)\}/s);
      if (!namedMatch) continue;
      for (const item of namedMatch[1].split(',')) {
        const [imported, alias = imported] = item.trim().split(/\s+as\s+/);
        if (imported in references) collectForAlias(source, imported, alias);
      }
    }
  }

  return Object.fromEntries(
    Object.entries(references).map(([name, values]) => [name, [...values].sort()]),
  );
};

const collectObjectKeys = (source, declaration) => {
  const start = source.indexOf(declaration);
  if (start === -1) return [];

  const openBrace = source.indexOf('{', start);
  if (openBrace === -1) return [];

  let depth = 0;
  let end = -1;
  for (let index = openBrace; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') {
      depth -= 1;
      if (depth === 0) {
        end = index;
        break;
      }
    }
  }

  if (end === -1) return [];
  const body = source.slice(openBrace + 1, end);
  return [...body.matchAll(/^\s{2}([A-Za-z_$][A-Za-z0-9_$]*)\s*:/gm)]
    .map((match) => match[1])
    .sort();
};

const normalizeRoutePattern = (value) =>
  String(value || '')
    .replace(/\$\{[^}]+\}/g, ':param')
    .replace(/:[^/]+/g, ':param')
    .replace(/\/{2,}/g, '/');

const collectApiEndpointDefinitions = (source) => {
  const definitions = {};
  const start = source.indexOf('export const apiEndpoints = {');
  if (start === -1) return definitions;

  const tail = source.slice(start);
  const end = tail.indexOf('\n};');
  const body = end === -1 ? tail : tail.slice(0, end);
  const literalPattern =
    /^[ \t]{2}([A-Za-z_$][A-Za-z0-9_$]*)[ \t]*:[ \t]*['"]([^'"]+)['"],?[ \t]*$/gm;
  const functionPattern =
    /^[ \t]{2}([A-Za-z_$][A-Za-z0-9_$]*)[ \t]*:[^\r\n=]*=>[ \t]*`([^`]+)`,?[ \t]*$/gm;

  for (const match of body.matchAll(literalPattern)) {
    definitions[match[1]] = normalizeRoutePattern(match[2]);
  }
  for (const match of body.matchAll(functionPattern)) {
    definitions[match[1]] = normalizeRoutePattern(match[2]);
  }

  return definitions;
};

const collectServerRouteDefinitions = () => {
  const routeFiles = [
    { file: 'server/index.js', stripPrefix: '/api' },
    { file: 'server/platform/router.js', stripPrefix: '' },
  ];
  const definitions = [];
  const routePattern =
    /\b(?:app|platformRouter)\.(get|post|put|patch|delete)\s*\(\s*['"]([^'"]+)['"]/gs;

  for (const routeFile of routeFiles) {
    const source = fs.readFileSync(path.join(workspaceRoot, routeFile.file), 'utf8');
    for (const match of source.matchAll(routePattern)) {
      let route = match[2];
      if (routeFile.stripPrefix && route.startsWith(routeFile.stripPrefix)) {
        route = route.slice(routeFile.stripPrefix.length) || '/';
      }
      definitions.push({
        method: match[1].toUpperCase(),
        route: normalizeRoutePattern(route),
        file: routeFile.file,
      });
    }
  }

  return definitions;
};

const readAtPath = (value, key) =>
  key.split('.').reduce((current, segment) => current?.[segment], value);

const writeAtPath = (target, key, value) => {
  const segments = key.split('.');
  let current = target;
  segments.forEach((segment, index) => {
    if (index === segments.length - 1) current[segment] = value;
    else current = current[segment] ??= {};
  });
};

const createProductionLocale = (locale, keys) => {
  const productionLocale = { ffax: locale.ffax };
  for (const key of keys) {
    if (key === 'ffax' || key.startsWith('ffax.')) continue;
    const value = readAtPath(locale, key);
    if (value !== undefined) writeAtPath(productionLocale, key, value);
  }
  return productionLocale;
};

const bundles = bundleDefinitions.map(crawlBundle);
const reachableByFile = new Map();
for (const bundle of bundles) {
  for (const file of bundle.files) {
    const names = reachableByFile.get(file) ?? [];
    names.push(bundle.name);
    reachableByFile.set(file, names);
  }
}

const repositoryAuditFiles = new Set([
  'scripts/audit-production-frontend.mjs',
  'scripts/i18n-browser-audit.cjs',
  'scripts/i18n-final-report.mjs',
  'scripts/i18n-migrate.mjs',
  'scripts/i18n-normalize-zh.mjs',
]);
const deploymentGuardFiles = new Set([
  'deploy/install-production.sh',
  'deploy/install-root-home.sh',
  'deploy/install-static-production.sh',
  'deploy/package-production.ps1',
]);
const repositoryDisposition = (rule, file, line) => {
  if (file.startsWith('src/')) {
    return reachableByFile.has(file)
      ? exceptionFor(rule, file)
      : 'frontend-preview-isolated';
  }

  if (file === 'docs/api-integrations/manifests/multi-channel-runtime.json') {
    return 'architecture-audit-history';
  }

  if (repositoryAuditFiles.has(file)) return 'audit-or-migration-rule';

  if (rule === 'runtime-not-connected') {
    if (file === 'server/platform/router.js') return 'pending-plugin-runtime-and-payments';
    if (file === 'server/channels/router.js' || file === 'server/runtime/domain/index.js') {
      return 'pending-non-ebay-connectors';
    }
  }

  if (
    deploymentGuardFiles.has(file) &&
    ['old-brand-aurora', 'old-vendor'].includes(rule)
  ) {
    return 'deployment-rejection-guard';
  }

  if (
    /^services\/(?:mercur|mercur-core)\/packages\/api\/src\/scripts\/seed\.ts$/.test(file) &&
    rule === 'old-brand-aurora' &&
    /["']aurora["']\s*,\s*["']Blue["']/.test(line)
  ) {
    return 'upstream-catalog-colorway';
  }

  return null;
};

const allSourceFiles = enumerateSourceFiles(srcRoot).sort();
const productionFiles = allSourceFiles.filter((file) => reachableByFile.has(normalize(file)));
const previewOnlyFiles = allSourceFiles.filter((file) => !reachableByFile.has(normalize(file)));
const productionScan = scanFiles(productionFiles, reachableByFile);
const previewScan = scanFiles(previewOnlyFiles, reachableByFile);
const repositoryFiles = enumerateRepositoryTextFiles(workspaceRoot).sort();
const repositoryScan = scanFiles(repositoryFiles, reachableByFile, repositoryDisposition);
const productionTranslations = collectTranslationKeys(productionFiles);
const publicAssetReferences = collectPublicAssetReferences(productionFiles, reachableByFile);
const productionBrowserLoopbackReferences = collectBrowserLoopbackReferences(
  productionFiles,
  reachableByFile,
);
const productionLiteralExternalReferences = collectLiteralExternalReferences(
  productionFiles,
  reachableByFile,
);
const unreviewedProductionLiteralExternalReferences =
  productionLiteralExternalReferences.filter((reference) => !reference.disposition);
const productionPathsSource = fs.readFileSync(
  path.join(srcRoot, 'routes', 'production-paths.js'),
  'utf8',
);
const productionRouteReferences = collectProductionRouteReferences(productionFiles);
const productionRouteContract = Object.fromEntries(
  [
    ['paths', 'const paths = {'],
    ['rootPaths', 'export const rootPaths = {'],
    ['apiEndpoints', 'export const apiEndpoints = {'],
  ].map(([objectName, declaration]) => {
    const referenced = productionRouteReferences[objectName];
    const defined = collectObjectKeys(productionPathsSource, declaration);
    const definedSet = new Set(defined);
    return [
      objectName,
      {
        referenced,
        defined,
        missing: referenced.filter((key) => !definedSet.has(key)),
      },
    ];
  }),
);
const productionApiEndpointDefinitions = collectApiEndpointDefinitions(productionPathsSource);
const productionApiMethods = {
  contactRequests: 'POST',
  login: 'POST',
  logout: 'POST',
  notificationRead: 'PUT',
  notifications: 'GET',
  pluginAction: 'POST',
  pluginPurchase: 'POST',
  plugins: 'GET',
  profile: 'GET',
  register: 'POST',
  verifyEmail: 'POST',
};
const serverRouteDefinitions = collectServerRouteDefinitions();
const serverRouteSignatures = new Set(
  serverRouteDefinitions.map(({ method, route }) => `${method} ${route}`),
);
const productionApiServerContract = [
  ...productionRouteContract.apiEndpoints.referenced.map((key) => ({
    source: `apiEndpoints.${key}`,
    method: productionApiMethods[key] || null,
    route: productionApiEndpointDefinitions[key] || null,
  })),
  {
    source: 'Workbench.layout.load',
    method: 'GET',
    route: '/v1/workspaces/:param/panel-layout',
  },
  {
    source: 'Workbench.layout.save',
    method: 'PUT',
    route: '/v1/workspaces/:param/panel-layout',
  },
].map((contract) => ({
  ...contract,
  matched:
    Boolean(contract.method && contract.route) &&
    serverRouteSignatures.has(`${contract.method} ${normalizeRoutePattern(contract.route)}`),
}));
const nginxSource = fs.readFileSync(
  path.join(workspaceRoot, 'deploy', 'nginx', 'ffax.com.conf'),
  'utf8',
);
const productionApiGatewayContract = {
  browserBase: '/workbench-api',
  exactLocation: /location\s*=\s*\/workbench-api\s*\{[\s\S]*?proxy_pass\s+http:\/\/127\.0\.0\.1:8000\/api;/m.test(
    nginxSource,
  ),
  nestedLocation:
    /location\s+\^~\s+\/workbench-api\/\s*\{[\s\S]*?proxy_pass\s+http:\/\/127\.0\.0\.1:8000\/api\/;/m.test(
      nginxSource,
    ),
};
productionApiGatewayContract.matched =
  productionApiGatewayContract.exactLocation && productionApiGatewayContract.nestedLocation;
const readWorkspaceText = (relativePath) =>
  fs.readFileSync(path.join(workspaceRoot, relativePath), 'utf8');
const rootRouterSource = readWorkspaceText('src/routes/root-router.jsx');
const rootMainSource = readWorkspaceText('src/root-main.jsx');
const showcasePageSource = readWorkspaceText('src/pages/Showcase.jsx');
const productionRouterSource = readWorkspaceText('src/routes/production-router.jsx');
const authGuardSource = readWorkspaceText('src/components/guard/AuthGuard.jsx');
const zitadelAuthLayoutSource = readWorkspaceText('src/layouts/auth-layout/ZitadelAuthLayout.jsx');
const zitadelLoginSource = readWorkspaceText('src/pages/authentication/zitadel/Login.jsx');
const zitadelSignupSource = readWorkspaceText('src/pages/authentication/zitadel/Signup.jsx');
const zitadelVerifyEmailSource = readWorkspaceText(
  'src/pages/authentication/zitadel/VerifyEmail.jsx',
);
const zitadelLoggedOutSource = readWorkspaceText(
  'src/pages/authentication/zitadel/LoggedOut.jsx',
);
const workbenchSource = readWorkspaceText('src/pages/apps/workbench/Workbench.jsx');
const pluginCenterSource = readWorkspaceText(
  'src/components/sections/workbench/PluginCenter.jsx',
);
const notificationsSource = readWorkspaceText('src/pages/others/Notifications.jsx');
const appbarActionsSource = readWorkspaceText(
  'src/layouts/main-layout/common/AppbarActionItems.jsx',
);
const logoSource = readWorkspaceText('src/components/common/Logo.jsx');
const showcaseHeaderBrandSource = readWorkspaceText(
  'src/components/sections/showcase/layout/header/HeaderBrand.jsx',
);
const showcaseMobileNavSource = readWorkspaceText(
  'src/components/sections/showcase/layout/header/MobileNav.jsx',
);
const showcaseHeroContentSource = readWorkspaceText(
  'src/components/sections/showcase/hero/HeroContent.jsx',
);
const faviconSource = readWorkspaceText('public/ffax.svg');
const publicSitemapSource = readWorkspaceText('src/routes/public-sitemap.js');
const searchResultSource = readWorkspaceText(
  'src/layouts/main-layout/common/search-box/SearchResult.jsx',
);
const productionEnvSource = readWorkspaceText('.env.production');
const workbenchDocumentSource = readWorkspaceText('index.html');
const rootHomeDocumentSource = readWorkspaceText('root-home/index.html');
const rootHomeViteSource = readWorkspaceText('vite.root-home.config.js');
const packageMetadata = JSON.parse(readWorkspaceText('package.json'));
const zitadelProductionSetupSource = readWorkspaceText('infra/zitadel/setup-production.sh');
const productionInstallerSource = readWorkspaceText('deploy/install-production.sh');
const envValue = (source, key) =>
  source.match(new RegExp(`^${key}=(.*)$`, 'm'))?.[1]?.trim() || '';
const productionEnvironmentContract = {
  browserApi: envValue(productionEnvSource, 'VITE_API_URL') ===
    'https://www.ffax.com/workbench-api',
  zitadelAuthority: envValue(productionEnvSource, 'VITE_ZITADEL_DOMAIN') ===
    'https://www.ffax.com',
  zitadelCallback: envValue(productionEnvSource, 'VITE_ZITADEL_CALLBACK_URL') ===
    'https://www.ffax.com/workbench/authentication/callback',
  zitadelLogout: envValue(productionEnvSource, 'VITE_ZITADEL_POST_LOGOUT_URL') ===
    'https://www.ffax.com/workbench/authentication/zitadel/logged-out',
  zitadelAccount: envValue(productionEnvSource, 'VITE_ZITADEL_ACCOUNT_URL') ===
    'https://www.ffax.com/ui/console/users/me',
  productionProvisioning:
    /FFAX_FRONTEND_URL=https:\/\/www\.ffax\.com\/workbench/.test(
      zitadelProductionSetupSource,
    ) &&
    /FFAX_ALLOWED_ORIGINS=https:\/\/www\.ffax\.com/.test(productionInstallerSource) &&
    /MERCUR_BASE_URL=http:\/\/mercur-api:9000/.test(productionInstallerSource),
  noLegacyTemplateDomain:
    !/aurora|themeforest|bootstrapdash|figma\.com/i.test(productionEnvSource),
};
productionEnvironmentContract.matched = Object.values(productionEnvironmentContract).every(Boolean);
const productionSurfaceContract = {
  homepage: {
    rootUsesSourceShowcase:
      /path:\s*rootPaths\.root,[\s\S]*?element:\s*suspense\(<Showcase\s*\/>\)/m.test(
        rootRouterSource,
      ),
    sourceHeroAndTeam:
      /<ShowcaseHero\s*\/>[\s\S]*?<Team\s*\/>/m.test(showcasePageSource) &&
      !/<OurMission\b/m.test(showcasePageSource),
    localPlusJakartaFont:
      /\.\/assets\/fonts\/plus-jakarta-sans\/index\.css/.test(rootMainSource),
    noLegacyHomepageAlias:
      !/["']\/pages\/landing\/homepage["']/.test(productionPathsSource) &&
      !/paths\.landingHomepage/.test(rootRouterSource),
  },
  authentication: {
    protectedWorkspace: /<AuthGuard>[\s\S]*?<MainLayout>/m.test(productionRouterSource),
    zitadelOnly:
      /ZitadelAuthLayout/.test(productionRouterSource) &&
      !/Auth0|Firebase|AuthJwt|SocialAuth/m.test(productionRouterSource),
    realAuthPages:
      /pages\/authentication\/zitadel\/Login/.test(productionRouterSource) &&
      /pages\/authentication\/zitadel\/Signup/.test(productionRouterSource) &&
      /pages\/authentication\/zitadel\/VerifyEmail/.test(productionRouterSource),
    realAuthRequests:
      /useLoginUser\(\)/.test(zitadelLoginSource) &&
      /login\(\{\s*loginName:\s*email,\s*password,\s*authRequest,\s*rememberDevice\s*\}\)/m.test(
        zitadelLoginSource,
      ) &&
      /window\.location\.assign\(result\.callbackUrl\)/.test(zitadelLoginSource) &&
      /useRegisterUser\(\)/.test(zitadelSignupSource) &&
      /await registerUser\(formData\)/.test(zitadelSignupSource) &&
      /useVerifyEmail\(\)/.test(zitadelVerifyEmailSource) &&
      /await verifyEmail\(verification\)/.test(zitadelVerifyEmailSource),
    protectedReturnPath:
      /state=\{\{ from: `\$\{location\.pathname\}\$\{location\.search\}\$\{location\.hash\}` \}\}/m.test(
        authGuardSource,
      ) &&
      /const returnTo = location\.state\?\.from \|\| workbenchEntryPath/.test(
        zitadelLoginSource,
      ),
    authNavigation:
      /<Logo href=\{rootPaths\.root\} \/>/.test(zitadelAuthLayoutSource) &&
      /signUpLink=\{paths\.zitadelSignup\}/.test(zitadelLoginSource) &&
      /loginLink=\{paths\.zitadelLogin\}/.test(zitadelSignupSource) &&
      /to=\{authPaths\.login\}/.test(zitadelLoggedOutSource),
  },
  workbench: {
    goldenLayout: /new\s+VirtualLayout\(/.test(workbenchSource),
    approvedPanels:
      /new\s+Set\(\['plugin-center',\s*'notifications'\]\)/m.test(workbenchSource),
    persistedLayout:
      /axiosInstance\.get\(`\/v1\/workspaces\/\$\{WORKSPACE_ID\}\/panel-layout`/.test(
        workbenchSource,
      ) &&
      /axiosInstance\.put\(`\/v1\/workspaces\/\$\{WORKSPACE_ID\}\/panel-layout`/.test(
        workbenchSource,
      ),
    noFakeShell: !/<iframe\b|MicroAppHost|IntegrationControlPlane|MyWorkspace/m.test(
      workbenchSource,
    ),
    entryImmediatelyBeforeProfile:
      /to=\{workbenchEntryPath\}[\s\S]*?<ProfileMenu\s+type=\{type\}\s*\/>/m.test(
        appbarActionsSource,
      ),
    pluginCenterUsesRealApi:
      /useSWR\(apiEndpoints\.plugins\)/.test(pluginCenterSource) &&
      /apiEndpoints\.pluginPurchase\(plugin\.id\)/.test(pluginCenterSource) &&
      /apiEndpoints\.pluginAction\(plugin\.id,\s*action\)/.test(pluginCenterSource) &&
      /row\.runtime_ready/.test(pluginCenterSource) &&
      /row\.payments_ready/.test(pluginCenterSource),
    notificationsUseRealApi:
      /useSWR\(apiEndpoints\.notifications\)/.test(notificationsSource) &&
      /axiosInstance\.put\(apiEndpoints\.notificationRead\(notification\.id\)\)/.test(
        notificationsSource,
      ),
  },
  logo: {
    ffaxLabel: />\s*FFA-X\s*</m.test(logoSource),
    noLegacyBrand: !/\bAurora\b/i.test(logoSource),
    publicAndWorkbenchTargets:
      /isPublicBundle[\s\S]*?resolvedHref[\s\S]*?workbenchEntryPath/m.test(logoSource),
    dragDisabled:
      /draggable=\{false\}/.test(logoSource) && /onDragStart=/.test(logoSource),
    faviconPresent: isFile(path.join(workspaceRoot, 'public', 'ffax.svg')),
    homepageUsesSharedLogo:
      /import Logo from ['"]components\/common\/Logo['"]/.test(showcaseHeaderBrandSource) &&
      /<Logo\b/.test(showcaseHeaderBrandSource) &&
      /import Logo from ['"]components\/common\/Logo['"]/.test(showcaseMobileNavSource) &&
      /<Logo\b/.test(showcaseMobileNavSource),
    sourceFoldMark:
      (faviconSource.match(/<path\b/g) || []).length === 6 &&
      /M5\.31055 0\.0332031V10\.5106/.test(faviconSource) &&
      /M0\.428711 1\.68945V13\.9413/.test(logoSource),
    sourceFontWordmark:
      /fontFamily="Plus Jakarta Sans, sans-serif"/.test(showcaseHeroContentSource) &&
      />\s*FFA-X\s*<\/text>/m.test(showcaseHeroContentSource),
    documentMetadata:
      /<html lang="zh-CN">/.test(workbenchDocumentSource) &&
      /<title>FFA-X｜全球贸易网络中的数字桥梁<\/title>/.test(
        workbenchDocumentSource,
      ) &&
      /%BASE_URL%ffax\.svg/.test(workbenchDocumentSource) &&
      /<html lang="zh-CN">/.test(rootHomeDocumentSource) &&
      /<title>FFA-X｜全球贸易网络中的数字桥梁<\/title>/.test(
        rootHomeDocumentSource,
      ) &&
      /href="\/ffax\.svg"/.test(rootHomeDocumentSource),
    packageIdentity: packageMetadata.name === 'ffax-workspace',
    rootAssetWhitelist:
      /'ffax\.svg'/.test(rootHomeViteSource) &&
      /'assets\/videos\/showcase\/beam\.webm'/.test(rootHomeViteSource) &&
      /'assets\/images\/showcase\/16\.webp'/.test(rootHomeViteSource) &&
      /images\/logo\/\$\{index \+ 12\}\.svg/.test(rootHomeViteSource) &&
      /images\/landing\/team\/\$\{index \+ 2\}\.webp/.test(rootHomeViteSource) &&
      /'images\/landing\/team\/jinglei-wu\.png'/.test(rootHomeViteSource),
  },
  publicNavigation: {
    workbenchMarkedExternal:
      /key:\s*['"]workbench['"][\s\S]*?external:\s*true/m.test(publicSitemapSource),
    searchPreservesExternal: /external:\s*item\.external\s*===\s*true/.test(
      searchResultSource,
    ),
    externalUsesNativeLink:
      /item\.external[\s\S]*?component:\s*['"]a['"][\s\S]*?href:\s*item\.path/m.test(
        searchResultSource,
      ),
  },
};
for (const contract of Object.values(productionSurfaceContract)) {
  contract.matched = Object.values(contract).every(Boolean);
}

const generatedLocaleFiles = [];
if (process.argv.includes('--write-production-locales')) {
  const localeDirectory = path.join(srcRoot, 'locales', 'production');
  fs.mkdirSync(localeDirectory, { recursive: true });
  for (const language of ['en', 'zh']) {
    const sourcePath = path.join(srcRoot, 'locales', 'langs', `${language}.json`);
    const targetPath = path.join(localeDirectory, `${language}.json`);
    const sourceLocale = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    const productionLocale = createProductionLocale(sourceLocale, productionTranslations.keys);
    fs.writeFileSync(targetPath, `${JSON.stringify(productionLocale, null, 2)}\n`, 'utf8');
    generatedLocaleFiles.push(normalize(targetPath));
  }
}

const productionLocaleCoverage = Object.fromEntries(
  ['en', 'zh'].map((language) => {
    const localePath = path.join(srcRoot, 'locales', 'production', `${language}.json`);
    const locale = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    const missing = productionTranslations.keys.filter(
      (key) => !key.endsWith('.') && readAtPath(locale, key) === undefined,
    );
    return [language, { file: normalize(localePath), missing }];
  }),
);

const unreviewedProductionFindings = productionScan.findings.filter((finding) => !finding.disposition);
const unreviewedRepositoryFindings = repositoryScan.findings.filter(
  (finding) => !finding.disposition,
);

const report = {
  generatedAt: new Date().toISOString(),
  workspace: workspaceRoot,
  scope: {
    sourceFiles: allSourceFiles.length,
    productionReachableFiles: productionFiles.length,
    previewOnlyFiles: previewOnlyFiles.length,
    productionLinesScanned: productionScan.linesScanned,
    previewOnlyLinesScanned: previewScan.linesScanned,
    repositoryTextFiles: repositoryFiles.length,
    repositoryLinesScanned: repositoryScan.linesScanned,
  },
  bundles: bundles.map((bundle) => ({
    name: bundle.name,
    entry: bundle.entry,
    fileCount: bundle.files.length,
    files: bundle.files,
    unresolved: bundle.unresolved,
  })),
  productionFindings: productionScan.findings,
  unreviewedProductionFindings,
  repositoryFindings: repositoryScan.findings,
  unreviewedRepositoryFindings,
  repositoryFindingCounts: Object.fromEntries(
    residualRules.map((rule) => [
      rule.id,
      repositoryScan.findings.filter((finding) => finding.rule === rule.id).length,
    ]),
  ),
  translationKeys: productionTranslations.keys,
  dynamicTranslationCalls: productionTranslations.dynamicCalls,
  generatedLocaleFiles,
  productionLocaleCoverage,
  publicAssetReferences,
  productionBrowserLoopbackReferences,
  productionLiteralExternalReferences,
  unreviewedProductionLiteralExternalReferences,
  productionRouteContract,
  productionApiServerContract,
  productionApiGatewayContract,
  productionEnvironmentContract,
  productionSurfaceContract,
  previewOnlyFindingCounts: Object.fromEntries(
    residualRules.map((rule) => [
      rule.id,
      previewScan.findings.filter((finding) => finding.rule === rule.id).length,
    ]),
  ),
};

console.log(JSON.stringify(report, null, 2));

const unresolvedImports = bundles.reduce((count, bundle) => count + bundle.unresolved.length, 0);
const missingLocaleKeys = Object.values(productionLocaleCoverage).reduce(
  (count, coverage) => count + coverage.missing.length,
  0,
);
const missingProductionRouteKeys = Object.values(productionRouteContract).reduce(
  (count, contract) => count + contract.missing.length,
  0,
);
const missingProductionApiServerRoutes = productionApiServerContract.filter(
  (contract) => !contract.matched,
).length;
const missingProductionSurfaceContracts = Object.values(productionSurfaceContract).filter(
  (contract) => !contract.matched,
).length;

if (
  unreviewedProductionFindings.length > 0 ||
  unreviewedRepositoryFindings.length > 0 ||
  unresolvedImports > 0 ||
  missingLocaleKeys > 0 ||
  productionBrowserLoopbackReferences.length > 0 ||
  unreviewedProductionLiteralExternalReferences.length > 0 ||
  missingProductionRouteKeys > 0 ||
  missingProductionApiServerRoutes > 0 ||
  !productionApiGatewayContract.matched ||
  !productionEnvironmentContract.matched ||
  missingProductionSurfaceContracts > 0
) {
  process.exitCode = 1;
}
