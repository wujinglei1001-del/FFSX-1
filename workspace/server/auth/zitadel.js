import { getMissingAuthConfig, serverConfig } from '../config.js';

const getRoleClaim = (claims) => {
  const projectSpecificClaim = `urn:zitadel:iam:org:project:${serverConfig.zitadel.projectId}:roles`;

  return (
    claims?.[projectSpecificClaim] ||
    claims?.['urn:zitadel:iam:org:project:roles'] ||
    claims?.['urn:zitadel:iam:org:projects:roles'] ||
    {}
  );
};

const normalizeRoleClaim = (claim) => {
  const normalized = {};
  const grants = Array.isArray(claim) ? claim : [claim];

  for (const grant of grants) {
    if (!grant || typeof grant !== 'object' || Array.isArray(grant)) continue;
    for (const [role, organizations] of Object.entries(grant)) {
      normalized[role] ||= {};
      if (organizations && typeof organizations === 'object' && !Array.isArray(organizations)) {
        Object.assign(normalized[role], organizations);
      }
    }
  }

  return normalized;
};

const extractOrganization = (claims) => {
  if (!claims || typeof claims !== 'object') return '';

  const candidate = [
    claims['urn:zitadel:iam:user:resourceowner:id'],
    claims['urn:zitadel:iam:user:resourceowner'],
    claims['urn:zitadel:iam:org:resourceowner'],
    claims.resourceowner,
    claims.resourceOwner,
    claims.org_id,
    claims.orgId,
    claims.organization_id,
    claims.org?.id,
    claims.organization?.id,
    claims.organization?.orgId,
    claims.organization?.resourceOwner,
  ];

  for (const value of candidate) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  const roleOrganizations = new Set(
    Object.values(normalizeRoleClaim(getRoleClaim(claims))).flatMap((organizations) =>
      Object.keys(organizations),
    ),
  );
  if (roleOrganizations.size === 1) return [...roleOrganizations][0];

  return '';
};

const getBasicAuthorization = () => {
  const credentials = `${serverConfig.zitadel.apiClientId}:${serverConfig.zitadel.apiClientSecret}`;

  return `Basic ${Buffer.from(credentials).toString('base64')}`;
};

const getBearerToken = (authorization = '') => {
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
};

const hasExpectedAudience = (audience) => {
  const audiences = Array.isArray(audience) ? audience : [audience];
  return audiences.filter(Boolean).includes(serverConfig.zitadel.projectId);
};

const getRoles = (claims) => Object.keys(normalizeRoleClaim(getRoleClaim(claims)));

const introspectAccessToken = async (token) => {
  const response = await fetch(serverConfig.zitadel.introspectionUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: getBasicAuthorization(),
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(serverConfig.zitadel.instanceHost
        ? {
            'X-Zitadel-Instance-Host': serverConfig.zitadel.instanceHost,
            'X-Zitadel-Public-Host': serverConfig.zitadel.instanceHost,
          }
        : {}),
    },
    body: new URLSearchParams({
      token,
      token_type_hint: 'access_token',
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    const error = new Error('ZITADEL token introspection failed');
    error.status = 502;
    throw error;
  }

  return response.json();
};

export const requireZitadelAuth = async (req, res, next) => {
  const missingConfig = getMissingAuthConfig();

  if (missingConfig.length > 0) {
    return res.status(503).json({
      error: 'authentication_not_configured',
      missing: missingConfig,
    });
  }

  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ error: 'missing_bearer_token' });
  }

  try {
    const claims = await introspectAccessToken(token);

    if (!claims.active) {
      return res.status(401).json({ error: 'inactive_access_token' });
    }

    if (claims.iss && claims.iss.replace(/\/+$/, '') !== serverConfig.zitadel.issuer) {
      return res.status(401).json({ error: 'invalid_token_issuer' });
    }

    if (!hasExpectedAudience(claims.aud)) {
      return res.status(403).json({ error: 'invalid_token_audience' });
    }

    req.auth = {
      userId: claims.sub,
      username: claims.username || claims.preferred_username,
      email: claims.email,
      organization: extractOrganization(claims),
      roles: getRoles(claims),
      claims,
    };

    return next();
  } catch (error) {
    return next(error);
  }
};

export const requireRoles =
  (...requiredRoles) =>
  (req, res, next) => {
    const roles = req.auth?.roles || [];
    const allowed = requiredRoles.every((role) => roles.includes(role));

    if (!allowed) {
      return res.status(403).json({ error: 'insufficient_role' });
    }

    return next();
  };
