import crypto from 'node:crypto';
import express from 'express';
import { query } from '../db/index.js';
import { channelById, connectorById } from './catalog.js';

export const runtimeControlPlaneRouter = express.Router();

const heartbeatToken = process.env.FFAX_RUNTIME_HEARTBEAT_TOKEN?.trim();
const statuses = new Set(['healthy', 'degraded', 'isolated', 'offline']);

const authenticateRuntime = (req, res, next) => {
  const presented = req.headers['x-ffax-runtime-token'];
  if (!heartbeatToken || typeof presented !== 'string') {
    return res.status(401).json({ error: 'runtime_authentication_required' });
  }
  const expectedBuffer = Buffer.from(heartbeatToken);
  const presentedBuffer = Buffer.from(presented);
  if (
    expectedBuffer.length !== presentedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, presentedBuffer)
  ) {
    return res.status(401).json({ error: 'invalid_runtime_token' });
  }
  return next();
};

runtimeControlPlaneRouter.put(
  '/channels/:id/heartbeat',
  authenticateRuntime,
  async (req, res) => {
    if (!channelById.has(req.params.id)) {
      return res.status(404).json({ error: 'channel_not_found' });
    }
    const instanceId = String(req.body.instanceId || '').trim().slice(0, 200);
    const status = String(req.body.status || 'healthy').trim();
    if (!instanceId) return res.status(400).json({ error: 'instance_id_required' });
    if (!statuses.has(status)) return res.status(400).json({ error: 'invalid_channel_status' });
    const result = await query(
      `INSERT INTO ffax_channel_instance (channel_id,instance_id,status,detail,heartbeat_at)
       VALUES ($1,$2,$3,$4,now())
       ON CONFLICT (channel_id,instance_id) DO UPDATE SET status=EXCLUDED.status,
         detail=EXCLUDED.detail,heartbeat_at=now() RETURNING *`,
      [req.params.id, instanceId, status, req.body.detail || {}],
    );
    res.json({ data: result.rows[0] });
  },
);

runtimeControlPlaneRouter.get(
  '/runtime/connectors/:channelId/:tenantId/:connectorId',
  authenticateRuntime,
  async (req, res) => {
    const connector = connectorById.get(req.params.connectorId);
    if (!connector || connector.channelId !== req.params.channelId) {
      return res.status(404).json({ error: 'connector_not_found_for_channel' });
    }
    const result = await query(
      `SELECT connector_id,channel_id,enabled,status,settings,credential_ref,config_version,updated_at
         FROM ffax_tenant_connector
        WHERE tenant_id=$1 AND connector_id=$2 AND channel_id=$3`,
      [req.params.tenantId, connector.id, connector.channelId],
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'connector_not_configured' });
    res.json({ data: result.rows[0] });
  },
);
