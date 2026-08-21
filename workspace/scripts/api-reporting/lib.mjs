import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

export const defaultRepositoryRoot = path.resolve(scriptDirectory, '..', '..');

export const architectureSources = [
  'package.json',
  'vite.config.js',
  'vite.root-home.config.js',
  'root-home',
  'server',
  'services/mercur-core',
  'infra/platform',
  'infra/secrets',
  'infra/logistics',
  'infra/observability',
  'infra/zitadel',
  'deploy',
  'docs/api-integrations/manifests',
  'scripts/audit-production-frontend.mjs',
  'scripts/api-reporting',
  'public/ffax.svg',
  'src/App.jsx',
  'src/main.jsx',
  'src/root-main.jsx',
  'src/config.js',
  'src/config/zitadel.js',
  'src/assets/fonts/plus-jakarta-sans/index.css',
  'src/assets/json/splash-loader.json',
  'src/components/common/Logo.jsx',
  'src/components/guard/AuthGuard.jsx',
  'src/components/sections/authentications/zitadel',
  'src/components/sections/landing/about-us',
  'src/components/sections/notification',
  'src/components/sections/showcase',
  'src/components/sections/workbench',
  'src/data/notification-badges.js',
  'src/data/ffax-public.js',
  'src/data/showcase.jsx',
  'src/layouts/auth-layout',
  'src/layouts/landing-layout',
  'src/layouts/main-layout/common/search-box',
  'src/lib/notifications.js',
  'src/locales/i18n.js',
  'src/locales/production',
  'src/pages/Showcase.jsx',
  'src/pages/apps/workbench',
  'src/pages/authentication/zitadel',
  'src/pages/others/Notifications.jsx',
  'src/pages/platform',
  'src/providers/AuthProvider.jsx',
  'src/providers/auth-provider/AuthZitadelProvider.jsx',
  'src/routes',
  'src/services/axios',
  'src/theme/components/Avatar.jsx',
];

const ignoredDirectoryNames = new Set([
  '.git',
  '.medusa',
  '.turbo',
  '.vite',
  'coverage',
  'dist',
  'dist-root',
  'acceptance',
  'dockerized',
  'generated',
  'logs',
  'node_modules',
  'otel-test',
  'screenshots',
  'test-mocks',
  'tmp',
]);

const trackedExtensions = new Set([
  '.cjs',
  '.conf',
  '.css',
  '.graphql',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.mjs',
  '.sh',
  '.sql',
  '.svg',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml',
]);

function isTrackedFile(filePath) {
  const basename = path.basename(filePath).toLowerCase();
  if (basename.startsWith('.env')) return false;
  if (basename.endsWith('.log')) return false;
  if (/\.(test|spec)\.[cm]?[jt]sx?$/.test(basename)) return false;
  if (/^(test-setup|test-theme|vitest\.config)/.test(basename)) return false;
  if (basename.includes('secret') && ['.key', '.pem', '.p12', '.pfx'].includes(path.extname(basename))) {
    return false;
  }
  return trackedExtensions.has(path.extname(basename));
}

async function walk(currentPath, repositoryRoot, collected) {
  let stat;
  try {
    stat = await fs.stat(currentPath);
  } catch (error) {
    if (error?.code === 'ENOENT') return;
    throw error;
  }

  if (stat.isFile()) {
    if (isTrackedFile(currentPath)) collected.push(currentPath);
    return;
  }

  if (!stat.isDirectory()) return;

  const entries = await fs.readdir(currentPath, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name, 'en'));

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectoryNames.has(entry.name)) continue;
    await walk(path.join(currentPath, entry.name), repositoryRoot, collected);
  }
}

export async function collectArchitectureFiles(repositoryRoot = defaultRepositoryRoot) {
  const collected = [];
  for (const source of architectureSources) {
    await walk(path.resolve(repositoryRoot, source), repositoryRoot, collected);
  }

  return [...new Set(collected)]
    .sort((left, right) => left.localeCompare(right, 'en'))
    .map((absolutePath) => ({
      absolutePath,
      relativePath: path.relative(repositoryRoot, absolutePath).replaceAll('\\', '/'),
    }));
}

export async function calculateArchitectureFingerprint(repositoryRoot = defaultRepositoryRoot) {
  const files = await collectArchitectureFiles(repositoryRoot);
  const hash = createHash('sha256');

  for (const file of files) {
    hash.update(file.relativePath, 'utf8');
    hash.update('\0');
    const content = await fs.readFile(file.absolutePath, 'utf8');
    hash.update(content.replaceAll('\r\n', '\n'), 'utf8');
    hash.update('\0');
  }

  return {
    algorithm: 'sha256',
    fingerprint: hash.digest('hex'),
    files: files.map((file) => file.relativePath),
  };
}

export function companyInformationDirectory() {
  if (process.env.FFAX_COMPANY_INFO_DIR) {
    return path.resolve(process.env.FFAX_COMPANY_INFO_DIR);
  }

  if (process.platform === 'win32') {
    return path.join(process.env.USERPROFILE || os.homedir(), 'Desktop', 'FFAX公司信息');
  }

  return path.join(os.homedir(), 'FFAX公司信息');
}

export function sanitizeSlug(value) {
  return String(value || 'api-architecture')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'api-architecture';
}

export function validateManifest(manifest) {
  const requiredStrings = ['id', 'title', 'version', 'owner', 'summary'];
  const requiredArrays = [
    'objectives',
    'capabilities',
    'endpoints',
    'dataFlows',
    'failureBoundaries',
    'dependencies',
    'completed',
    'changes',
    'remaining',
    'securityNotes',
  ];

  for (const key of requiredStrings) {
    if (typeof manifest?.[key] !== 'string' || !manifest[key].trim()) {
      throw new Error(`报告清单缺少必填文本字段：${key}`);
    }
  }

  for (const key of requiredArrays) {
    if (!Array.isArray(manifest?.[key]) || manifest[key].length === 0) {
      throw new Error(`报告清单缺少必填列表：${key}`);
    }
  }

  if (typeof manifest?.architecture?.mermaid !== 'string' || !manifest.architecture.mermaid.trim()) {
    throw new Error('报告清单必须提供 architecture.mermaid 架构图。');
  }

  const sensitiveKeys = new Set(['password', 'clientsecret', 'privatekey', 'accesstoken', 'refreshtoken', 'apikey']);
  const visit = (value, trail = []) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, [...trail, index]));
      return;
    }
    if (!value || typeof value !== 'object') return;
    for (const [key, item] of Object.entries(value)) {
      if (sensitiveKeys.has(key.toLowerCase()) && item && item !== '[REDACTED]') {
        throw new Error(`报告中禁止保存秘密值：${[...trail, key].join('.')}`);
      }
      visit(item, [...trail, key]);
    }
  };
  visit(manifest);
}

export async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

export async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
