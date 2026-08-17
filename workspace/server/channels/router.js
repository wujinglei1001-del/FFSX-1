import express from 'express';
import { query, withTransaction } from '../db/index.js';
import { audit, requireAnyRole } from '../platform/context.js';
import { writeConnectorCredential } from '../runtime/shared/openbao.js';
import {
  channelCatalog,
  channelById,
  connectorById,
  publicChannelCatalog,
  publicConnectorCatalog,
} from './catalog.js';

export const controlPlaneRouter = express.Router();

const jsonObject = (value) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : {};

const heartbeatTimeoutMs = Number(process.env.FFAX_CHANNEL_HEARTBEAT_TIMEOUT_MS || 45000);

const instanceRuntimeStatus = (runtime) => {
  if (!runtime?.heartbeat_at) return 'not_reported';
  const ageMs = Date.now() - new Date(runtime.heartbeat_at).getTime();
  if (!Number.isFinite(ageMs) || ageMs > heartbeatTimeoutMs) return 'offline';
  return runtime.status || 'healthy';
};

const runtimeStatus = (runtimes) => {
  if (!runtimes?.length) return 'not_reported';
  const statuses = runtimes.map(instanceRuntimeStatus);
  if (statuses.includes('offline')) return 'offline';
  if (statuses.some((status) => status !== 'healthy')) return 'degraded';
  if (!runtimes.some((runtime) => runtime.instance_id.endsWith('-api'))) return 'degraded';
  if (!runtimes.some((runtime) => runtime.instance_id.endsWith('-worker'))) return 'degraded';
  return 'healthy';
};

const optionalText = (value, max = 500) => {
  if (value == null || value === '') return null;
  if (typeof value !== 'string' || value.trim().length > max) {
    const error = new Error('invalid_text');
    error.status = 400;
    throw error;
  }
  return value.trim();
};

const assertCredentialReference = (value, tenantId, channelId) => {
  const credentialRef = optionalText(value, 600);
  const requiredPrefix = `openbao://secret/tenants/${tenantId}/connectors/${channelId}/`;
  if (credentialRef && !credentialRef.startsWith(requiredPrefix)) {
    const error = new Error('credential_reference_must_use_openbao');
    error.status = 400;
    throw error;
  }
  return credentialRef;
};

controlPlaneRouter.get('/v1/control-plane/topology', async (req, res) => {
  const [connectorState, channelState] = await Promise.all([
    query(
      `SELECT connector_id, enabled, status, config_version, updated_at
         FROM ffax_tenant_connector WHERE tenant_id=$1`,
      [req.platform.tenantId],
    ),
    query(
      `SELECT DISTINCT ON (channel_id,instance_id)
              channel_id,instance_id,status,detail,heartbeat_at
         FROM ffax_channel_instance ORDER BY channel_id,instance_id,heartbeat_at DESC`,
    ),
  ]);

  const connectorStates = new Map(connectorState.rows.map((row) => [row.connector_id, row]));
  const channelStates = new Map();
  channelState.rows.forEach((row) => {
    const values = channelStates.get(row.channel_id) || [];
    values.push(row);
    channelStates.set(row.channel_id, values);
  });
  const connectors = publicConnectorCatalog().map((connector) => ({
    ...connector,
    enabled: connectorStates.get(connector.id)?.enabled || false,
    status: connectorStates.get(connector.id)?.status || 'available',
    configVersion: connectorStates.get(connector.id)?.config_version || 0,
    updatedAt: connectorStates.get(connector.id)?.updated_at || null,
  }));

  const channels = publicChannelCatalog().map((channel) => {
    const runtimes = channelStates.get(channel.id) || [];
    const latestHeartbeat = runtimes
      .map((runtime) => runtime.heartbeat_at)
      .filter(Boolean)
      .sort()
      .at(-1);
    return {
      ...channel,
      status: runtimeStatus(runtimes),
      instances: runtimes.map((runtime) => ({
        instanceId: runtime.instance_id,
        status: instanceRuntimeStatus(runtime),
        detail: runtime.detail || {},
        heartbeatAt: runtime.heartbeat_at,
      })),
      heartbeatAt: latestHeartbeat || null,
      connectorCount: connectors.filter((connector) => connector.channelId === channel.id).length,
      enabledConnectorCount: connectors.filter(
        (connector) => connector.channelId === channel.id && connector.enabled,
      ).length,
    };
  });

  res.json({
    data: {
      controlPlane: {
        routesBusinessData: false,
        responsibilities: ['tenant', 'authorization', 'connector-config', 'credential-reference'],
      },
      channels,
      connectors,
      sync: {
        isolated: true,
        protocol: ['cursor', 'version', 'ack', 'device-outbox'],
      },
    },
  });
});

controlPlaneRouter.get('/v1/control-plane/connectors', async (req, res) => {
  const state = await query(
    `SELECT connector_id, enabled, status, settings, credential_ref, config_version, updated_at
       FROM ffax_tenant_connector WHERE tenant_id=$1`,
    [req.platform.tenantId],
  );
  const byId = new Map(state.rows.map((row) => [row.connector_id, row]));
  res.json({
    data: publicConnectorCatalog().map((connector) => ({
      ...connector,
      enabled: byId.get(connector.id)?.enabled || false,
      status: byId.get(connector.id)?.status || 'available',
      settings: byId.get(connector.id)?.settings || {},
      credentialConfigured: Boolean(byId.get(connector.id)?.credential_ref),
      credentialReferencePrefix: `openbao://secret/tenants/${req.platform.tenantId}/connectors/${connector.channelId}/`,
      configVersion: byId.get(connector.id)?.config_version || 0,
      updatedAt: byId.get(connector.id)?.updated_at || null,
    })),
  });
});

controlPlaneRouter.put(
  '/v1/control-plane/connectors/:id/credential',
  requireAnyRole('tenant-admin', 'platform-admin'),
  async (req, res) => {
    const definition = connectorById.get(req.params.id);
    if (!definition) return res.status(404).json({ error: 'connector_not_found' });
    const credential = jsonObject(req.body.credential);
    const entries = Object.entries(credential);
    if (
      entries.length === 0 ||
      entries.length > 30 ||
      entries.some(
        ([key, value]) =>
          !/^[A-Za-z][A-Za-z0-9_.-]{0,79}$/.test(key) ||
          typeof value !== 'string' ||
          value.length === 0 ||
          value.length > 10000,
      ) ||
      JSON.stringify(credential).length > 20000
    ) {
      return res.status(400).json({ error: 'invalid_connector_credential' });
    }
    const reference = `openbao://secret/tenants/${req.platform.tenantId}/connectors/${definition.channelId}/${definition.id.replaceAll('.', '-')}`;
    const result = await withTransaction(async (client) => {
      await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
        `${req.platform.tenantId}:${definition.id}`,
      ]);
      const current = await client.query(
        'SELECT config_version FROM ffax_tenant_connector WHERE tenant_id=$1 AND connector_id=$2',
        [req.platform.tenantId, definition.id],
      );
      const expectedVersion = Number(req.body.version || 0);
      const actualVersion = current.rows[0]?.config_version || 0;
      if (actualVersion !== expectedVersion) {
        const error = new Error('connector_config_version_conflict');
        error.status = 409;
        throw error;
      }
      const secretResult = await writeConnectorCredential({
        reference,
        channelId: definition.channelId,
        tenantId: req.platform.tenantId,
        credential,
      });
      const updated = await client.query(
        `INSERT INTO ffax_tenant_connector
          (tenant_id,connector_id,channel_id,enabled,status,settings,credential_ref,config_version,updated_by)
         VALUES ($1,$2,$3,false,'available','{}',$4,1,$5)
         ON CONFLICT (tenant_id,connector_id) DO UPDATE SET
           credential_ref=EXCLUDED.credential_ref,
           config_version=ffax_tenant_connector.config_version+1,
           updated_by=EXCLUDED.updated_by,
           updated_at=now()
         RETURNING connector_id,channel_id,enabled,status,settings,
           true AS credential_configured,config_version,updated_at`,
        [req.platform.tenantId, definition.id, definition.channelId, reference, req.platform.userId],
      );
      await audit(client, req, 'connector.credential.write', 'connector', definition.id, {
        channelId: definition.channelId,
        secretVersion: secretResult.version,
      });
      return updated.rows[0];
    });
    res.json({ data: result });
  },
);

controlPlaneRouter.get(
  '/v1/control-plane/traces/:traceId',
  requireAnyRole('platform-admin', 'tenant-admin'),
  async (req, res) => {
    const traceId = optionalText(req.params.traceId, 128);
    const runtimeToken = process.env.FFAX_RUNTIME_HEARTBEAT_TOKEN?.trim();
    if (!runtimeToken) return res.status(503).json({ error: 'runtime_diagnostics_not_configured' });
    const results = await Promise.all(
      channelCatalog.map(async (channel) => {
        try {
          const response = await fetch(
            `${channel.runtimeUrl}/internal/diagnostics/traces/${encodeURIComponent(traceId)}`,
            {
              headers: {
                'X-FFAX-Runtime-Token': runtimeToken,
                'X-FFAX-Tenant-Id': req.platform.tenantId,
              },
              signal: AbortSignal.timeout(5000),
            },
          );
          if (!response.ok) throw new Error(`runtime_status_${response.status}`);
          return { channelId: channel.id, status: 'reachable', ...(await response.json()).data };
        } catch (error) {
          return { channelId: channel.id, status: 'unreachable', error: String(error.message || error) };
        }
      }),
    );
    res.json({ data: { traceId, channels: results } });
  },
);

controlPlaneRouter.put(
  '/v1/control-plane/connectors/:id',
  requireAnyRole('tenant-admin', 'platform-admin'),
  async (req, res) => {
    const definition = connectorById.get(req.params.id);
    if (!definition) return res.status(404).json({ error: 'connector_not_found' });

    const result = await withTransaction(async (client) => {
      const current = await client.query(
        'SELECT config_version FROM ffax_tenant_connector WHERE tenant_id=$1 AND connector_id=$2',
        [req.platform.tenantId, definition.id],
      );
      const expectedVersion = Number(req.body.version || 0);
      const actualVersion = current.rows[0]?.config_version || 0;
      if (actualVersion !== expectedVersion) {
        const error = new Error('connector_config_version_conflict');
        error.status = 409;
        throw error;
      }

      const updated = await client.query(
        `INSERT INTO ffax_tenant_connector
          (tenant_id, connector_id, channel_id, enabled, status, settings, credential_ref, config_version, updated_by)
         VALUES ($1,$2,$3,$4,$5,$6,$7,1,$8)
         ON CONFLICT (tenant_id,connector_id) DO UPDATE SET
           enabled=EXCLUDED.enabled,
           status=EXCLUDED.status,
           settings=EXCLUDED.settings,
           credential_ref=COALESCE(EXCLUDED.credential_ref,ffax_tenant_connector.credential_ref),
           config_version=ffax_tenant_connector.config_version+1,
           updated_by=EXCLUDED.updated_by,
           updated_at=now()
         RETURNING connector_id, channel_id, enabled, status, settings,
           (credential_ref IS NOT NULL) AS credential_configured, config_version, updated_at`,
        [
          req.platform.tenantId,
          definition.id,
          definition.channelId,
          Boolean(req.body.enabled),
          req.body.enabled ? 'configured' : 'disabled',
          jsonObject(req.body.settings),
          assertCredentialReference(
            req.body.credentialRef,
            req.platform.tenantId,
            definition.channelId,
          ),
          req.platform.userId,
        ],
      );
      await audit(client, req, 'connector.configure', 'connector', definition.id, {
        channelId: definition.channelId,
        enabled: Boolean(req.body.enabled),
      });
      return updated.rows[0];
    });

    res.json({ data: result });
  },
);

controlPlaneRouter.put(
  '/v1/control-plane/channels/:id/heartbeat',
  requireAnyRole('platform-admin'),
  async (req, res) => {
    if (!channelById.has(req.params.id))
      return res.status(404).json({ error: 'channel_not_found' });
    const instanceId = optionalText(req.body.instanceId, 200);
    if (!instanceId) return res.status(400).json({ error: 'instance_id_required' });
    const status = optionalText(req.body.status, 30) || 'healthy';
    const result = await query(
      `INSERT INTO ffax_channel_instance (channel_id,instance_id,status,detail,heartbeat_at)
       VALUES ($1,$2,$3,$4,now())
       ON CONFLICT (channel_id,instance_id) DO UPDATE SET status=EXCLUDED.status,
         detail=EXCLUDED.detail, heartbeat_at=now() RETURNING *`,
      [req.params.id, instanceId, status, jsonObject(req.body.detail)],
    );
    res.json({ data: result.rows[0] });
  },
);
