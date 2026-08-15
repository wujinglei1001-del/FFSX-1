/* global process, document, localStorage */

const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { chromium } = require('playwright');

const projectRoot = process.cwd();
const baseUrl = process.argv[2] || 'http://127.0.0.1:5002';
const reportFile = process.argv[3] || path.join(projectRoot, 'i18n-browser-audit.json');
const auditLimit = Number(process.env.BROWSER_AUDIT_LIMIT || 0);
const settleMs = Number(process.env.BROWSER_AUDIT_SETTLE_MS || 150);
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const themes = [
  'default-light',
  'default-dark',
  'luxury',
  'retro',
  'arctic',
  'nature',
  'ember',
  'dracula',
  'midnight',
];
const dynamicSamples = {
  hiringJobDetails: ['1'],
  emailLabel: ['inbox'],
  emailDetails: ['inbox', '1'],
  fileManagerFolder: ['1'],
  blogDetails: ['1'],
  videoDetails: ['1'],
  podcastDetails: ['1'],
  productDetails: ['1'],
};
const registryPathOverrides = new Map([
  [328, '/apps/ecommerce/admin'],
  [319, '/apps/ecommerce/admin/product-list/all'],
  [715, '/apps/ecommerce/customer'],
  [779, '/authentication'],
  [796, '/authentication/default/jwt'],
  [821, '/authentication/default/firebase'],
  [838, '/authentication/default/auth0'],
  [623, '/apps/chat/1'],
  [856, '/not-a-real-route'],
]);

const routeSource = fs.readFileSync(path.join(projectRoot, 'src', 'routes', 'router.jsx'), 'utf8');
const routeAst = parse(routeSource, { sourceType: 'module', plugins: ['jsx'] });

(async () => {
  const { default: paths, rootPaths } = await import(
    `${pathToFileURL(path.join(projectRoot, 'src', 'routes', 'paths.js')).href}?audit=${Date.now()}`
  );

  const routeEntries = [];
  const evaluatePath = (node) => {
    if (node.type === 'StringLiteral') return node.value;
    if (
      node.type === 'MemberExpression' &&
      node.object?.type === 'Identifier' &&
      (node.object.name === 'paths' || node.object.name === 'rootPaths')
    ) {
      return node.object.name === 'paths'
        ? paths[node.property.name]
        : rootPaths[node.property.name];
    }
    if (node.type === 'TemplateLiteral') {
      let value = '';
      for (let index = 0; index < node.quasis.length; index += 1) {
        value += node.quasis[index].value.cooked;
        if (node.expressions[index]) value += evaluatePath(node.expressions[index]) ?? '';
      }
      return value.replace(':id', '1');
    }
    if (
      node.type === 'CallExpression' &&
      node.callee?.type === 'MemberExpression' &&
      node.callee.object?.type === 'Identifier' &&
      node.callee.object.name === 'paths'
    ) {
      const functionName = node.callee.property.name;
      const fn = paths[functionName];
      if (typeof fn !== 'function') return null;
      const sourceArgs = node.arguments.map((argument) =>
        argument.type === 'StringLiteral' ? argument.value : undefined,
      );
      const samples = dynamicSamples[functionName] || [];
      const args = sourceArgs.map((argument, index) =>
        typeof argument === 'string' && argument.startsWith(':') ? samples[index] || '1' : argument,
      );
      return fn(...args);
    }
    return null;
  };

  traverse(routeAst, {
    ObjectProperty(pathRef) {
      const key = pathRef.node.key;
      const keyName = key.type === 'Identifier' ? key.name : key.value;
      if (keyName !== 'path') return;
      const sourceLine = pathRef.node.loc?.start.line || 0;
      routeEntries.push({
        registryIndex: routeEntries.length + 1,
        route: registryPathOverrides.get(sourceLine) || evaluatePath(pathRef.node.value),
        sourceLine,
      });
    },
  });

  const unresolved = routeEntries.filter(({ route }) => typeof route !== 'string');
  if (routeEntries.length !== 141 || unresolved.length) {
    throw new Error(
      `Route extraction failed: found=${routeEntries.length}, unresolved=${JSON.stringify(unresolved)}`,
    );
  }

  const browser = await chromium.launch({ headless: true, executablePath: chromePath });
  const browserContextOptions = { viewport: { width: 1440, height: 900 }, locale: 'zh-CN' };
  const failures = [];
  const strictFailures = [];
  const checks = [];
  const allTasks = themes.flatMap((theme) => routeEntries.map((entry) => ({ theme, entry })));
  const tasks = auditLimit > 0 ? allTasks.slice(0, auditLimit) : allTasks;
  let taskIndex = 0;
  let completed = 0;

  const runWorker = async () => {
    const workerContext = await browser.newContext(browserContextOptions);

    while (taskIndex < tasks.length) {
      const { theme, entry } = tasks[taskIndex];
      taskIndex += 1;
      const currentErrors = [];
      const page = await workerContext.newPage();
      page.on('pageerror', (error) => currentErrors.push(`pageerror: ${error.message}`));
      page.on('console', (message) => {
        if (message.type() === 'error') currentErrors.push(`console: ${message.text()}`);
      });
      page.on('requestfailed', (request) => {
        currentErrors.push(
          `requestfailed: ${request.url()} (${request.failure()?.errorText || 'unknown'})`,
        );
      });
      const separator = entry.route.includes('?') ? '&' : '?';
      const url = `${baseUrl}${entry.route}${separator}themePreset=${theme}&locale=zh-CN`;
      const check = { ...entry, theme, url };
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 8000 });
        await page
          .waitForFunction(
            ({ expectedTheme }) =>
              document.body.innerText.trim().length > 0 &&
              localStorage.getItem('locale') === 'zh-CN' &&
              localStorage.getItem('themePreset') === expectedTheme,
            { expectedTheme: theme },
            { timeout: 8000 },
          )
          .catch(() => undefined);
        await page.waitForTimeout(settleMs);
        const bodyText = (await page.locator('body').innerText({ timeout: 3000 })).trim();
        const overlay = await page
          .locator('.vite-error-overlay, #webpack-dev-server-client-overlay, [data-nextjs-dialog]')
          .count();
        const state = await page.evaluate(() => ({
          locale: localStorage.getItem('locale'),
          currency: localStorage.getItem('currency'),
          themePreset: localStorage.getItem('themePreset'),
        }));
        const uniqueErrors = [...new Set(currentErrors)];
        const environmentFailures = uniqueErrors.filter((message) =>
          /fonts\.googleapis\.com|prium\.github\.io\/aurora|localhost:8000\/api/.test(message),
        );
        const unexpectedErrors = uniqueErrors.filter(
          (message) =>
            !environmentFailures.includes(message) &&
            !(
              message === 'console: Failed to load resource: net::ERR_NETWORK_ACCESS_DENIED' &&
              environmentFailures.some((failure) => failure.includes('ERR_NETWORK_ACCESS_DENIED'))
            ) &&
            !(
              message === 'console: Failed to load resource: net::ERR_CONNECTION_REFUSED' &&
              environmentFailures.some((failure) => failure.includes('ERR_CONNECTION_REFUSED'))
            ),
        );
        Object.assign(check, {
          status: response?.status() || 0,
          bodyLength: bodyText.length,
          hasChinese: /[\u4e00-\u9fff]/.test(bodyText),
          rawTranslationKey: /\b(?:ui|common|navigation|theme_presets)\.[a-z0-9_.-]+\b/i.test(
            bodyText,
          ),
          mojibake: /�/.test(bodyText),
          applicationError: /Unexpected Application Error|MUI:|TypeError:|ReferenceError:/.test(
            bodyText,
          ),
          overlay,
          state,
          errors: unexpectedErrors,
          environmentFailureCount: environmentFailures.length,
          environmentFailures: environmentFailures.slice(0, 10),
        });
        check.ok =
          check.status < 400 &&
          check.bodyLength > 0 &&
          check.hasChinese &&
          !check.rawTranslationKey &&
          !check.mojibake &&
          !check.applicationError &&
          check.overlay === 0 &&
          check.state.locale === 'zh-CN' &&
          check.state.themePreset === theme &&
          check.errors.length === 0;
        check.strictOk = check.ok && check.environmentFailureCount === 0;
      } catch (error) {
        check.ok = false;
        check.exception = error.message;
      }
      checks.push(check);
      if (!check.ok) failures.push(check);
      if (!check.strictOk) strictFailures.push(check);
      await page.close();
      completed += 1;
      if (completed % 100 === 0 || completed === tasks.length) {
        process.stdout.write(
          `checked ${completed}/${tasks.length}, render failures ${failures.length}, strict failures ${strictFailures.length}\n`,
        );
      }
    }
    await workerContext.close();
  };

  await Promise.all(Array.from({ length: Math.min(6, tasks.length) }, () => runWorker()));

  const screenshotContext = await browser.newContext(browserContextOptions);
  const screenshotPage = await screenshotContext.newPage();
  for (const [name, route] of [
    ['showcase', '/showcase'],
    ['login', '/authentication/default/jwt/login'],
    ['dashboard', '/dashboard/ecommerce'],
  ]) {
    await screenshotPage.goto(`${baseUrl}${route}?themePreset=default-dark&locale=zh-CN`, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
    await screenshotPage.waitForTimeout(500);
    await screenshotPage.screenshot({
      path: path.join(path.dirname(reportFile), `browser-${name}.png`),
      fullPage: true,
    });
  }
  await screenshotPage.close();
  await screenshotContext.close();
  await browser.close();

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    routeRegistryEntries: routeEntries.length,
    themes: themes.length,
    totalChecks: checks.length,
    expectedFullChecks: allTasks.length,
    passed: checks.filter(({ ok }) => ok).length,
    failed: failures.length,
    strictPassed: checks.filter(({ strictOk }) => strictOk).length,
    strictFailed: strictFailures.length,
    environmentAffected: checks.filter(({ environmentFailureCount }) => environmentFailureCount > 0)
      .length,
    unresolvedRoutes: unresolved,
    failures,
    checks,
  };
  fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(
    `${JSON.stringify({ ...report, checks: undefined, failures: failures.length }, null, 2)}\n`,
  );
  if (failures.length) process.exitCode = 2;
})().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
