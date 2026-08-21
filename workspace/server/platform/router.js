import express from 'express';
import { serverConfig } from '../config.js';
import { query, withTransaction } from '../db/index.js';
import { createTenantSubscription, publishTenantEvent } from '../realtime.js';
import { audit, requireAnyRole } from './context.js';

export const platformRouter = express.Router();

const text = (value, name, max = 4000) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    const error = new Error(`invalid_${name}`);
    error.status = 400;
    throw error;
  }
  return value.trim();
};

const optionalText = (value, max = 4000) => {
  if (value == null || value === '') return null;
  if (typeof value !== 'string' || value.trim().length > max) {
    const error = new Error('invalid_text');
    error.status = 400;
    throw error;
  }
  return value.trim();
};

const jsonObject = (value, fallback = {}) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : fallback;

const jsonArray = (value, fallback = []) => (Array.isArray(value) ? value : fallback);

const pageParams = (req) => ({
  limit: Math.min(Math.max(Number(req.query.limit) || 30, 1), 100),
  offset: Math.max(Number(req.query.offset) || 0, 0),
});

const notFound = (name = 'resource') => {
  const error = new Error(`${name}_not_found`);
  error.status = 404;
  return error;
};

const optionalTimestamp = (value, name) => {
  if (value == null || value === '') return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const error = new Error(`invalid_${name}`);
    error.status = 400;
    throw error;
  }
  return date.toISOString();
};

platformRouter.get('/v1/catalog/categories', async (req, res) => {
  const result = await query(
    'SELECT * FROM ffax_category WHERE active=true AND (tenant_id IS NULL OR tenant_id=$1) ORDER BY name',
    [req.platform.tenantId],
  );
  res.json({ data: result.rows });
});

platformRouter.get('/v1/catalog/locations', async (_req, res) => {
  const result = await query('SELECT * FROM ffax_location WHERE active=true ORDER BY level, name');
  res.json({ data: result.rows });
});

platformRouter.get('/v1/tenant/profile', async (req, res) => {
  const result = await query('SELECT * FROM ffax_tenant_profile WHERE tenant_id=$1', [
    req.platform.tenantId,
  ]);
  res.json({ data: result.rows[0] || null });
});

platformRouter.put(
  '/v1/tenant/profile',
  requireAnyRole('tenant-admin', 'marketplace-admin'),
  async (req, res) => {
    const displayName = text(req.body.displayName, 'display_name', 160);
    const result = await query(
      `INSERT INTO ffax_tenant_profile (tenant_id, display_name, description, website, metadata, updated_by)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (tenant_id) DO UPDATE SET display_name=EXCLUDED.display_name,
       description=EXCLUDED.description, website=EXCLUDED.website, metadata=EXCLUDED.metadata,
       updated_by=EXCLUDED.updated_by, updated_at=now() RETURNING *`,
      [
        req.platform.tenantId,
        displayName,
        optionalText(req.body.description, 8000) || '',
        optionalText(req.body.website, 500),
        jsonObject(req.body.metadata),
        req.platform.userId,
      ],
    );
    res.json({ data: result.rows[0] });
  },
);

platformRouter.get('/v1/demands', async (req, res) => {
  const { limit, offset } = pageParams(req);
  const mineOnly = req.query.scope === 'mine';
  const status = optionalText(req.query.status, 30);
  const values = [req.platform.tenantId, limit, offset];
  const result = await query(
    `SELECT d.*, p.display_name AS tenant_name
       FROM ffax_demand d LEFT JOIN ffax_tenant_profile p ON p.tenant_id=d.tenant_id
      WHERE ${mineOnly ? 'd.tenant_id=$1' : "(d.tenant_id=$1 OR d.status='published')"}
        AND ($4::text IS NULL OR d.status=$4)
      ORDER BY (d.promoted_until > now()) DESC,
        CASE d.promotion_state WHEN 'featured' THEN 3 WHEN 'recommended' THEN 2 WHEN 'promoted' THEN 1 ELSE 0 END DESC,
        d.created_at DESC LIMIT $2 OFFSET $3`,
    [...values, status],
  );
  res.json({ data: result.rows, limit, offset });
});

platformRouter.get('/v1/demands/:id', async (req, res) => {
  const result = await query(
    `SELECT d.*, p.display_name AS tenant_name FROM ffax_demand d
      LEFT JOIN ffax_tenant_profile p ON p.tenant_id=d.tenant_id
      WHERE d.id=$1 AND (d.tenant_id=$2 OR d.status='published')`,
    [req.params.id, req.platform.tenantId],
  );
  if (!result.rows[0]) throw notFound('demand');
  res.json({ data: result.rows[0] });
});

platformRouter.post('/v1/demands', async (req, res) => {
  const kind = text(req.body.kind, 'kind', 30);
  const title = text(req.body.title, 'title', 220);
  const description = text(req.body.description, 'description', 20000);
  const result = await withTransaction(async (client) => {
    const inserted = await client.query(
      `INSERT INTO ffax_demand
        (tenant_id,author_id,category_id,location_id,kind,title,description,custom_fields,status,expires_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        req.platform.tenantId,
        req.platform.userId,
        req.body.categoryId || null,
        req.body.locationId || null,
        kind,
        title,
        description,
        jsonObject(req.body.customFields),
        req.body.status === 'published' ? 'published' : 'draft',
        req.body.expiresAt || null,
      ],
    );
    await audit(client, req, 'demand.create', 'demand', inserted.rows[0].id);
    return inserted.rows[0];
  });
  await publishTenantEvent(req.platform.tenantId, { type: 'demand.created', data: result });
  res.status(201).json({ data: result });
});

platformRouter.put('/v1/demands/:id', async (req, res) => {
  const result = await withTransaction(async (client) => {
    const updated = await client.query(
      `UPDATE ffax_demand SET title=COALESCE($3,title), description=COALESCE($4,description),
        category_id=COALESCE($5,category_id), location_id=COALESCE($6,location_id),
        custom_fields=COALESCE($7,custom_fields), status=COALESCE($8,status), expires_at=COALESCE($9,expires_at), updated_at=now()
       WHERE id=$1 AND tenant_id=$2 RETURNING *`,
      [
        req.params.id,
        req.platform.tenantId,
        optionalText(req.body.title, 220),
        optionalText(req.body.description, 20000),
        req.body.categoryId || null,
        req.body.locationId || null,
        req.body.customFields ? jsonObject(req.body.customFields) : null,
        optionalText(req.body.status, 30),
        req.body.expiresAt || null,
      ],
    );
    if (!updated.rows[0]) throw notFound('demand');
    await audit(client, req, 'demand.update', 'demand', req.params.id);
    return updated.rows[0];
  });
  await publishTenantEvent(req.platform.tenantId, { type: 'demand.updated', data: result });
  res.json({ data: result });
});

platformRouter.get('/v1/favorites', async (req, res) => {
  const result = await query(
    'SELECT * FROM ffax_favorite WHERE tenant_id=$1 AND user_id=$2 ORDER BY created_at DESC',
    [req.platform.tenantId, req.platform.userId],
  );
  res.json({ data: result.rows });
});

platformRouter.put('/v1/favorites/:type/:id', async (req, res) => {
  const targetType = text(req.params.type, 'favorite_type', 30);
  const result = await query(
    `INSERT INTO ffax_favorite (tenant_id,user_id,target_type,target_id,snapshot) VALUES ($1,$2,$3,$4,$5)
     ON CONFLICT (tenant_id,user_id,target_type,target_id) DO UPDATE SET snapshot=EXCLUDED.snapshot RETURNING *`,
    [
      req.platform.tenantId,
      req.platform.userId,
      targetType,
      text(req.params.id, 'target_id', 300),
      jsonObject(req.body.snapshot),
    ],
  );
  res.json({ data: result.rows[0] });
});

platformRouter.delete('/v1/favorites/:type/:id', async (req, res) => {
  await query(
    'DELETE FROM ffax_favorite WHERE tenant_id=$1 AND user_id=$2 AND target_type=$3 AND target_id=$4',
    [req.platform.tenantId, req.platform.userId, req.params.type, req.params.id],
  );
  res.status(204).end();
});

platformRouter.get('/v1/demands/:id/offers', async (req, res) => {
  const result = await query(
    `SELECT o.* FROM ffax_offer o JOIN ffax_demand d ON d.id=o.demand_id
      WHERE o.demand_id=$1 AND (o.tenant_id=$2 OR d.tenant_id=$2) ORDER BY o.created_at DESC`,
    [req.params.id, req.platform.tenantId],
  );
  res.json({ data: result.rows });
});

platformRouter.post('/v1/demands/:id/offers', async (req, res) => {
  const amount = Number(req.body.amount);
  if (!Number.isFinite(amount) || amount < 0) {
    const error = new Error('invalid_amount');
    error.status = 400;
    throw error;
  }
  const currency = text(req.body.currency || 'USD', 'currency', 3).toUpperCase();
  const result = await withTransaction(async (client) => {
    const demand = await client.query(
      "SELECT * FROM ffax_demand WHERE id=$1 AND status='published'",
      [req.params.id],
    );
    if (!demand.rows[0]) throw notFound('demand');
    const inserted = await client.query(
      `INSERT INTO ffax_offer (demand_id,tenant_id,user_id,parent_offer_id,amount,currency,terms,expires_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        req.params.id,
        req.platform.tenantId,
        req.platform.userId,
        req.body.parentOfferId || null,
        amount,
        currency,
        optionalText(req.body.terms, 10000) || '',
        req.body.expiresAt || null,
      ],
    );
    if (req.body.parentOfferId)
      await client.query("UPDATE ffax_offer SET status='countered' WHERE id=$1", [
        req.body.parentOfferId,
      ]);
    await client.query(
      'INSERT INTO ffax_notification (tenant_id,type,title,payload) VALUES ($1,$2,$3,$4)',
      [
        demand.rows[0].tenant_id,
        'offer.created',
        '收到新的报价',
        { demandId: req.params.id, offerId: inserted.rows[0].id },
      ],
    );
    await audit(client, req, 'offer.create', 'offer', inserted.rows[0].id);
    return { offer: inserted.rows[0], ownerTenant: demand.rows[0].tenant_id };
  });
  await publishTenantEvent(result.ownerTenant, { type: 'offer.created', data: result.offer });
  res.status(201).json({ data: result.offer });
});

platformRouter.post('/v1/offers/:id/status', async (req, res) => {
  const status = text(req.body.status, 'offer_status', 20);
  const result = await withTransaction(async (client) => {
    const updated = await client.query(
      `UPDATE ffax_offer o SET status=$3 FROM ffax_demand d
       WHERE o.id=$1 AND d.id=o.demand_id AND (o.tenant_id=$2 OR d.tenant_id=$2)
         AND $3 = ANY(ARRAY['accepted','rejected','withdrawn']::text[]) RETURNING o.*`,
      [req.params.id, req.platform.tenantId, status],
    );
    if (!updated.rows[0]) throw notFound('offer');
    if (status === 'accepted') {
      await client.query(
        "UPDATE ffax_offer SET status='rejected' WHERE demand_id=$1 AND id<>$2 AND status IN ('pending','countered')",
        [updated.rows[0].demand_id, req.params.id],
      );
      await client.query("UPDATE ffax_demand SET status='matched',updated_at=now() WHERE id=$1", [
        updated.rows[0].demand_id,
      ]);
    }
    await audit(client, req, `offer.${status}`, 'offer', req.params.id);
    return updated.rows[0];
  });
  res.json({ data: result });
});

platformRouter.get('/v1/conversations', async (req, res) => {
  const result = await query(
    `SELECT c.*,
       (SELECT count(*)::int FROM ffax_message m LEFT JOIN ffax_conversation_read r
         ON r.conversation_id=m.conversation_id AND r.user_id=$2
        WHERE m.conversation_id=c.id AND m.sender_id<>$2 AND m.created_at>COALESCE(r.read_at,'epoch')) AS unread_count
     FROM ffax_conversation c WHERE $1=ANY(c.participant_tenants) ORDER BY c.updated_at DESC`,
    [req.platform.tenantId, req.platform.userId],
  );
  res.json({ data: result.rows });
});

platformRouter.post('/v1/conversations', async (req, res) => {
  const otherTenant = text(req.body.participantTenantId, 'participant_tenant', 200);
  const otherUser = optionalText(req.body.participantUserId, 200);
  const result = await query(
    `INSERT INTO ffax_conversation (demand_id,participant_tenants,participant_users,created_by)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [
      req.body.demandId || null,
      [req.platform.tenantId, otherTenant],
      [req.platform.userId, ...(otherUser ? [otherUser] : [])],
      req.platform.userId,
    ],
  );
  res.status(201).json({ data: result.rows[0] });
});

platformRouter.get('/v1/conversations/:id/messages', async (req, res) => {
  const result = await query(
    `SELECT m.* FROM ffax_message m JOIN ffax_conversation c ON c.id=m.conversation_id
      WHERE c.id=$1 AND $2=ANY(c.participant_tenants) ORDER BY m.created_at`,
    [req.params.id, req.platform.tenantId],
  );
  res.json({ data: result.rows });
});

platformRouter.post('/v1/conversations/:id/messages', async (req, res) => {
  const body = text(req.body.body, 'message', 12000);
  const result = await withTransaction(async (client) => {
    const conversation = await client.query(
      'SELECT * FROM ffax_conversation WHERE id=$1 AND $2=ANY(participant_tenants)',
      [req.params.id, req.platform.tenantId],
    );
    if (!conversation.rows[0]) throw notFound('conversation');
    const inserted = await client.query(
      'INSERT INTO ffax_message (conversation_id,tenant_id,sender_id,body,attachments) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [
        req.params.id,
        req.platform.tenantId,
        req.platform.userId,
        body,
        jsonArray(req.body.attachments),
      ],
    );
    await client.query('UPDATE ffax_conversation SET updated_at=now() WHERE id=$1', [
      req.params.id,
    ]);
    return { message: inserted.rows[0], tenants: conversation.rows[0].participant_tenants };
  });
  await Promise.all(
    result.tenants.map((tenantId) =>
      publishTenantEvent(tenantId, { type: 'message.created', data: result.message }),
    ),
  );
  res.status(201).json({ data: result.message });
});

platformRouter.put('/v1/conversations/:id/read', async (req, res) => {
  const allowed = await query(
    'SELECT 1 FROM ffax_conversation WHERE id=$1 AND $2=ANY(participant_tenants)',
    [req.params.id, req.platform.tenantId],
  );
  if (!allowed.rows[0]) throw notFound('conversation');
  await query(
    `INSERT INTO ffax_conversation_read (conversation_id,user_id,read_at) VALUES ($1,$2,now())
     ON CONFLICT (conversation_id,user_id) DO UPDATE SET read_at=now()`,
    [req.params.id, req.platform.userId],
  );
  res.status(204).end();
});

platformRouter.get('/v1/notifications', async (req, res) => {
  const result = await query(
    'SELECT * FROM ffax_notification WHERE tenant_id=$1 AND (user_id IS NULL OR user_id=$2) ORDER BY created_at DESC LIMIT 100',
    [req.platform.tenantId, req.platform.userId],
  );
  res.json({ data: result.rows });
});

platformRouter.put('/v1/notifications/:id/read', async (req, res) => {
  const result = await query(
    `UPDATE ffax_notification SET read_at=now()
      WHERE id=$1 AND tenant_id=$2 AND (user_id IS NULL OR user_id=$3) RETURNING *`,
    [req.params.id, req.platform.tenantId, req.platform.userId],
  );
  if (!result.rows[0]) throw notFound('notification');
  res.json({ data: result.rows[0] });
});

platformRouter.get('/v1/events', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  res.write(`event: ready\ndata: ${JSON.stringify({ tenantId: req.platform.tenantId })}\n\n`);
  const unsubscribe = await createTenantSubscription(req.platform.tenantId, (message) =>
    res.write(`event: update\ndata: ${message}\n\n`),
  );
  const heartbeat = setInterval(() => res.write(': heartbeat\n\n'), 25000);
  req.on('close', async () => {
    clearInterval(heartbeat);
    await unsubscribe();
  });
});

platformRouter.post('/v1/reviews', async (req, res) => {
  const rating = Number(req.body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    const error = new Error('invalid_rating');
    error.status = 400;
    throw error;
  }
  const result = await query(
    `INSERT INTO ffax_review (tenant_id,author_id,target_type,target_id,reference_id,rating,body)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [
      req.platform.tenantId,
      req.platform.userId,
      text(req.body.targetType, 'target_type', 30),
      text(req.body.targetId, 'target_id', 200),
      text(req.body.referenceId, 'reference_id', 200),
      rating,
      optionalText(req.body.body, 8000) || '',
    ],
  );
  res.status(201).json({ data: result.rows[0] });
});

platformRouter.post('/v1/reports', async (req, res) => {
  const result = await query(
    `INSERT INTO ffax_report (tenant_id,reporter_id,target_type,target_id,reason,details)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      req.platform.tenantId,
      req.platform.userId,
      text(req.body.targetType, 'target_type', 50),
      text(req.body.targetId, 'target_id', 300),
      text(req.body.reason, 'reason', 200),
      optionalText(req.body.details, 8000) || '',
    ],
  );
  res.status(201).json({ data: result.rows[0] });
});

platformRouter.get(
  '/v1/moderation/reports',
  requireAnyRole('marketplace-admin'),
  async (_req, res) => {
    const result = await query('SELECT * FROM ffax_report ORDER BY created_at DESC LIMIT 200');
    res.json({ data: result.rows });
  },
);

platformRouter.put(
  '/v1/moderation/reports/:id',
  requireAnyRole('marketplace-admin'),
  async (req, res) => {
    const result = await query(
      'UPDATE ffax_report SET status=$2,resolution=$3,reviewed_by=$4,updated_at=now() WHERE id=$1 RETURNING *',
      [
        req.params.id,
        text(req.body.status, 'status', 20),
        optionalText(req.body.resolution, 8000),
        req.platform.userId,
      ],
    );
    if (!result.rows[0]) throw notFound('report');
    res.json({ data: result.rows[0] });
  },
);

platformRouter.put(
  '/v1/moderation/demands/:id/promotion',
  requireAnyRole('marketplace-admin'),
  async (req, res) => {
    const promotionState = text(req.body.promotionState, 'promotion_state', 30);
    if (!['none', 'recommended', 'featured', 'promoted'].includes(promotionState)) {
      return res.status(400).json({ error: 'invalid_promotion_state' });
    }
    const promotedUntil = optionalTimestamp(req.body.promotedUntil, 'promoted_until');
    const result = await query(
      `UPDATE ffax_demand SET promotion_state=$2,promoted_until=$3,updated_at=now()
        WHERE id=$1 RETURNING *`,
      [req.params.id, promotionState, promotionState === 'none' ? null : promotedUntil],
    );
    if (!result.rows[0]) throw notFound('demand');
    res.json({ data: result.rows[0] });
  },
);

platformRouter.get(
  '/v1/moderation/bans',
  requireAnyRole('marketplace-admin'),
  async (_req, res) => {
    const result = await query('SELECT * FROM ffax_ban ORDER BY created_at DESC LIMIT 200');
    res.json({ data: result.rows });
  },
);

platformRouter.post(
  '/v1/moderation/bans',
  requireAnyRole('marketplace-admin'),
  async (req, res) => {
    const targetType = text(req.body.targetType, 'target_type', 20);
    if (!['tenant', 'user'].includes(targetType)) {
      return res.status(400).json({ error: 'invalid_ban_target_type' });
    }
    const result = await query(
      `INSERT INTO ffax_ban (target_type,target_id,reason,expires_at,created_by)
        VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [
        targetType,
        text(req.body.targetId, 'target_id', 300),
        text(req.body.reason, 'reason', 2000),
        optionalTimestamp(req.body.expiresAt, 'expires_at'),
        req.platform.userId,
      ],
    );
    res.status(201).json({ data: result.rows[0] });
  },
);

platformRouter.delete(
  '/v1/moderation/bans/:id',
  requireAnyRole('marketplace-admin'),
  async (req, res) => {
    const result = await query(
      `UPDATE ffax_ban SET active=false,revoked_by=$2,revoked_at=now()
        WHERE id=$1 AND active=true RETURNING *`,
      [req.params.id, req.platform.userId],
    );
    if (!result.rows[0]) throw notFound('ban');
    res.json({ data: result.rows[0] });
  },
);

platformRouter.get('/v1/plugins', async (req, res) => {
  const result = await query(
    `SELECT p.*, tp.lifecycle, tp.installed_version, tp.config_version, tp.licensed_until
     FROM ffax_plugin p LEFT JOIN ffax_tenant_plugin tp ON tp.plugin_id=p.id AND tp.tenant_id=$1
     WHERE p.status='available' ORDER BY p.name`,
    [req.platform.tenantId],
  );
  res.json({ data: result.rows, paymentsEnabled: serverConfig.paymentsEnabled });
});

platformRouter.post(
  '/v1/plugins/:id/purchase',
  requireAnyRole('tenant-admin', 'marketplace-admin'),
  async (req, res) => {
    const plugin = await query("SELECT * FROM ffax_plugin WHERE id=$1 AND status='available'", [
      req.params.id,
    ]);
    if (!plugin.rows[0]) throw notFound('plugin');
    if (plugin.rows[0].price_minor > 0 && !serverConfig.paymentsEnabled) {
      return res.status(409).json({ error: 'real_payments_disabled_pending_kyc' });
    }
    const result = await query(
      `INSERT INTO ffax_tenant_plugin (tenant_id,plugin_id,purchase_order_id,installed_version,lifecycle,updated_by)
     VALUES ($1,$2,$3,$4,'purchased',$5)
     ON CONFLICT (tenant_id,plugin_id) DO UPDATE SET purchase_order_id=EXCLUDED.purchase_order_id,
       lifecycle='purchased',updated_by=EXCLUDED.updated_by,updated_at=now() RETURNING *`,
      [
        req.platform.tenantId,
        req.params.id,
        req.body.orderId || `internal:${Date.now()}`,
        plugin.rows[0].version,
        req.platform.userId,
      ],
    );
    res.json({ data: result.rows[0] });
  },
);

const pluginTransitions = {
  install: ['purchased', 'failed'],
  enable: ['disabled'],
  disable: ['active'],
  upgrade: ['active'],
  retry: ['failed'],
};
platformRouter.post(
  '/v1/plugins/:id/:action',
  requireAnyRole('tenant-admin', 'marketplace-admin'),
  async (req, res) => {
    const action = req.params.action;
    if (!pluginTransitions[action]) return res.status(404).json({ error: 'unknown_plugin_action' });
    const before = await query(
      'SELECT * FROM ffax_tenant_plugin WHERE tenant_id=$1 AND plugin_id=$2',
      [req.platform.tenantId, req.params.id],
    );
    if (!before.rows[0]) throw notFound('plugin_installation');
    if (!pluginTransitions[action].includes(before.rows[0].lifecycle))
      return res
        .status(409)
        .json({ error: 'invalid_plugin_transition', lifecycle: before.rows[0].lifecycle });
    const next =
      action === 'disable' ? 'disabled' : action === 'upgrade' ? 'upgrading' : 'installing';
    await query(
      'UPDATE ffax_tenant_plugin SET lifecycle=$3,updated_by=$4,updated_at=now() WHERE tenant_id=$1 AND plugin_id=$2',
      [req.platform.tenantId, req.params.id, next, req.platform.userId],
    );
    const final = action === 'disable' ? 'disabled' : 'active';
    const result = await query(
      `UPDATE ffax_tenant_plugin tp SET lifecycle=$3,installed_version=p.version,config_version=config_version+1,updated_at=now()
     FROM ffax_plugin p WHERE tp.tenant_id=$1 AND tp.plugin_id=$2 AND p.id=tp.plugin_id RETURNING tp.*`,
      [req.platform.tenantId, req.params.id, final],
    );
    await publishTenantEvent(req.platform.tenantId, {
      type: 'plugin.lifecycle',
      data: result.rows[0],
    });
    res.json({ data: result.rows[0] });
  },
);

const layoutHandler = ({ table, configColumn, bodyKey }) => ({
  get: async (req, res) => {
    const result = await query(
      `SELECT * FROM ${table} WHERE tenant_id=$1 AND user_id=$2 AND workspace_id=$3`,
      [req.platform.tenantId, req.platform.userId, req.params.id],
    );
    res.json({ data: result.rows[0] || null });
  },
  put: async (req, res) => {
    const expectedVersion = Number(req.body.version || 0);
    const config = jsonObject(req.body[bodyKey]);
    const secondary = JSON.stringify(
      bodyKey === 'breakpoints' ? jsonArray(req.body.widgets) : jsonArray(req.body.panels),
    );
    const secondaryColumn = bodyKey === 'breakpoints' ? 'widgets' : 'panels';
    const result = await query(
      `INSERT INTO ${table} (tenant_id,user_id,workspace_id,version,${configColumn},${secondaryColumn})
       VALUES ($1,$2,$3,1,$5,$6)
       ON CONFLICT (tenant_id,user_id,workspace_id) DO UPDATE SET version=${table}.version+1,
         ${configColumn}=EXCLUDED.${configColumn},${secondaryColumn}=EXCLUDED.${secondaryColumn},updated_at=now()
       WHERE ${table}.version=$4 RETURNING *`,
      [
        req.platform.tenantId,
        req.platform.userId,
        req.params.id,
        expectedVersion,
        config,
        secondary,
      ],
    );
    if (!result.rows[0]) return res.status(409).json({ error: 'layout_version_conflict' });
    res.json({ data: result.rows[0] });
  },
});

const dashboardLayout = layoutHandler({
  table: 'ffax_dashboard_layout',
  configColumn: 'breakpoints',
  bodyKey: 'breakpoints',
});
const panelLayout = layoutHandler({
  table: 'ffax_panel_layout',
  configColumn: 'resolved_config',
  bodyKey: 'resolvedConfig',
});
platformRouter.get('/v1/workspaces/:id/dashboard-layout', dashboardLayout.get);
platformRouter.put('/v1/workspaces/:id/dashboard-layout', dashboardLayout.put);
platformRouter.get('/v1/workspaces/:id/panel-layout', panelLayout.get);
platformRouter.put('/v1/workspaces/:id/panel-layout', panelLayout.put);

platformRouter.get('/v1/marketplace/status', async (req, res) => {
  res.json({
    data: {
      baseUrl: serverConfig.mercurBaseUrl,
      paymentsEnabled: serverConfig.paymentsEnabled,
      tenantId: req.platform.tenantId,
    },
  });
});
