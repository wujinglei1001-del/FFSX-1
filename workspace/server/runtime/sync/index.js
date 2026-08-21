import cors from 'cors';
import { createHash } from 'node:crypto';
import express from 'express';
import helmet from 'helmet';
import { AckPolicy, DeliverPolicy } from '@nats-io/jetstream';
import { requireZitadelAuth } from '../../auth/zitadel.js';
import { channelCatalog, channelById } from '../../channels/catalog.js';
import { createDatabase } from '../shared/database.js';
import { createJetStream } from '../shared/jetstream.js';

const port = Number(process.env.PORT || 8300);
const allowedOrigins = (process.env.FFAX_ALLOWED_ORIGINS || 'http://localhost:5002')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);
const ingressToken = process.env.FFAX_INGRESS_SHARED_TOKEN?.trim();
const database = createDatabase({
  connectionString: process.env.DATABASE_URL,
  schemaUrl: new URL('./schema.sql', import.meta.url),
});
let syncMessaging;

const tenantPartition = (tenantId) =>
  createHash('sha256').update(String(tenantId)).digest('hex').slice(0, 24);

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin is not allowed'));
    },
  }),
);
app.use(express.json({ limit: '2mb' }));

const tenantContext = (req, res, next) => {
  const organization = req.auth?.organization;
  const tenantId =
    typeof organization === 'string'
      ? organization.trim()
      : String(
          organization?.id || organization?.orgId || organization?.resourceOwner || '',
        ).trim();
  if (!tenantId) return res.status(403).json({ error: 'organization_membership_required' });
  req.sync = { tenantId, userId: req.auth.userId, roles: req.auth.roles || [] };
  return next();
};

const text = (value, name, max = 300) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    const error = new Error(`invalid_${name}`);
    error.status = 400;
    throw error;
  }
  return value.trim();
};
const jsonObject = (value) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const cursorNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

app.get('/health', async (_req, res) => {
  const healthy = await database.health();
  res.status(healthy ? 200 : 503).json({ status: healthy ? 'ok' : 'degraded', database: healthy });
});

app.use('/v1', requireZitadelAuth, tenantContext);

app.post('/v1/devices', async (req, res) => {
  const result = await database.query(
    `INSERT INTO sync_device (tenant_id,user_id,device_id,platform,device_name,metadata,last_seen_at)
     VALUES ($1,$2,$3,$4,$5,$6,now())
     ON CONFLICT (tenant_id,user_id,device_id) DO UPDATE SET platform=EXCLUDED.platform,
       device_name=EXCLUDED.device_name,metadata=EXCLUDED.metadata,last_seen_at=now()
     RETURNING tenant_id,user_id,device_id,platform,device_name,last_seen_at`,
    [
      req.sync.tenantId,
      req.sync.userId,
      text(req.body.deviceId, 'device_id', 200),
      text(req.body.platform || 'web', 'platform', 40),
      text(req.body.deviceName || 'FFA-X Web', 'device_name', 160),
      jsonObject(req.body.metadata),
    ],
  );
  res.status(201).json({ data: result.rows[0] });
});

app.get('/v1/changes', async (req, res) => {
  const cursor = cursorNumber(req.query.cursor, 0);
  const limit = Math.min(Math.max(cursorNumber(req.query.limit, 200), 1), 500);
  const result = await database.query(
    `SELECT sequence,trace_id,channel_id,entity_type,entity_id,operation,entity_version,payload,created_at
       FROM sync_change WHERE tenant_id=$1 AND sequence>$2 ORDER BY sequence LIMIT $3`,
    [req.sync.tenantId, cursor, limit + 1],
  );
  const hasMore = result.rows.length > limit;
  const changes = hasMore ? result.rows.slice(0, limit) : result.rows;
  res.json({
    data: {
      changes,
      nextCursor: changes.at(-1)?.sequence || cursor,
      hasMore,
    },
  });
});

app.put('/v1/checkpoints/:deviceId', async (req, res) => {
  const deviceId = text(req.params.deviceId, 'device_id', 200);
  const cursor = cursorNumber(req.body.cursor, -1);
  if (cursor < 0) return res.status(400).json({ error: 'invalid_cursor' });
  const result = await database.query(
    `INSERT INTO sync_checkpoint (tenant_id,user_id,device_id,cursor,acknowledged_at)
     VALUES ($1,$2,$3,$4,now())
     ON CONFLICT (tenant_id,user_id,device_id) DO UPDATE SET
       cursor=GREATEST(sync_checkpoint.cursor,EXCLUDED.cursor),acknowledged_at=now()
     RETURNING device_id,cursor,acknowledged_at`,
    [req.sync.tenantId, req.sync.userId, deviceId, cursor],
  );
  res.json({ data: result.rows[0] });
});

app.post('/v1/outbox', async (req, res) => {
  const deviceId = text(req.body.deviceId, 'device_id', 200);
  const operations = Array.isArray(req.body.operations) ? req.body.operations : [];
  if (!operations.length || operations.length > 100)
    return res.status(400).json({ error: 'operations_must_contain_1_to_100_items' });
  const accepted = await database.transaction(async (client) => {
    const rows = [];
    for (const item of operations) {
      if (!channelById.has(item.channelId)) {
        const error = new Error('unknown_channel');
        error.status = 400;
        throw error;
      }
      const operationId = text(item.operationId, 'operation_id', 200);
      const traceId = createHash('sha256')
        .update(`${req.sync.tenantId}:${deviceId}:${operationId}`)
        .digest('hex');
      const inserted = await client.query(
        `INSERT INTO sync_client_outbox
          (trace_id,tenant_id,user_id,device_id,operation_id,channel_id,entity_type,entity_id,operation,base_version,mutation)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (tenant_id,device_id,operation_id) DO UPDATE SET operation_id=EXCLUDED.operation_id
         RETURNING trace_id,operation_id,status,server_version,conflict,created_at`,
        [
          traceId,
          req.sync.tenantId,
          req.sync.userId,
          deviceId,
          operationId,
          item.channelId,
          text(item.entityType, 'entity_type', 80),
          text(item.entityId, 'entity_id', 300),
          item.operation === 'delete' ? 'delete' : 'upsert',
          cursorNumber(item.baseVersion, 0),
          jsonObject(item.mutation),
        ],
      );
      rows.push(inserted.rows[0]);
    }
    return rows;
  });
  res.status(202).json({ data: { operations: accepted } });
});

app.get('/v1/conflicts', async (req, res) => {
  const result = await database.query(
    `SELECT operation_id,device_id,channel_id,entity_type,entity_id,base_version,
      server_version,mutation,conflict,updated_at FROM sync_client_outbox
     WHERE tenant_id=$1 AND user_id=$2 AND status='conflict'
     ORDER BY updated_at DESC LIMIT 200`,
    [req.sync.tenantId, req.sync.userId],
  );
  res.json({ data: result.rows });
});

app.use((error, _req, res, _next) => {
  const status = Number(error.status) || 500;
  res.status(status).json({ error: status === 500 ? 'internal_server_error' : error.message });
});

const connectDomainChanges = async (channel) => {
  const natsUrl = process.env[`NATS_${channel.id.toUpperCase()}_URL`];
  const messaging = await createJetStream({ channelId: channel.id, servers: natsUrl });
  const durable = `ffax-sync-${channel.id}`;
  try {
    await messaging.manager.consumers.info(messaging.streamName, durable);
  } catch {
    await messaging.manager.consumers.add(messaging.streamName, {
      durable_name: durable,
      ack_policy: AckPolicy.Explicit,
      deliver_policy: DeliverPolicy.All,
      filter_subject: `${channel.id}.changes.>`,
      max_deliver: 10,
      ack_wait: 30_000_000_000,
    });
  }
  const consumer = await messaging.jetstream.consumers.get(messaging.streamName, durable);
  const subscription = await consumer.consume();
  (async () => {
    for await (const message of subscription) {
      try {
        const change = messaging.codec.decode(message.data);
        const stored = await database.query(
          `INSERT INTO sync_change
            (trace_id,tenant_id,channel_id,source_sequence,entity_type,entity_id,operation,entity_version,payload,created_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
           ON CONFLICT (channel_id,source_sequence) DO NOTHING
           RETURNING sequence,trace_id,tenant_id,channel_id,entity_type,entity_id,operation,entity_version,created_at`,
          [
            change.trace_id || change.traceId,
            change.tenant_id,
            channel.id,
            change.sequence,
            change.entity_type,
            change.entity_id,
            change.operation,
            change.entity_version,
            change.payload,
            change.created_at,
          ],
        );
        if (stored.rows[0]) {
          await syncMessaging.publish(
            `sync.tenant.${tenantPartition(change.tenant_id)}`,
            stored.rows[0],
            { msgID: `${channel.id}:${change.sequence}` },
          );
        }
        message.ack();
      } catch (error) {
        console.error(`sync ingestion failed for ${channel.id}`, error);
        message.nak(5000);
      }
    }
  })().catch((error) => console.error(`sync subscription stopped for ${channel.id}`, error));
};

let dispatchRunning = false;
const dispatchClientOutbox = async () => {
  if (dispatchRunning) return;
  dispatchRunning = true;
  try {
    const pending = await database.query(
      `SELECT * FROM sync_client_outbox
        WHERE status IN ('pending','failed') AND available_at<=now() AND attempts<10
        ORDER BY id LIMIT 100`,
    );
    for (const item of pending.rows) {
      const baseUrl = process.env[`DOMAIN_${item.channel_id.toUpperCase()}_URL`];
      if (!baseUrl || !ingressToken) continue;
      await database.query(
        `UPDATE sync_client_outbox SET status='dispatching',attempts=attempts+1,updated_at=now()
          WHERE id=$1`,
        [item.id],
      );
      try {
        const response = await fetch(`${baseUrl.replace(/\/$/, '')}/internal/mutations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-FFAX-Ingress-Token': ingressToken,
            'X-FFAX-Trace-Id': item.trace_id,
          },
          body: JSON.stringify({
            traceId: item.trace_id,
            tenantId: item.tenant_id,
            userId: item.user_id,
            deviceId: item.device_id,
            operationId: item.operation_id,
            entityType: item.entity_type,
            entityId: item.entity_id,
            operation: item.operation,
            baseVersion: Number(item.base_version),
            mutation: item.mutation,
          }),
          signal: AbortSignal.timeout(10000),
        });
        const body = await response.json().catch(() => ({}));
        if (response.status === 409) {
          await database.query(
            `UPDATE sync_client_outbox SET status='conflict',server_version=$2,conflict=$3,updated_at=now()
              WHERE id=$1`,
            [item.id, body.serverVersion, body],
          );
        } else if (response.ok) {
          await database.query(
            `UPDATE sync_client_outbox SET status='applied',server_version=$2,conflict=NULL,updated_at=now()
              WHERE id=$1`,
            [item.id, body.data?.serverVersion ?? item.base_version],
          );
        } else {
          throw new Error(`domain_dispatch_${response.status}`);
        }
      } catch (error) {
        await database.query(
          `UPDATE sync_client_outbox SET status='failed',
            available_at=now()+make_interval(secs=>LEAST(300,POWER(2,LEAST(attempts,8))::int)),
            conflict=$2,updated_at=now() WHERE id=$1`,
          [item.id, { error: String(error.message || error) }],
        );
      }
    }
  } finally {
    dispatchRunning = false;
  }
};

const start = async () => {
  await database.initialize();
  syncMessaging = await createJetStream({
    channelId: 'sync',
    servers: process.env.NATS_SYNC_URL,
    subjects: ['sync.tenant.>', 'sync.outbox.>'],
  });
  await Promise.all(channelCatalog.map(connectDomainChanges));
  await dispatchClientOutbox();
  setInterval(
    () => dispatchClientOutbox().catch((error) => console.error('sync outbox failed', error)),
    750,
  );
  app.listen(port, () => console.log(`FFAX sync API listening on ${port}`));
};

start().catch((error) => {
  console.error('FFAX sync API startup failed', error);
  process.exitCode = 1;
});
