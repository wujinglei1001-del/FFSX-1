const controlPlaneUrl = process.env.FFAX_CONTROL_PLANE_URL?.replace(/\/$/, '');
const runtimeToken = process.env.FFAX_RUNTIME_HEARTBEAT_TOKEN?.trim();

export const getConnectorRuntimeConfig = async ({ channelId, tenantId, connectorId }) => {
  if (!controlPlaneUrl || !runtimeToken) {
    throw new Error('control_plane_runtime_access_not_configured');
  }
  const path = [channelId, tenantId, connectorId].map(encodeURIComponent).join('/');
  const response = await fetch(
    `${controlPlaneUrl}/api/internal/control-plane/runtime/connectors/${path}`,
    {
      headers: { 'X-FFAX-Runtime-Token': runtimeToken },
      signal: AbortSignal.timeout(5000),
    },
  );
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`control_plane_connector_config_failed:${response.status}:${body.slice(0, 200)}`);
  }
  return (await response.json()).data;
};

