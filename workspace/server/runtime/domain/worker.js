import { AckPolicy, DeliverPolicy } from '@nats-io/jetstream';
import { SpanStatusCode, trace } from '@opentelemetry/api';
import { createDatabase } from '../shared/database.js';
import { createJetStream } from '../shared/jetstream.js';

const channelId = process.env.FFAX_CHANNEL_ID?.trim();
if (!channelId) throw new Error('FFAX_CHANNEL_ID is required');

const database = createDatabase({
  connectionString: process.env.DATABASE_URL,
  schemaUrl: new URL('./schema.sql', import.meta.url),
});
const messaging = await createJetStream({ channelId, servers: process.env.NATS_URL });
const tracer = trace.getTracer('ffax-channel-worker');
const heartbeatUrl = process.env.FFAX_CONTROL_PLANE_URL?.replace(/\/$/, '');
const heartbeatToken = process.env.FFAX_RUNTIME_HEARTBEAT_TOKEN?.trim();
const instanceId = process.env.INSTANCE_ID || `${channelId}-worker`;

const reportHeartbeat = async () => {
  if (!heartbeatUrl || !heartbeatToken) return;
  const databaseHealthy = await database.health();
  const messagingHealthy = !messaging.connection.isClosed();
  await fetch(`${heartbeatUrl}/api/internal/control-plane/channels/${channelId}/heartbeat`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-FFAX-Runtime-Token': heartbeatToken,
    },
    body: JSON.stringify({
      instanceId,
      status: databaseHealthy && messagingHealthy ? 'healthy' : 'degraded',
      detail: { database: databaseHealthy, jetstream: messagingHealthy },
    }),
    signal: AbortSignal.timeout(5000),
  });
};

let relayRunning = false;

const relayOutbox = async () => {
  if (relayRunning) return;
  relayRunning = true;
  try {
    const rows = await database.transaction(async (client) => {
      const result = await client.query(
        `SELECT id,inbox_id,subject,payload,attempts FROM channel_outbox
          WHERE published_at IS NULL AND available_at<=now()
          ORDER BY id LIMIT 100 FOR UPDATE SKIP LOCKED`,
      );
      for (const row of result.rows) {
        try {
          await messaging.publish(row.subject, row.payload, { msgID: String(row.inbox_id) });
          await client.query(
            'UPDATE channel_outbox SET published_at=now(),last_error=NULL WHERE id=$1',
            [row.id],
          );
        } catch (error) {
          await client.query(
            `UPDATE channel_outbox SET attempts=attempts+1,last_error=$2,
              available_at=now() + make_interval(secs => LEAST(300,POWER(2,LEAST(attempts,8))::int))
             WHERE id=$1`,
            [row.id, String(error.message || error).slice(0, 2000)],
          );
        }
      }
      return result.rows.length;
    });
    return rows;
  } finally {
    relayRunning = false;
  }
};

const processMessage = async (message) => {
  const envelope = messaging.codec.decode(message.data);
  const span = tracer.startSpan('ffax.channel.process', {
    attributes: {
      'ffax.channel.id': channelId,
      'ffax.trace_id': envelope.traceId || '',
      'ffax.tenant_id': envelope.tenantId || '',
      'ffax.connector_id': envelope.connectorId || '',
      'messaging.destination.name': message.subject,
    },
  });
  try {
    const change = await database.transaction(async (client) => {
      const existing = await client.query('SELECT id FROM channel_event WHERE inbox_id=$1', [
        envelope.inboxId,
      ]);
      if (existing.rows[0]) return null;

      const event = await client.query(
        `INSERT INTO channel_event
          (trace_id,inbox_id,tenant_id,connector_id,event_type,entity_type,entity_id,payload)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [
          envelope.traceId,
          envelope.inboxId,
          envelope.tenantId,
          envelope.connectorId,
          envelope.eventType,
          envelope.entityType,
          envelope.entityId,
          envelope.payload,
        ],
      );
      const version = await client.query(
        `INSERT INTO channel_entity_version (tenant_id,entity_type,entity_id,version)
         VALUES ($1,$2,$3,1)
         ON CONFLICT (tenant_id,entity_type,entity_id) DO UPDATE SET
           version=channel_entity_version.version+1,updated_at=now()
         RETURNING version`,
        [envelope.tenantId, envelope.entityType, envelope.entityId],
      );
      const inserted = await client.query(
        `INSERT INTO channel_change
          (trace_id,tenant_id,entity_type,entity_id,operation,entity_version,payload,source_event_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [
          envelope.traceId,
          envelope.tenantId,
          envelope.entityType,
          envelope.entityId,
          envelope.operation,
          version.rows[0].version,
          envelope.payload,
          event.rows[0].id,
        ],
      );
      await client.query('UPDATE channel_inbox SET processed_at=now() WHERE id=$1', [
        envelope.inboxId,
      ]);
      return inserted.rows[0];
    });

    if (change) {
      await messaging.publish(`${channelId}.changes.${change.entity_type}`, {
        channelId,
        ...change,
      });
    }
    span.setStatus({ code: SpanStatusCode.OK });
    message.ack();
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR, message: String(error.message || error) });
    const attempts = Number(message.info?.redeliveryCount || 0) + 1;
    if (attempts >= 5) {
      await database.query(
        `INSERT INTO channel_dead_letter (trace_id,tenant_id,inbox_id,subject,payload,error,attempts)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          envelope.traceId || null,
          envelope.tenantId,
          envelope.inboxId || null,
          message.subject,
          envelope,
          String(error.message || error).slice(0, 4000),
          attempts,
        ],
      );
      message.ack();
      return;
    }
    message.nak(5000 * attempts);
  } finally {
    span.end();
  }
};

const start = async () => {
  await database.initialize();
  await relayOutbox();
  await reportHeartbeat().catch((error) => console.error('worker heartbeat failed', error));
  setInterval(
    () => reportHeartbeat().catch((error) => console.error('worker heartbeat failed', error)),
    15000,
  );
  setInterval(() => relayOutbox().catch((error) => console.error('outbox relay failed', error)), 500);

  const durable = `ffax-${channelId}-worker`;
  try {
    await messaging.manager.consumers.info(messaging.streamName, durable);
  } catch {
    await messaging.manager.consumers.add(messaging.streamName, {
      durable_name: durable,
      ack_policy: AckPolicy.Explicit,
      deliver_policy: DeliverPolicy.All,
      filter_subject: `${channelId}.ingress.>`,
      max_deliver: 5,
      ack_wait: 30_000_000_000,
    });
  }
  const consumer = await messaging.jetstream.consumers.get(messaging.streamName, durable);
  const subscription = await consumer.consume();
  console.log(`FFAX ${channelId} worker subscribed`);
  for await (const message of subscription) await processMessage(message);
};

start().catch((error) => {
  console.error(`FFAX ${channelId} worker startup failed`, error);
  process.exitCode = 1;
});
