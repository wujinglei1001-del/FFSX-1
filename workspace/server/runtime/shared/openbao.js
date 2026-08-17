const address = process.env.OPENBAO_ADDR?.replace(/\/$/, '');
const roleId = process.env.OPENBAO_ROLE_ID?.trim();
const secretId = process.env.OPENBAO_SECRET_ID?.trim();
let cachedToken = null;
let tokenExpiresAt = 0;

const login = async () => {
  if (!address || !roleId || !secretId) throw new Error('openbao_approle_not_configured');
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) return cachedToken;
  const response = await fetch(`${address}/v1/auth/approle/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role_id: roleId, secret_id: secretId }),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`openbao_login_failed:${response.status}`);
  const body = await response.json();
  cachedToken = body.auth.client_token;
  tokenExpiresAt = Date.now() + Number(body.auth.lease_duration || 3600) * 1000;
  return cachedToken;
};

const referencePath = ({ reference, channelId, tenantId }) => {
  const requiredPrefix = `openbao://secret/tenants/${tenantId}/connectors/${channelId}/`;
  if (typeof reference !== 'string' || !reference.startsWith(requiredPrefix)) {
    throw new Error('openbao_reference_outside_runtime_scope');
  }
  const logicalPath = reference.slice('openbao://secret/'.length);
  if (!logicalPath || logicalPath.includes('..')) throw new Error('invalid_openbao_reference');
  return `/v1/secret/data/${logicalPath.split('/').map(encodeURIComponent).join('/')}`;
};

export const readConnectorCredential = async ({ reference, channelId, tenantId }) => {
  const token = await login();
  const response = await fetch(`${address}${referencePath({ reference, channelId, tenantId })}`, {
    headers: { 'X-Vault-Token': token },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`openbao_secret_read_failed:${response.status}`);
  const body = await response.json();
  return body.data?.data || {};
};

export const writeConnectorCredential = async ({ reference, channelId, tenantId, credential }) => {
  const token = await login();
  const response = await fetch(`${address}${referencePath({ reference, channelId, tenantId })}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Vault-Token': token },
    body: JSON.stringify({ data: credential }),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`openbao_secret_write_failed:${response.status}`);
  const body = await response.json();
  return { version: body.data?.version || null };
};
