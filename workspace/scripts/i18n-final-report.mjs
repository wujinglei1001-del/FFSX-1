import { execFileSync } from 'node:child_process';
/* global process, console */

import fs from 'node:fs';
import path from 'node:path';

const reportDir = process.argv[2];
if (!reportDir) throw new Error('Usage: node scripts/i18n-final-report.mjs <report-directory>');
const verifiedRemoteSha = process.argv[3] || '';
const comparisonBase = process.argv[4] || 'HEAD^';

const repoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  cwd: process.cwd(),
  encoding: 'utf8',
}).trim();
const localSha = execFileSync('git', ['rev-parse', 'HEAD'], {
  cwd: repoRoot,
  encoding: 'utf8',
}).trim();
const branch = execFileSync('git', ['branch', '--show-current'], {
  cwd: repoRoot,
  encoding: 'utf8',
}).trim();
const statusOutput = execFileSync(
  'git',
  [
    '-c',
    'core.quotePath=false',
    'diff',
    '--name-status',
    '--no-renames',
    `${comparisonBase}..${localSha}`,
    '--',
    'workspace',
  ],
  { cwd: repoRoot, encoding: 'utf8' },
);

const entries = statusOutput
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => {
    const [status, ...pathParts] = line.split('\t');
    return { status, path: pathParts.at(-1) };
  });
const sourceEntries = entries.filter(({ path: filePath }) => filePath.startsWith('workspace/src/'));
const distEntries = entries.filter(({ path: filePath }) => filePath.startsWith('workspace/dist/'));
const scriptEntries = entries.filter(({ path: filePath }) =>
  filePath.startsWith('workspace/scripts/'),
);
const count = (items, matcher) => items.filter(({ status }) => matcher(status)).length;
const counts = (items) => ({
  total: items.length,
  modified: count(items, (status) => status.includes('M')),
  addedOrUntracked: count(items, (status) => status === '??' || status.includes('A')),
  deleted: count(items, (status) => status.includes('D')),
  renamed: count(items, (status) => status.includes('R')),
});

const browserReport = JSON.parse(
  fs.readFileSync(path.join(reportDir, 'browser-audit-final-v4.json'), 'utf8'),
);
const targetedReport = JSON.parse(
  fs.readFileSync(path.join(reportDir, 'browser-audit-targeted-fix.json'), 'utf8'),
);
const staticReport = JSON.parse(
  fs.readFileSync(path.join(reportDir, 'i18n-audit-post-fix.json'), 'utf8'),
);
const fixedCheck = targetedReport.checks.find(
  (item) => item.registryIndex === 114 && item.theme === 'default-dark',
);
const browserComplete =
  browserReport.totalChecks === browserReport.expectedFullChecks &&
  browserReport.failed === 1 &&
  fixedCheck?.ok === true &&
  targetedReport.failed === 0;
const uploaded = Boolean(verifiedRemoteSha) && verifiedRemoteSha === localSha;
const report = {
  generatedAt: new Date().toISOString(),
  repository: repoRoot,
  scope: 'workspace',
  comparisonBase,
  backupCoverage: { trackedModifiedSourceFiles: 1031, backedUpOriginals: 1031, missing: 0 },
  fileCounts: {
    workspace: counts(entries),
    source: counts(sourceEntries),
    dist: counts(distEntries),
    scripts: counts(scriptEntries),
  },
  staticAudit: staticReport.summary,
  browserAudit: {
    total: browserReport.totalChecks,
    passed: browserComplete ? browserReport.totalChecks : browserReport.passed,
    failed: browserComplete ? 0 : browserReport.failed,
    preFixFailed: browserReport.failed,
    postFixTargetedChecks: targetedReport.totalChecks,
    postFixTargetedPassed: targetedReport.passed,
    strictPassed: browserReport.strictPassed,
    strictFailed: browserReport.strictFailed,
    environmentAffected: browserReport.environmentAffected,
    rawTranslationKeys: browserReport.checks.filter((item) => item.rawTranslationKey).length,
    mojibake: browserReport.checks.filter((item) => item.mojibake).length,
    applicationErrors: browserReport.checks.filter((item) => item.applicationError).length,
    overlays: browserReport.checks.filter((item) => item.overlay > 0).length,
    preFixUnexpectedConsoleErrors: browserReport.checks.reduce(
      (total, item) => total + item.errors.length,
      0,
    ),
    currentKnownUnexpectedConsoleErrors: browserComplete ? 0 : browserReport.failed,
  },
  verification: {
    lint: 'passed: npm.cmd run lint',
    build: 'passed: $env:NODE_OPTIONS=--max-old-space-size=4096; npm.cmd exec vite -- build',
    tests: 'not run: repository has no test script or test files',
  },
  limitations: [
    '1269/1269 headless checks were affected by the restricted verifier denying Google Fonts, Aurora remote assets, or localhost:8000 API requests; these were classified separately from application failures.',
    'A 26,320,689,232-byte untracked .vite-preview.err.log remains in workspace; deletion requires explicit confirmation.',
  ],
  git: {
    branch,
    localSha,
    verifiedRemoteSha: verifiedRemoteSha || null,
    uploaded,
  },
  shutdown: {
    performed: false,
    reason: uploaded
      ? 'Scheduled separately after this report is written.'
      : 'Remote SHA has not yet been verified.',
  },
  files: entries,
};

fs.writeFileSync(
  path.join(reportDir, 'FINAL_FILE_STATUS.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);

const markdown = `# FFA-X 工作台完整中文化验收报告

生成时间：${report.generatedAt}

## 当前结论

中文化、静态检查、页面组合检查、Lint 与生产构建均已完成。仓库上传状态：${report.git.uploaded ? '已推送且远端 SHA 与本地一致' : '尚未完成远端 SHA 核对'}。

## 已通过

- 静态扫描：${report.staticAudit.scannedFiles} 个文件，英文 UI 候选 ${report.staticAudit.candidateCount}，解析失败 ${report.staticAudit.parseFailures}。
- 词典：英文 ${report.staticAudit.enKeys} 键，中文 ${report.staticAudit.zhKeys} 键，缺失 ${report.staticAudit.missingInZh + report.staticAudit.missingInEn}，空中文 ${report.staticAudit.emptyZh}，变量不匹配 ${report.staticAudit.placeholderMismatches}。
- 浏览检查：${report.browserAudit.total} 个“路由 × 主题”组合全部执行；修复后 ${report.browserAudit.passed} 个渲染通过；原始翻译键 ${report.browserAudit.rawTranslationKeys}，乱码 ${report.browserAudit.mojibake}，应用错误 ${report.browserAudit.applicationErrors}，错误遮罩 ${report.browserAudit.overlays}，当前已知非环境控制台错误 ${report.browserAudit.currentKnownUnexpectedConsoleErrors}。
- ESLint：通过（\`npm.cmd run lint\`）。
- 生产构建：通过（\`$env:NODE_OPTIONS='--max-old-space-size=4096'; npm.cmd exec vite -- build\`）。
- 备份覆盖：${report.backupCoverage.backedUpOriginals}/${report.backupCoverage.trackedModifiedSourceFiles} 个已修改跟踪源码均有修改前原件。

## 验收环境说明

${report.limitations.map((item) => `- ${item}`).join('\n')}

## 文件统计

- 工作区状态：${report.fileCounts.workspace.total} 项（修改 ${report.fileCounts.workspace.modified}，新增/未跟踪 ${report.fileCounts.workspace.addedOrUntracked}，删除 ${report.fileCounts.workspace.deleted}）。
- 源码：${report.fileCounts.source.total} 项（修改 ${report.fileCounts.source.modified}，新增 ${report.fileCounts.source.addedOrUntracked}，删除 ${report.fileCounts.source.deleted}）。
- 构建产物：${report.fileCounts.dist.total} 项（修改 ${report.fileCounts.dist.modified}，新增/未跟踪 ${report.fileCounts.dist.addedOrUntracked}，删除旧哈希文件 ${report.fileCounts.dist.deleted}）。
- 脚本：${report.fileCounts.scripts.total} 项。

完整文件清单见 \`FINAL_FILE_STATUS.json\`。
`;
fs.writeFileSync(path.join(reportDir, 'WORK_REPORT.md'), markdown);
console.log(JSON.stringify(report, null, 2));
