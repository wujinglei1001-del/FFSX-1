import { mkdir, readFile, writeFile } from 'node:fs/promises';
import http from 'node:http';
import https from 'node:https';
import { join } from 'node:path';

const config = {
  internalUrl: process.env.ZITADEL_INTERNAL_URL?.replace(/\/+$/, '') || 'http://zitadel-api:8080',
  instanceHost: process.env.ZITADEL_INSTANCE_HOST || 'localhost',
  publicUrl: process.env.ZITADEL_PUBLIC_URL?.replace(/\/+$/, '') || 'http://localhost:8080',
  adminUsername: process.env.ZITADEL_ADMIN_USERNAME || 'ffax-admin',
  legacyAdminUsername: process.env.ZITADEL_LEGACY_ADMIN_USERNAME || 'ffax-admin',
  frontendUrl: process.env.FFAX_FRONTEND_URL?.replace(/\/+$/, '') || 'http://localhost:5002',
  callbackUrl:
    process.env.FFAX_CALLBACK_URL || 'http://localhost:5002/authentication/callback',
  postLogoutUrl:
    process.env.FFAX_POST_LOGOUT_URL ||
    'http://localhost:5002/authentication/zitadel/logged-out',
  apiUrl: process.env.FFAX_API_URL?.replace(/\/+$/, '') || 'http://localhost:8000/api',
  devMode: /^true$/i.test(process.env.FFAX_DEV_MODE || ''),
  patPath: process.env.ADMIN_PAT_PATH || '/zitadel/bootstrap/admin.pat',
  outputDir: process.env.OUTPUT_DIR || '/output',
};

const frontendOrigin = new URL(config.frontendUrl).origin;

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const requireValue = (value, label) => {
  if (!value) throw new Error(`ZITADEL did not return ${label}`);
  return value;
};

const readPat = async () => {
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    try {
      const pat = (await readFile(config.patPath, 'utf8')).trim();
      if (pat) return pat;
    } catch {
      // The first-instance initialization writes the PAT asynchronously.
    }
    await sleep(2000);
  }

  throw new Error(`ZITADEL administrator PAT was not created at ${config.patPath}`);
};

const pat = await readPat();

const request = async (path, body, options = {}) => {
  const url = new URL(`${config.internalUrl}${path}`);
  const content = JSON.stringify(body);
  const transport = url.protocol === 'https:' ? https : http;
  const response = await new Promise((resolve, reject) => {
    const outgoing = transport.request(
      url,
      {
        method: options.method || 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${pat}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(content),
          Host: config.instanceHost,
          'X-Forwarded-Proto': config.publicUrl.startsWith('https://') ? 'https' : 'http',
          ...(options.headers || {}),
        },
        timeout: 15000,
      },
      (incoming) => {
        const chunks = [];
        incoming.on('data', (chunk) => chunks.push(chunk));
        incoming.on('end', () => {
          resolve({
            ok: incoming.statusCode >= 200 && incoming.statusCode < 300,
            status: incoming.statusCode,
            text: Buffer.concat(chunks).toString('utf8'),
          });
        });
      },
    );

    outgoing.on('timeout', () => outgoing.destroy(new Error(`Request timed out: ${path}`)));
    outgoing.on('error', reject);
    outgoing.end(content);
  });

  const text = response.text;
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    if (
      response.status === 400 &&
      payload.code === 9 &&
      /(?:^No changes\b|has not been changed\b)/i.test(payload.message || '')
    ) {
      return payload;
    }

    throw new Error(`${path} failed (${response.status}): ${text}`);
  }

  return payload;
};

const search = async (path) => (await request(path, {})).result || [];

const ensureProject = async () => {
  const existing = (await search('/management/v1/projects/_search')).find(
    (project) => project.name === 'FFAX',
  );

  if (existing) {
    await request(
      `/management/v1/projects/${existing.id}`,
      {
        name: 'FFAX',
        projectRoleAssertion: true,
        projectRoleCheck: false,
        hasProjectCheck: false,
      },
      { method: 'PUT' },
    );
    return existing.id;
  }

  const created = await request('/management/v1/projects', {
    name: 'FFAX',
    projectRoleAssertion: true,
    projectRoleCheck: false,
    hasProjectCheck: false,
  });

  return requireValue(created.id, 'a project ID');
};

const ensureRoles = async (projectId) => {
  const roles = await search(`/management/v1/projects/${projectId}/roles/_search`);
  const existingKeys = new Set(roles.map((role) => role.key || role.roleKey));
  const requiredRoles = [
    ['admin', '管理员'],
    ['marketplace-admin', '平台交易管理员'],
    ['tenant-admin', '企业管理员'],
    ['seller', '供应商'],
    ['customer', '采购方'],
    ['operator', '运营人员'],
    ['member', '企业成员'],
    ['viewer', '只读成员'],
  ];

  for (const [roleKey, displayName] of requiredRoles) {
    if (!existingKeys.has(roleKey)) {
      await request(`/management/v1/projects/${projectId}/roles`, { roleKey, displayName });
    }
  }
};

const ensureShortLoginPolicy = async () => {
  await request(
    '/admin/v1/policies/domain',
    {
      userLoginMustBeDomain: false,
      validateOrgDomains: false,
      smtpSenderAddressMatchesInstanceDomain: false,
    },
    { method: 'PUT' },
  );
};

const ensureLoginV2Feature = async () => {
  await request(
    '/v2/features/instance',
    {
      loginV2: {
        required: true,
        baseUri: `${config.frontendUrl}/authentication/zitadel`,
      },
    },
    { method: 'PUT' },
  );
};

const ensureInitialAdminRole = async (projectId) => {
  const users = await search('/management/v1/users/_search');
  const matchesUsername = (user, username) => {
    const loginNames = user.loginNames || [];
    return (
      user.userName === username ||
      user.userName?.startsWith(`${username}@`) ||
      loginNames.some(
        (loginName) =>
          loginName === username ||
          loginName.startsWith(`${username}@`),
      )
    );
  };

  let admin = users.find((user) => matchesUsername(user, config.adminUsername));

  if (!admin) {
    admin = users.find((user) => matchesUsername(user, config.legacyAdminUsername));
  }

  if (!admin) {
    throw new Error(`ZITADEL initial administrator ${config.adminUsername} was not found`);
  }

  // ZITADEL may have created the bootstrap administrator before the instance
  // switched to short login names. Normalize the stored username after the
  // policy is applied so users can enter `mamawel` instead of the generated
  // organization-qualified login name.
  if (admin.userName !== config.adminUsername) {
    await request(
      `/management/v1/users/${admin.id}/username`,
      { userName: config.adminUsername },
      { method: 'PUT' },
    );
  }

  const grants = await search('/management/v1/users/grants/_search');
  const existing = grants.find(
    (grant) => grant.userId === admin.id && grant.projectId === projectId,
  );

  if (existing) {
    const roleKeys = Array.from(new Set([...(existing.roleKeys || []), 'admin', 'marketplace-admin', 'tenant-admin']));
    await request(
      `/management/v1/users/${admin.id}/grants/${existing.id}`,
      { roleKeys },
      { method: 'PUT' },
    );
    return;
  }

  await request(`/management/v1/users/${admin.id}/grants`, {
    projectId,
    roleKeys: ['admin', 'marketplace-admin', 'tenant-admin'],
  });
};

const getWebAppConfig = () => ({
  redirectUris: [config.callbackUrl],
  responseTypes: ['OIDC_RESPONSE_TYPE_CODE'],
  grantTypes: [
    'OIDC_GRANT_TYPE_AUTHORIZATION_CODE',
    'OIDC_GRANT_TYPE_REFRESH_TOKEN',
  ],
  appType: 'OIDC_APP_TYPE_USER_AGENT',
  authMethodType: 'OIDC_AUTH_METHOD_TYPE_NONE',
  postLogoutRedirectUris: [config.postLogoutUrl],
  devMode: config.devMode,
  accessTokenType: 'OIDC_TOKEN_TYPE_BEARER',
  accessTokenRoleAssertion: true,
  idTokenRoleAssertion: true,
  idTokenUserinfoAssertion: true,
});

const ensureWebApp = async (projectId, apps) => {
  const existing = apps.find((app) => app.name === 'FFAX Web');
  if (existing) {
    const clientId = existing.oidcConfig?.clientId || existing.clientId;
    if (!clientId) throw new Error('Existing FFAX Web application has no OIDC client ID');
    await request(
      `/management/v1/projects/${projectId}/apps/${existing.id}/oidc_config`,
      getWebAppConfig(),
      { method: 'PUT' },
    );
    return clientId;
  }

  const created = await request(`/management/v1/projects/${projectId}/apps/oidc`, {
    name: 'FFAX Web',
    version: 'OIDC_VERSION_1_0',
    ...getWebAppConfig(),
  });

  return requireValue(created.clientId, 'a Web client ID');
};

const parseEnv = (content) =>
  Object.fromEntries(
    content
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const separator = line.indexOf('=');
        return separator < 0 ? [line, ''] : [line.slice(0, separator), line.slice(separator + 1)];
      }),
  );

const readExistingServerCredentials = async () => {
  try {
    return parseEnv(await readFile(join(config.outputDir, 'server.env'), 'utf8'));
  } catch {
    return {};
  }
};

const ensureApiApp = async (projectId, apps) => {
  const existing = apps.find((app) => app.name === 'FFAX API');

  if (existing) {
    const saved = await readExistingServerCredentials();
    const clientId = existing.apiConfig?.clientId || existing.clientId;
    if (saved.ZITADEL_API_CLIENT_ID === clientId && saved.ZITADEL_API_CLIENT_SECRET) {
      return { clientId, clientSecret: saved.ZITADEL_API_CLIENT_SECRET };
    }

    const regenerated = await request(
      '/zitadel.application.v2.ApplicationService/GenerateClientSecret',
      { applicationId: existing.id, projectId },
      { headers: { 'Connect-Protocol-Version': '1' } },
    );
    return {
      clientId: requireValue(clientId, 'an API client ID'),
      clientSecret: requireValue(regenerated.clientSecret, 'a regenerated API client secret'),
    };
  }

  const created = await request(`/management/v1/projects/${projectId}/apps/api`, {
    name: 'FFAX API',
    authMethodType: 'API_AUTH_METHOD_TYPE_BASIC',
  });

  return {
    clientId: requireValue(created.clientId, 'an API client ID'),
    clientSecret: requireValue(created.clientSecret, 'an API client secret'),
  };
};

const writeOutputs = async ({ projectId, webClientId, apiClientId, apiClientSecret }) => {
  await mkdir(config.outputDir, { recursive: true });

  const frontendEnv = [
    `VITE_ZITADEL_DOMAIN=${config.publicUrl}`,
    `VITE_ZITADEL_CLIENT_ID=${webClientId}`,
    `VITE_ZITADEL_PROJECT_ID=${projectId}`,
    `VITE_ZITADEL_CALLBACK_URL=${config.callbackUrl}`,
    `VITE_ZITADEL_POST_LOGOUT_URL=${config.postLogoutUrl}`,
    `VITE_ZITADEL_ACCOUNT_URL=${config.publicUrl}/ui/console/users/me`,
    'VITE_POST_LOGIN_URL=/workbench',
    `VITE_API_URL=${config.apiUrl}`,
    '',
  ].join('\n');

  const serverEnv = [
    'PORT=8000',
    `FFAX_ALLOWED_ORIGINS=${frontendOrigin}`,
    `FFAX_FRONTEND_URL=${config.frontendUrl}`,
    `ZITADEL_ISSUER=${config.publicUrl}`,
    'ZITADEL_INTERNAL_URL=http://zitadel-api:8080',
    `ZITADEL_PROJECT_ID=${projectId}`,
    `ZITADEL_API_CLIENT_ID=${apiClientId}`,
    `ZITADEL_API_CLIENT_SECRET=${apiClientSecret}`,
    `ZITADEL_INSTANCE_HOST=${config.instanceHost}`,
    `ZITADEL_PUBLIC_SCHEME=${config.publicUrl.startsWith('https://') ? 'https' : 'http'}`,
    'ZITADEL_LOGIN_CLIENT_PAT_FILE=/zitadel/bootstrap/login-client.pat',
    '',
  ].join('\n');

  await writeFile(join(config.outputDir, 'frontend.env.local'), frontendEnv, { mode: 0o600 });
  await writeFile(join(config.outputDir, 'server.env'), serverEnv, { mode: 0o600 });
  await writeFile(
    join(config.outputDir, 'summary.json'),
    `${JSON.stringify(
      {
        issuer: config.publicUrl,
        projectId,
        webClientId,
        apiClientId,
        callbackUrl: config.callbackUrl,
        postLogoutUrl: config.postLogoutUrl,
      },
      null,
      2,
    )}\n`,
    { mode: 0o600 },
  );
};

const projectId = await ensureProject();
await ensureShortLoginPolicy();
await ensureLoginV2Feature();
await ensureRoles(projectId);
await ensureInitialAdminRole(projectId);
const apps = await search(`/management/v1/projects/${projectId}/apps/_search`);
const webClientId = await ensureWebApp(projectId, apps);
const { clientId: apiClientId, clientSecret: apiClientSecret } = await ensureApiApp(
  projectId,
  apps,
);

await writeOutputs({ projectId, webClientId, apiClientId, apiClientSecret });
console.log('FFAX ZITADEL project, roles, Web app, and API app are configured.');
