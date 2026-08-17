import { promises as fs } from 'node:fs';
import path from 'node:path';
import {
  calculateArchitectureFingerprint,
  defaultRepositoryRoot,
  readJson,
} from './lib.mjs';

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const repositoryRoot = path.resolve(argumentValue('--root') || defaultRepositoryRoot);
const latestPath = path.join(repositoryRoot, 'docs', 'api-integrations', 'latest.json');
const requireDesktop = !process.argv.includes('--no-desktop')
  && process.env.FFAX_API_REPORT_REQUIRE_DESKTOP !== 'false'
  && process.platform === 'win32';

let latest;
try {
  latest = await readJson(latestPath);
} catch (error) {
  console.error('API 架构报告门禁失败：没有找到 docs/api-integrations/latest.json。');
  console.error('请先运行：npm run api:report -- docs/api-integrations/manifests/<文件>.json');
  process.exit(1);
}

const current = await calculateArchitectureFingerprint(repositoryRoot);
const failures = [];

if (latest.fingerprint !== current.fingerprint) {
  failures.push('API 架构源码已经变化，当前报告已过期。');
}

const repositoryReport = path.resolve(repositoryRoot, latest.repositoryReport || '');
try {
  await fs.access(repositoryReport);
} catch {
  failures.push(`主线报告不存在：${repositoryReport}`);
}

if (requireDesktop) {
  try {
    await fs.access(latest.companyReport);
  } catch {
    failures.push(`公司资料副本不存在：${latest.companyReport}`);
  }
}

if (failures.length > 0) {
  console.error('API 架构报告门禁失败：');
  failures.forEach((failure) => console.error(`- ${failure}`));
  console.error(`请重新运行：npm run api:report -- ${latest.manifest || 'docs/api-integrations/manifests/<文件>.json'}`);
  process.exit(1);
}

console.log(`API 架构报告门禁通过：${latest.architectureId} v${latest.architectureVersion}`);
console.log(`架构指纹：${current.fingerprint}`);
