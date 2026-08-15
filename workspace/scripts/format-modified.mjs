import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';
import prettier from 'prettier';

const projectRoot = process.cwd();
const repoRoot = path.resolve(projectRoot, '..');
const status = execFileSync('git', ['status', '--porcelain', '-z'], {
  cwd: repoRoot,
  encoding: 'utf8',
});

const listedPaths = status
  .split('\0')
  .filter(Boolean)
  .map((entry) => entry.slice(3))
  .filter((file) => file.startsWith('workspace/src/') || file.startsWith('workspace/scripts/'))
  .map((file) => path.join(repoRoot, file))
  .filter((file) => fs.existsSync(file));

const files = listedPaths.flatMap((listedPath) => {
  if (!fs.statSync(listedPath).isDirectory()) return [listedPath];
  return fs
    .readdirSync(listedPath, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name));
});

let changed = 0;
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

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const config = (await prettier.resolveConfig(file)) ?? {};
  const formatted = await prettier.format(source, { ...config, filepath: file });
  if (formatted !== source) {
    await writeWithRetry(file, formatted);
    changed += 1;
  }
}

process.stdout.write(`${JSON.stringify({ files: files.length, changed }, null, 2)}\n`);
