import crypto from 'node:crypto';
import express from 'express';
import helmet from 'helmet';
import { trace } from '@opentelemetry/api';
import { connectorById } from '../../channels/catalog.js';
import { createDatabase } from '../shared/database.js';

const channelId = process.env.FFAX_CHANNEL_ID?.trim();
if (!channelId) throw new Error('FFAX_CHANNEL_ID is required');

const port = Number(process.env.PORT || 8200);
const ingressToken = process.env.FFAX_INGRESS_SHARED_TOKEN?.trim();
const database = createDatabase({
  connectionString: process.env.DATABASE_URL,
  schemaUrl: new URL('./schema.sql', import.meta.url),
});
const heartbeatUrl = process.env.FFAX_CONTROL_PLANE_URL?.replace(/\/$/, '');
const heartbeatToken = process.env.FFAX_RUNTIME_HEARTBEAT_TOKEN?.trim();
const instanceId = process.env.INSTANCE_ID || `${channelId}-api`;

const reportHeartbeat = async () => {
  if (!heartbeatUrl || !heartbeatToken) return;
  const databaseHealthy = await database.health();
  await fetch(`${heartbeatUrl}/api/internal/control-plane/channels/${channelId}/heartbeat`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-FFAX-Runtime-Token': heartbeatToken,
    },
    body: JSON.stringify({
      instanceId,
      status: databaseHealthy ? 'healthy' : 'degraded',
      detail: { database: databaseHealthy, port },
    }),
    signal: AbortSignal.timeout(5000),
  });
};

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '5mb' }));

const text = (value, name, max = 300) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    const error = new Error(`invalid_${name}`);
    error.status = 400;
    throw error;
  }
  return value.trim();
};

const authenticateIngress = (req, res, next) => {
  if (!ingressToken)
    return res.status(503).json({ error: 'ingress_authentication_not_configured' });
  const presented = req.headers['x-ffax-ingress-token'];
  if (typeof presented !== 'string') return res.status(401).json({ error: 'missing_ingress_token' });
  const expectedBuffer = Buffer.from(ingressToken);
  const presentedBuffer = Buffer.from(presented);
  if (
    expectedBuffer.length !== presentedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, presentedBuffer)
  )
    return res.status(401).json({ error: 'invalid_ingress_token' });
  return next();
};

const authenticateRuntime = (req, res, next) => {
  if (!heartbeatToken)
    return res.status(503).json({ error: 'runtime_authentication_not_configured' });
  const presented = req.headers['x-ffax-runtime-token'];
  if (typeof presented !== 'string') return res.status(401).json({ error: 'missing_runtime_token' });
  const expectedBuffer = Buffer.from(heartbeatToken);
  const presentedBuffer = Buffer.from(presented);
  if (
    expectedBuffer.length !== presentedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, presentedBuffer)
  )
    return res.status(401).json({ error: 'invalid_runtime_token' });
  return next();
};

app.get('/health', async (_req, res) => {
  const healthy = await database.health();
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    channelId,
    instanceId,
    database: healthy,
  });
});

app.post('/v1/webhooks/:connectorId', authenticateIngress, async (req, res) => {
  const connector = connectorById.get(req.params.connectorId);
  if (!connector || connector.channelId !== channelId)
    return res.status(404).json({ error: 'connector_not_registered_for_channel' });

  const tenantId = text(req.headers['x-ffax-tenant-id'], 'tenant_id', 200);
  const traceId = text(
    req.headers['x-ffax-trace-id'] || crypto.randomUUID().replaceAll('-', ''),
    'trace_id',
    128,
  );
  trace.getActiveSpan()?.setAttribute('ffax.trace_id', traceId);
  trace.getActiveSpan()?.setAttribute('ffax.tenant_id', tenantId);
  trace.getActiveSpan()?.setAttribute('ffax.connector_id', connector.id);
  const externalEventId = text(
    req.headers['x-ffax-event-id'] || req.body.eventId,
    'event_id',
    300,
  );
  const eventType = text(req.body.eventType || 'external.received', 'event_type', 120);
  const entityType = text(req.body.entityType || 'external_event', 'entity_type', 80);
  const entityId = text(req.body.entityId || externalEventId, 'entity_id', 300);

  const accepted = await database.transaction(async (client) => {
    const inserted = await client.query(
      `INSERT INTO channel_inbox
        (trace_id,tenant_id,connector_id,external_event_id,event_type,entity_type,entity_id,payload,headers)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (connector_id,external_event_id) DO NOTHING RETURNING *`,
      [
        traceId,
        tenantId,
        connector.id,
        externalEventId,
        eventType,
        entityType,
        entityId,
        req.body.payload ?? req.body,
        {
          contentType: req.headers['content-type'],
          userAgent: req.headers['user-agent'],
        },
      ],
    );
    if (!inserted.rows[0]) return { duplicate: true, externalEventId, traceId };
    const envelope = {
      channelId,
      traceId,
      inboxId: inserted.rows[0].id,
      tenantId,
      connectorId: connector.id,
      externalEventId,
      eventType,
      entityType,
      entityId,
      operation: req.body.operation === 'delete' ? 'delete' : 'upsert',
      payload: req.body.payload ?? req.body,
      receivedAt: inserted.rows[0].received_at,
    };
    await client.query(
      'INSERT INTO channel_outbox (inbox_id,subject,payload) VALUES ($1,$2,$3)',
      [inserted.rows[0].id, `${channelId}.ingress.${connector.id}`, envelope],
    );
    return { duplicate: false, inboxId: inserted.rows[0].id, externalEventId, traceId };
  });

  res.setHeader('X-FFAX-Trace-Id', traceId);
  res.status(202).json({ data: accepted });
});

app.post('/internal/mutations', authenticateIngress, async (req, res) => {
  const tenantId = text(req.body.tenantId, 'tenant_id', 200);
  const traceId = text(
    req.headers['x-ffax-trace-id'] || req.body.traceId || crypto.randomUUID().replaceAll('-', ''),
    'trace_id',
    128,
  );
  trace.getActiveSpan()?.setAttribute('ffax.trace_id', traceId);
  trace.getActiveSpan()?.setAttribute('ffax.tenant_id', tenantId);
  const operationId = text(req.body.operationId, 'operation_id', 200);
  const entityType = text(req.body.entityType, 'entity_type', 80);
  const entityId = text(req.body.entityId, 'entity_id', 300);
  const baseVersion = Math.max(Number(req.body.baseVersion) || 0, 0);
  const current = await database.query(
    `SELECT version FROM channel_entity_version
      WHERE tenant_id=$1 AND entity_type=$2 AND entity_id=$3`,
    [tenantId, entityType, entityId],
  );
  const serverVersion = Number(current.rows[0]?.version || 0);
  if (serverVersion !== baseVersion) {
    return res.status(409).json({
      error: 'entity_version_conflict',
      entityType,
      entityId,
      baseVersion,
      serverVersion,
    });
  }

  const accepted = await database.transaction(async (client) => {
    const inserted = await client.query(
      `INSERT INTO channel_inbox
        (trace_id,tenant_id,connector_id,external_event_id,event_type,entity_type,entity_id,payload,headers)
       VALUES ($1,$2,'ffax.device-sync',$3,'device.mutation',$4,$5,$6,$7)
       ON CONFLICT (connector_id,external_event_id) DO NOTHING RETURNING *`,
      [
        traceId,
        tenantId,
        operationId,
        entityType,
        entityId,
        req.body.mutation || {},
        { userId: req.body.userId, deviceId: req.body.deviceId },
      ],
    );
    if (!inserted.rows[0]) return { duplicate: true, operationId, serverVersion, traceId };
    const envelope = {
      channelId,
      traceId,
      inboxId: inserted.rows[0].id,
      tenantId,
      connectorId: 'ffax.device-sync',
      externalEventId: operationId,
      eventType: 'device.mutation',
      entityType,
      entityId,
      operation: req.body.operation === 'delete' ? 'delete' : 'upsert',
      payload: req.body.mutation || {},
      receivedAt: inserted.rows[0].received_at,
    };
    await client.query(
      'INSERT INTO channel_outbox (inbox_id,subject,payload) VALUES ($1,$2,$3)',
      [inserted.rows[0].id, `${channelId}.ingress.ffax.device-sync`, envelope],
    );
    return { duplicate: false, operationId, serverVersion, traceId };
  });
  res.setHeader('X-FFAX-Trace-Id', traceId);
  res.status(202).json({ data: accepted });
});

app.get('/internal/changes', authenticateIngress, async (req, res) => {
  const tenantId = text(req.query.tenantId, 'tenant_id', 200);
  const cursor = Math.max(Number(req.query.cursor) || 0, 0);
  const limit = Math.min(Math.max(Number(req.query.limit) || 200, 1), 500);
  const result = await database.query(
    `SELECT sequence,trace_id,tenant_id,entity_type,entity_id,operation,entity_version,payload,created_at
       FROM channel_change WHERE tenant_id=$1 AND sequence>$2 ORDER BY sequence LIMIT $3`,
    [tenantId, cursor, limit],
  );
  res.json({
    data: {
      changes: result.rows,
      nextCursor: result.rows.at(-1)?.sequence || cursor,
      hasMore: result.rows.length === limit,
    },
  });
});

app.get('/internal/diagnostics/traces/:traceId', authenticateRuntime, async (req, res) => {
  const traceId = text(req.params.traceId, 'trace_id', 128);
  const tenantId = text(req.headers['x-ffax-tenant-id'], 'tenant_id', 200);
  const [inbox, events, changes, deadLetters] = await Promise.all([
    database.query(
      `SELECT id,connector_id,external_event_id,event_type,entity_type,entity_id,received_at,processed_at
         FROM channel_inbox WHERE tenant_id=$1 AND trace_id=$2 ORDER BY received_at`,
      [tenantId, traceId],
    ),
    database.query(
      `SELECT id,inbox_id,connector_id,event_type,entity_type,entity_id,created_at
         FROM channel_event WHERE tenant_id=$1 AND trace_id=$2 ORDER BY created_at`,
      [tenantId, traceId],
    ),
    database.query(
      `SELECT sequence,entity_type,entity_id,operation,entity_version,created_at
         FROM channel_change WHERE tenant_id=$1 AND trace_id=$2 ORDER BY sequence`,
      [tenantId, traceId],
    ),
    database.query(
      `SELECT id,inbox_id,subject,error,attempts,failed_at
         FROM channel_dead_letter WHERE tenant_id=$1 AND trace_id=$2 ORDER BY failed_at`,
      [tenantId, traceId],
    ),
  ]);
  res.json({
    data: {
      channelId,
      traceId,
      inbox: inbox.rows,
      events: events.rows,
      changes: changes.rows,
      deadLetters: deadLetters.rows,
    },
  });
});

app.use((error, _req, res, _next) => {
  const status = Number(error.status) || 500;
  res.status(status).json({ error: status === 500 ? 'internal_server_error' : error.message });
});

const start = async () => {
  await database.initialize();
  app.listen(port, () => console.log(`FFAX ${channelId} API listening on ${port}`));
  await reportHeartbeat().catch((error) => console.error('heartbeat failed', error));
  setInterval(
    () => reportHeartbeat().catch((error) => console.error('heartbeat failed', error)),
    15000,
  );
};

start().catch((error) => {
  console.error(`FFAX ${channelId} API startup failed`, error);
  process.exitCode = 1;
});
