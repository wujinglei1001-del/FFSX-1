import { query } from '../db/index.js';

const getTenantId = (organization) => {
  if (typeof organization === 'string') return organization.trim();
  if (organization && typeof organization === 'object') {
    return String(organization.id || organization.orgId || organization.resourceOwner || '').trim();
  }
  return '';
};

export const requireTenantContext = async (req, res, next) => {
  const tenantId = getTenantId(req.auth?.organization);
  if (!tenantId) return res.status(403).json({ error: 'organization_membership_required' });

  const bans = await query(
    `SELECT target_type, target_id, reason, expires_at FROM ffax_ban
      WHERE active=true AND (expires_at IS NULL OR expires_at > now())
        AND ((target_type='tenant' AND target_id=$1) OR (target_type='user' AND target_id=$2))
      ORDER BY created_at DESC LIMIT 1`,
    [tenantId, req.auth.userId],
  );
  if (bans.rows[0]) {
    return res.status(403).json({
      error: 'access_suspended',
      targetType: bans.rows[0].target_type,
      reason: bans.rows[0].reason,
      expiresAt: bans.rows[0].expires_at,
    });
  }

  req.platform = { tenantId, userId: req.auth.userId, roles: req.auth.roles || [] };
  await query(
    `INSERT INTO ffax_actor (user_id, tenant_id, username, email, roles, updated_at)
     VALUES ($1,$2,$3,$4,$5,now())
     ON CONFLICT (user_id) DO UPDATE SET tenant_id=EXCLUDED.tenant_id, username=EXCLUDED.username,
       email=EXCLUDED.email, roles=EXCLUDED.roles, updated_at=now()`,
    [
      req.auth.userId,
      tenantId,
      req.auth.username || null,
      req.auth.email || null,
      req.auth.roles || [],
    ],
  );
  return next();
};

export const requireAnyRole =
  (...required) =>
  (req, res, next) => {
    if (
      req.platform?.roles?.includes('admin') ||
      required.some((role) => req.platform?.roles?.includes(role))
    )
      return next();
    return res.status(403).json({ error: 'insufficient_role', required });
  };

export const audit = (client, req, action, resourceType, resourceId, detail = {}) =>
  client.query(
    'INSERT INTO ffax_audit_log (tenant_id, actor_id, action, resource_type, resource_id, detail) VALUES ($1,$2,$3,$4,$5,$6)',
    [req.platform.tenantId, req.platform.userId, action, resourceType, resourceId || null, detail],
  );
