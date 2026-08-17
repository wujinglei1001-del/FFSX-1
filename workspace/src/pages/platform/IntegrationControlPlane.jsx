import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import axiosInstance from 'services/axios/axiosInstance';
import IconifyIcon from 'components/base/IconifyIcon';

const statusColor = {
  healthy: 'success',
  configured: 'success',
  degraded: 'warning',
  failed: 'error',
  offline: 'error',
  isolated: 'warning',
  disabled: 'default',
  available: 'default',
  not_reported: 'default',
};

const statusLabel = {
  healthy: '运行正常',
  configured: '已启用',
  degraded: '性能下降',
  failed: '故障',
  offline: '离线',
  isolated: '已隔离',
  disabled: '已停用',
  available: '待配置',
  not_reported: '等待运行实例',
};

const IntegrationControlPlane = () => {
  const [topology, setTopology] = useState(null);
  const [connectors, setConnectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [credentialRef, setCredentialRef] = useState('');
  const [settingsText, setSettingsText] = useState('{}');
  const [credentialText, setCredentialText] = useState('');
  const [saving, setSaving] = useState(false);
  const [traceQuery, setTraceQuery] = useState('');
  const [traceResult, setTraceResult] = useState(null);
  const [tracing, setTracing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [topologyResult, connectorResult] = await Promise.all([
        axiosInstance.get('/v1/control-plane/topology'),
        axiosInstance.get('/v1/control-plane/connectors'),
      ]);
      setTopology(topologyResult);
      setConnectors(connectorResult);
    } catch (requestError) {
      setError(requestError?.data?.error || '无法读取通道状态');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const connectorsByChannel = useMemo(() => {
    const grouped = new Map();
    connectors.forEach((connector) => {
      const current = grouped.get(connector.channelId) || [];
      current.push(connector);
      grouped.set(connector.channelId, current);
    });
    return grouped;
  }, [connectors]);

  const openEditor = (connector) => {
    setEditing(connector);
    setEnabled(Boolean(connector.enabled));
    setCredentialRef('');
    setCredentialText('');
    setSettingsText(JSON.stringify(connector.settings || {}, null, 2));
    setError('');
  };

  const saveConnector = async () => {
    setSaving(true);
    setError('');
    try {
      const settings = JSON.parse(settingsText || '{}');
      let configVersion = editing.configVersion;
      if (credentialText.trim()) {
        const secretResult = await axiosInstance.put(
          `/v1/control-plane/connectors/${editing.id}/credential`,
          { version: configVersion, credential: JSON.parse(credentialText) },
        );
        configVersion = secretResult.config_version ?? secretResult.configVersion;
      }
      await axiosInstance.put(`/v1/control-plane/connectors/${editing.id}`, {
        version: configVersion,
        enabled,
        settings,
        credentialRef: credentialRef.trim() || null,
      });
      setEditing(null);
      await load();
    } catch (requestError) {
      setError(
        requestError instanceof SyntaxError
          ? '设置必须是有效的 JSON'
          : requestError?.data?.error || '保存连接器失败',
      );
    } finally {
      setSaving(false);
    }
  };

  const findTrace = async () => {
    const value = traceQuery.trim();
    if (!value) return;
    setTracing(true);
    setError('');
    try {
      setTraceResult(
        await axiosInstance.get(`/v1/control-plane/traces/${encodeURIComponent(value)}`),
      );
    } catch (requestError) {
      setError(requestError?.data?.error || '无法读取追踪记录');
    } finally {
      setTracing(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1500, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h4">连接器与独立业务通道</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            控制平面只管理租户、权限、连接配置和密钥引用，不承载订单、轨迹或库存数据。
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<IconifyIcon icon="material-symbols:refresh-rounded" />}
          onClick={load}
          disabled={loading}
          sx={{ alignSelf: { sm: 'flex-start' } }}
        >
          刷新状态
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Paper variant="outlined" sx={{ p: 2, mt: 2, borderRadius: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
          <TextField
            size="small"
            label="故障 traceId"
            value={traceQuery}
            onChange={(event) => setTraceQuery(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && findTrace()}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={findTrace} disabled={tracing || !traceQuery.trim()}>
            {tracing ? '追踪中…' : '定位节点'}
          </Button>
        </Stack>
        {traceResult && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' },
              gap: 1,
              mt: 2,
            }}
          >
            {(traceResult.channels || []).map((channel) => {
              const failed = channel.status === 'unreachable' || channel.deadLetters?.length;
              const count =
                (channel.inbox?.length || 0) +
                (channel.events?.length || 0) +
                (channel.changes?.length || 0);
              return (
                <Box
                  key={channel.channelId}
                  sx={{ p: 1.5, borderRadius: 1, bgcolor: 'background.elevation1' }}
                >
                  <Stack direction="row" justifyContent="space-between" spacing={1}>
                    <Typography variant="body2" fontWeight={700}>
                      {channel.channelId}
                    </Typography>
                    <Chip
                      size="small"
                      color={failed ? 'error' : count ? 'success' : 'default'}
                      label={failed ? '异常' : count ? `${count} 个节点` : '未经过'}
                    />
                  </Stack>
                  {channel.deadLetters?.[0] && (
                    <Typography
                      variant="caption"
                      color="error.main"
                      sx={{ display: 'block', mt: 1 }}
                    >
                      {channel.deadLetters[0].error}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </Paper>
      {loading && !topology ? (
        <Stack alignItems="center" sx={{ py: 12 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', xl: 'repeat(2, minmax(0, 1fr))' },
            gap: 2,
            mt: 3,
          }}
        >
          {(topology?.channels || []).map((channel) => (
            <Paper key={channel.id} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="h6">{channel.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {channel.description}
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  color={statusColor[channel.status] || 'default'}
                  label={statusLabel[channel.status] || channel.status}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 2 }}>
                {[
                  ['网关', channel.gateway],
                  ['队列', channel.queue],
                  ['数据库', channel.database],
                ].map(([label, value]) => (
                  <Box
                    key={label}
                    sx={{ flex: 1, bgcolor: 'background.elevation1', p: 1.25, borderRadius: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                {(channel.instances || []).map((instance) => (
                  <Chip
                    key={instance.instanceId}
                    size="small"
                    variant="outlined"
                    color={statusColor[instance.status] || 'default'}
                    label={`${instance.instanceId} · ${statusLabel[instance.status] || instance.status}`}
                  />
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                {(connectorsByChannel.get(channel.id) || []).map((connector) => (
                  <Stack
                    key={connector.id}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={700}>
                        {connector.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {connector.authType} ·{' '}
                        {connector.credentialConfigured ? '密钥已托管' : '未设置密钥'}
                      </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip
                        size="small"
                        color={statusColor[connector.status] || 'default'}
                        label={statusLabel[connector.status] || connector.status}
                      />
                      <Button size="small" onClick={() => openEditor(connector)}>
                        配置
                      </Button>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          ))}
        </Box>
      )}

      <Alert severity="info" variant="outlined" sx={{ mt: 2 }}>
        设备同步使用独立数据库、按租户分区的 JetStream 队列，以及 cursor、version、ACK 和设备 outbox
        协议。
      </Alert>

      <Dialog open={Boolean(editing)} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle>{editing?.name || '连接器配置'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <FormControlLabel
              control={
                <Switch checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
              }
              label="在当前企业租户启用"
            />
            <TextField
              label="敏感凭据 JSON（一次性提交）"
              type="password"
              value={credentialText}
              onChange={(event) => setCredentialText(event.target.value)}
              placeholder='{"clientId":"…","clientSecret":"…"}'
              helperText="提交后直接写入 OpenBao；页面、数据库和日志不保存明文。"
              fullWidth
            />
            <TextField
              label="OpenBao 密钥引用"
              value={credentialRef}
              onChange={(event) => setCredentialRef(event.target.value)}
              placeholder={`${editing?.credentialReferencePrefix || 'openbao://secret/tenants/.../connectors/...'}credentials`}
              helperText={
                editing?.credentialConfigured
                  ? '已托管密钥；留空将保留原引用。'
                  : '这里只保存引用，不保存明文密钥。'
              }
              fullWidth
            />
            <TextField
              label="非敏感设置（JSON）"
              value={settingsText}
              onChange={(event) => setSettingsText(event.target.value)}
              multiline
              minRows={6}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>取消</Button>
          <Button variant="contained" onClick={saveConnector} disabled={saving}>
            {saving ? '保存中…' : '保存配置'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IntegrationControlPlane;
