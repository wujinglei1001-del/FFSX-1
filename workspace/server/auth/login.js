import { readFile } from 'node:fs/promises';
import { serverConfig } from '../config.js';

let loginClientToken;

const getLoginClientToken = async () => {
  if (loginClientToken) return loginClientToken;

  loginClientToken = (await readFile(serverConfig.zitadel.loginClientPatFile, 'utf8')).trim();
  if (!loginClientToken) {
    throw new Error('ZITADEL login client token is empty');
  }

  return loginClientToken;
};

const requestZitadel = async (path, { method = 'POST', body } = {}) => {
  const token = await getLoginClientToken();
  const response = await fetch(`${serverConfig.zitadel.internalUrl}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Host: serverConfig.zitadel.instanceHost,
      'X-Forwarded-Proto': serverConfig.zitadel.publicScheme,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const error = new Error(payload.message || `ZITADEL request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return payload;
};

const removeFailedSession = async (sessionId, sessionToken) => {
  if (!sessionId || !sessionToken) return;

  try {
    await requestZitadel(`/v2/sessions/${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
      body: { sessionToken },
    });
  } catch {
    // The failed login response is more important than cleanup failure.
  }
};

const normalizeAuthRequest = (value = '') =>
  value.startsWith('oidc_') ? value.slice('oidc_'.length) : value;

export const loginWithZitadel = async (req, res, next) => {
  const loginName = typeof req.body?.loginName === 'string' ? req.body.loginName.trim() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const authRequest = normalizeAuthRequest(
    typeof req.body?.authRequest === 'string' ? req.body.authRequest.trim() : '',
  );

  if (!loginName || !password || !/^V2_[A-Za-z0-9_-]+$/.test(authRequest)) {
    res.status(400).json({ error: '登录信息不完整。' });
    return;
  }

  let sessionId;
  let sessionToken;

  try {
    const created = await requestZitadel('/v2/sessions', {
      body: { checks: { user: { loginName } } },
    });
    sessionId = created.sessionId;
    sessionToken = created.sessionToken;

    const updated = await requestZitadel(`/v2/sessions/${encodeURIComponent(sessionId)}`, {
      method: 'PATCH',
      body: { checks: { password: { password } } },
    });
    sessionToken = updated.sessionToken;

    const finalized = await requestZitadel(
      `/v2/oidc/auth_requests/${encodeURIComponent(authRequest)}`,
      {
        body: { session: { sessionId, sessionToken } },
      },
    );

    if (!finalized.callbackUrl) {
      throw new Error('ZITADEL did not return a callback URL');
    }

    const cookieOptions = {
      httpOnly: true,
      secure: serverConfig.zitadel.publicScheme === 'https',
      sameSite: 'lax',
      path: '/',
      maxAge: 12 * 60 * 60 * 1000,
    };
    res.cookie('ffax_zitadel_session_id', sessionId, cookieOptions);
    res.cookie('ffax_zitadel_session_token', sessionToken, cookieOptions);
    res.set('Cache-Control', 'no-store').json({ data: { callbackUrl: finalized.callbackUrl } });
  } catch (error) {
    await removeFailedSession(sessionId, sessionToken);

    if (error.status === 400 || error.status === 401 || error.status === 404) {
      res.status(401).json({ error: '用户名或密码不正确。' });
      return;
    }

    next(error);
  }
};

const readCookie = (req, name) => {
  const prefix = `${name}=`;
  const value = (req.headers.cookie || '')
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(prefix));
  return value ? decodeURIComponent(value.slice(prefix.length)) : '';
};

export const logoutWithZitadel = async (req, res) => {
  const sessionId = readCookie(req, 'ffax_zitadel_session_id');
  const sessionToken = readCookie(req, 'ffax_zitadel_session_token');
  await removeFailedSession(sessionId, sessionToken);

  const cookieOptions = {
    httpOnly: true,
    secure: serverConfig.zitadel.publicScheme === 'https',
    sameSite: 'lax',
    path: '/',
  };
  res.clearCookie('ffax_zitadel_session_id', cookieOptions);
  res.clearCookie('ffax_zitadel_session_token', cookieOptions);
  res.status(204).end();
};
