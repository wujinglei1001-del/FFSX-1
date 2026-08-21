import { promises as fs } from 'node:fs';
import path from 'node:path';
import {
  calculateArchitectureFingerprint,
  companyInformationDirectory,
  defaultRepositoryRoot,
  readJson,
  sanitizeSlug,
  validateManifest,
  writeJson,
} from './lib.mjs';

function tableCell(value) {
  return String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', '<br>');
}

function list(items, formatter = (item) => String(item)) {
  return items.map((item) => `- ${formatter(item)}`).join('\n');
}

function section(title, body) {
  return `## ${title}\n\n${body}\n`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function keepOnlyLatestReport(directory, currentFilename, filenamePattern) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  await Promise.all(
    entries
      .filter(
        (entry) =>
          entry.isFile() && entry.name !== currentFilename && filenamePattern.test(entry.name),
      )
      .map((entry) => fs.unlink(path.join(directory, entry.name))),
  );
}

function renderReport(manifest, metadata) {
  const endpointRows = manifest.endpoints
    .map((endpoint) => `| ${tableCell(endpoint.method)} | ${tableCell(endpoint.path)} | ${tableCell(endpoint.purpose)} | ${tableCell(endpoint.auth)} | ${tableCell(endpoint.owner)} |`)
    .join('\n');

  const dependencyRows = manifest.dependencies
    .map((dependency) => `| ${tableCell(dependency.name)} | ${tableCell(dependency.version)} | ${tableCell(dependency.license)} | ${tableCell(dependency.role)} | ${tableCell(dependency.boundary)} |`)
    .join('\n');

  const remainingRows = manifest.remaining
    .map((item) => `| ${tableCell(item.priority)} | ${tableCell(item.task)} | ${tableCell(item.owner)} | ${tableCell(item.blocker)} | ${tableCell(item.acceptance)} |`)
    .join('\n');

  const capabilityBody = manifest.capabilities
    .map((capability, index) => [
      `### ${index + 1}. ${capability.name}`,
      '',
      capability.description,
      '',
      `- 处理数据：${capability.data}`,
      `- 安全边界：${capability.security}`,
      `- 当前状态：${capability.status}`,
    ].join('\n'))
    .join('\n\n');

  const header = [
    `# ${manifest.title}`,
    '',
    `- 架构编号：\`${manifest.id}\``,
    `- 版本：\`${manifest.version}\``,
    `- 负责人：${manifest.owner}`,
    `- 实施状态：${manifest.implementationStatus}`,
    `- 报告生成时间：${metadata.generatedAt}`,
    `- 架构指纹：\`${metadata.fingerprint}\``,
    `- 纳入指纹的源码文件：${metadata.fileCount} 个`,
    '',
    '> 本报告由主线强制脚本生成。源码架构发生变化后，旧报告会立即失效；未更新报告时，主线构建和正式部署会停止。',
    '',
  ].join('\n');

  return [
    header,
    section('功能定位', `${manifest.summary}\n\n### 本次目标\n\n${list(manifest.objectives)}`),
    section('详细功能介绍', capabilityBody),
    section('总体架构图', `\`\`\`mermaid\n${manifest.architecture.mermaid.trim()}\n\`\`\`\n\n${manifest.architecture.description}`),
    section('API 清单', `| 方法 | 路径 | 功能 | 鉴权 | 负责域 |\n|---|---|---|---|---|\n${endpointRows}`),
    section('关键数据流', manifest.dataFlows.map((flow, index) => `### ${index + 1}. ${flow.name}\n\n${flow.steps.map((step, stepIndex) => `${stepIndex + 1}. ${step}`).join('\n')}`).join('\n\n')),
    section('故障隔离与排查边界', manifest.failureBoundaries.map((boundary) => `### ${boundary.domain}\n\n- 隔离范围：${boundary.scope}\n- 失败处理：${boundary.failureHandling}\n- 排查入口：${boundary.diagnostics}`).join('\n\n')),
    section('开源组件、版本与许可证边界', `| 组件 | 固定版本 | 许可证 | 用途 | 使用边界 |\n|---|---|---|---|---|\n${dependencyRows}`),
    section('本次已完成', list(manifest.completed)),
    section('详细变更日志', manifest.changes.map((change) => `### ${change.area}\n\n${list(change.items)}`).join('\n\n')),
    section('接下来必须完成', `| 优先级 | 任务 | 负责人 | 前置/阻塞 | 验收标准 |\n|---|---|---|---|---|\n${remainingRows}`),
    section('安全与合规说明', list(manifest.securityNotes)),
    section('发布与回滚说明', list(manifest.rolloutNotes || ['遵循主线原子部署脚本和既有回滚流程。'])),
    section('报告门禁', [
      `- 生成命令：\`npm run api:report -- ${metadata.manifestRelativePath}\``,
      '- 校验命令：`npm run api:report:check`',
      '- `npm run build` 会自动先执行报告校验。',
      '- 正式部署脚本会在切换服务前再次校验架构指纹。',
      '- 报告正文不得记录密码、Token、私钥、API Key 或客户端密钥。',
    ].join('\n')),
  ].join('\n');
}

const manifestArgument = process.argv.slice(2).find((argument) => !argument.startsWith('--'));
if (!manifestArgument) {
  console.error('用法：npm run api:report -- docs/api-integrations/manifests/<文件>.json');
  process.exit(1);
}

const repositoryRoot = defaultRepositoryRoot;
const manifestPath = path.resolve(repositoryRoot, manifestArgument);
const manifest = await readJson(manifestPath);
validateManifest(manifest);

const generatedAt = new Date().toISOString();
const compactTimestamp = generatedAt.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
const slug = sanitizeSlug(manifest.id);
const fingerprint = await calculateArchitectureFingerprint(repositoryRoot);
const reportFilename = `${compactTimestamp}-${slug}.md`;
const repositoryReportPath = path.join(repositoryRoot, 'docs', 'api-integrations', 'reports', reportFilename);
const companyDirectory = companyInformationDirectory();
const companyReportPath = path.join(companyDirectory, `API架构报告-${compactTimestamp}-${slug}.md`);
const manifestRelativePath = path.relative(repositoryRoot, manifestPath).replaceAll('\\', '/');

const report = renderReport(manifest, {
  generatedAt,
  fingerprint: fingerprint.fingerprint,
  fileCount: fingerprint.files.length,
  manifestRelativePath,
});

await fs.mkdir(path.dirname(repositoryReportPath), { recursive: true });
await fs.mkdir(companyDirectory, { recursive: true });
await fs.writeFile(repositoryReportPath, report, 'utf8');
await fs.writeFile(companyReportPath, report, 'utf8');

const escapedSlug = escapeRegExp(slug);
await keepOnlyLatestReport(
  path.dirname(repositoryReportPath),
  reportFilename,
  new RegExp(`^\\d{8}T\\d{6}Z-${escapedSlug}\\.md$`),
);
await keepOnlyLatestReport(
  companyDirectory,
  path.basename(companyReportPath),
  new RegExp(`^API架构报告-\\d{8}T\\d{6}Z-${escapedSlug}\\.md$`),
);

await writeJson(path.join(repositoryRoot, 'docs', 'api-integrations', 'latest.json'), {
  schemaVersion: 1,
  architectureId: manifest.id,
  architectureVersion: manifest.version,
  generatedAt,
  fingerprintAlgorithm: fingerprint.algorithm,
  fingerprint: fingerprint.fingerprint,
  trackedFileCount: fingerprint.files.length,
  manifest: manifestRelativePath,
  repositoryReport: path.relative(repositoryRoot, repositoryReportPath).replaceAll('\\', '/'),
  companyReport: companyReportPath,
});

console.log(`API 架构报告已生成：${repositoryReportPath}`);
console.log(`公司资料副本已生成：${companyReportPath}`);
console.log(`架构指纹：${fingerprint.fingerprint}`);
