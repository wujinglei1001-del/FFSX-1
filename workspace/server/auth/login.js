import { readFile } from 'node:fs/promises';
import { serverConfig } from '../config.js';

let loginClientToken;

const getLoginClientToken = async () => {
  if (loginClientToken) return loginClientToken;

  try {
    loginClientToken = (await readFile(serverConfig.zitadel.loginClientPatFile, 'utf8')).trim();
  } catch {
    const error = new Error('authentication_not_configured');
    error.status = 503;
    throw error;
  }

  if (!loginClientToken) {
    const error = new Error('authentication_not_configured');
    error.status = 503;
    throw error;
  }

  return loginClientToken;
};

export const getZitadelLoginClientHealth = async () => {
  try {
    await getLoginClientToken();
    return { configured: true };
  } catch {
    return { configured: false };
  }
};

const requestZitadel = async (path, { method = 'POST', body } = {}) => {
  const token = await getLoginClientToken();
  let response;
  try {
    response = await fetch(`${serverConfig.zitadel.internalUrl}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Host: serverConfig.zitadel.instanceHost,
        'X-Zitadel-Instance-Host': serverConfig.zitadel.instanceHost,
        'X-Zitadel-Public-Host': serverConfig.zitadel.instanceHost,
        'X-Forwarded-Host': serverConfig.zitadel.instanceHost,
        'X-Forwarded-Proto': serverConfig.zitadel.publicScheme,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    const error = new Error('authentication_service_unavailable');
    error.status = 503;
    throw error;
  }
  const text = await response.text();
  let payload = {};
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { message: text };
    }
  }

  if (!response.ok) {
    const error = new Error(payload.message || `ZITADEL request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return payload;
};

const removeZitadelSession = async (sessionId, sessionToken) => {
  if (!sessionId || !sessionToken) return;

  try {
    await requestZitadel(`/v2/sessions/${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
      body: { sessionToken },
    });
  } catch {
    // Session cleanup failure must not mask the original authentication result.
  }
};

const normalizeAuthRequest = (value = '') =>
  value.startsWith('oidc_') ? value.slice('oidc_'.length) : value;

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '');

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const getEmailVerificationUrlTemplate = () =>
  `${serverConfig.frontendUrl}/authentication/zitadel/verify-email` +
  '?userId={{.UserID}}&code={{.Code}}&orgId={{.OrgID}}';

export const registerWithZitadel = async (req, res, next) => {
  const givenName = normalizeText(req.body?.givenName);
  const familyName = normalizeText(req.body?.familyName);
  const email = normalizeText(req.body?.email).toLowerCase();
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (
    !givenName ||
    !familyName ||
    givenName.length > 200 ||
    familyName.length > 200 ||
    !isValidEmail(email) ||
    email.length > 320 ||
    password.length < 8 ||
    password.length > 200 ||
    !serverConfig.frontendUrl
  ) {
    res.status(400).json({ error: 'registration_invalid' });
    return;
  }

  try {
    await requestZitadel('/v2/users/human', {
      body: {
        username: email,
        profile: {
          givenName,
          familyName,
          displayName: `${givenName} ${familyName}`,
        },
        email: {
          email,
          sendCode: {
            urlTemplate: getEmailVerificationUrlTemplate(),
          },
        },
        password: {
          password,
          changeRequired: false,
        },
      },
    });

    res
      .status(201)
      .set('Cache-Control', 'no-store')
      .json({ data: { verificationRequired: true } });
  } catch (error) {
    if (error.status === 400 || error.status === 409) {
      res.status(error.status).json({
        error: 'registration_failed',
      });
      return;
    }

    next(error);
  }
};

export const verifyEmailWithZitadel = async (req, res, next) => {
  const userId = normalizeText(req.body?.userId);
  const verificationCode = normalizeText(req.body?.code);

  if (!userId || userId.length > 200 || !verificationCode || verificationCode.length > 512) {
    res.status(400).json({ error: 'verification_invalid' });
    return;
  }

  try {
    await requestZitadel(`/v2/users/${encodeURIComponent(userId)}/email/verify`, {
      body: { verificationCode },
    });

    res.set('Cache-Control', 'no-store').json({ data: { verified: true } });
  } catch (error) {
    if (error.status === 400 || error.status === 404) {
      res.status(400).json({ error: 'verification_expired' });
      return;
    }

    next(error);
  }
};

export const loginWithZitadel = async (req, res, next) => {
  const loginName = typeof req.body?.loginName === 'string' ? req.body.loginName.trim() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const authRequest = normalizeAuthRequest(
    typeof req.body?.authRequest === 'string' ? req.body.authRequest.trim() : '',
  );
  const rememberDevice = req.body?.rememberDevice === true;

  if (!loginName || !password || !/^V2_[A-Za-z0-9_-]+$/.test(authRequest)) {
    res.status(400).json({ error: 'login_invalid_request' });
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
      ...(rememberDevice ? { maxAge: 30 * 24 * 60 * 60 * 1000 } : {}),
    };
    res.cookie('ffax_zitadel_session_id', sessionId, cookieOptions);
    res.cookie('ffax_zitadel_session_token', sessionToken, cookieOptions);
    res.set('Cache-Control', 'no-store').json({ data: { callbackUrl: finalized.callbackUrl } });
  } catch (error) {
    await removeZitadelSession(sessionId, sessionToken);

    if (error.status === 400 || error.status === 401 || error.status === 404) {
      res.status(401).json({ error: 'login_invalid_credentials' });
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
  await removeZitadelSession(sessionId, sessionToken);

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
