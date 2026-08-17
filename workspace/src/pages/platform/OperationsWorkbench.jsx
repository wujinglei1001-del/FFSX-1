import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Alert, Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { VirtualLayout } from 'golden-layout';
import 'golden-layout/dist/css/goldenlayout-base.css';
import 'golden-layout/dist/css/themes/goldenlayout-light-theme.css';
import axiosInstance from 'services/axios/axiosInstance';

const WORKSPACE_ID = 'operations';

const panelCatalog = {
  orders: { type: 'orders', title: '订单与履约', requiredRole: 'customer' },
  tracking: { type: 'tracking', title: '物流追踪', requiredRole: 'customer' },
  conversation: { type: 'conversation', title: '贸易会话', requiredRole: 'customer' },
  documents: { type: 'documents', title: '文件与合规', requiredRole: 'customer' },
};

const componentConfig = (panel) => ({
  type: 'component',
  componentType: panel.type,
  componentState: panel,
  title: panel.title,
  isClosable: true,
});

const defaultConfig = {
  root: {
    type: 'row',
    content: [
      {
        type: 'stack',
        width: 55,
        content: [componentConfig(panelCatalog.orders), componentConfig(panelCatalog.documents)],
      },
      {
        type: 'column',
        width: 45,
        content: [
          { type: 'stack', height: 55, content: [componentConfig(panelCatalog.tracking)] },
          { type: 'stack', height: 45, content: [componentConfig(panelCatalog.conversation)] },
        ],
      },
    ],
  },
  settings: { reorderEnabled: true, popoutWholeStack: false, blockedPopoutsThrowError: false },
};

const OrdersPanel = () => (
  <Stack spacing={1.25} sx={{ p: 2 }}>
    {[
      ['FFX-260816-001', '等待供应商确认', '美国西部仓'],
      ['FFX-260816-002', '国际运输中', '深圳 → 洛杉矶'],
      ['FFX-260816-003', '等待清关文件', '鹿特丹口岸'],
    ].map(([id, status, route]) => (
      <Paper key={id} variant="outlined" sx={{ p: 1.5 }}>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Typography fontWeight={700}>{id}</Typography>
          <Chip size="small" label={status} />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          {route}
        </Typography>
      </Paper>
    ))}
  </Stack>
);

const TrackingPanel = () => (
  <Box sx={{ p: 2, height: 1 }}>
    <Typography fontWeight={700}>跨境履约线路</Typography>
    <Box
      component="svg"
      viewBox="0 0 520 210"
      role="img"
      aria-label="物流路线示意"
      sx={{ width: 1, mt: 1 }}
    >
      <path
        d="M28 158 C130 30 205 190 310 72 S455 42 492 118"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.35"
      />
      {[
        [28, 158],
        [174, 116],
        [310, 72],
        [492, 118],
      ].map(([cx, cy], index) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 2 ? 9 : 6} fill="currentColor" />
      ))}
    </Box>
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="caption">起运仓</Typography>
      <Typography variant="caption">目的仓</Typography>
    </Stack>
  </Box>
);

const ConversationPanel = () => (
  <Stack spacing={1.25} sx={{ p: 2 }}>
    <Paper variant="outlined" sx={{ p: 1.25, alignSelf: 'flex-start', maxWidth: '80%' }}>
      <Typography variant="body2">报价已更新，含目的港清关服务。</Typography>
    </Paper>
    <Paper
      sx={{
        p: 1.25,
        alignSelf: 'flex-end',
        maxWidth: '80%',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Typography variant="body2">请补充预计到仓时间和保险条款。</Typography>
    </Paper>
    <Typography variant="caption" color="text.secondary">
      会话事件由租户 Redis 频道实时同步。
    </Typography>
  </Stack>
);

const DocumentsPanel = () => (
  <Stack spacing={1} sx={{ p: 2 }}>
    {['商业发票.pdf', '装箱单.xlsx', '原产地证明.pdf'].map((name, index) => (
      <Stack key={name} direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">{name}</Typography>
        <Chip
          size="small"
          color={index === 2 ? 'warning' : 'success'}
          label={index === 2 ? '待审核' : '已验证'}
        />
      </Stack>
    ))}
  </Stack>
);

const panelComponents = {
  orders: OrdersPanel,
  tracking: TrackingPanel,
  conversation: ConversationPanel,
  documents: DocumentsPanel,
};

const UnknownPanel = () => <Alert severity="warning">未知面板</Alert>;

const PanelContent = ({ descriptor }) => {
  const Component = panelComponents[descriptor.type] || UnknownPanel;
  return (
    <Box sx={{ width: 1, height: 1, overflow: 'auto', bgcolor: 'background.paper' }}>
      <Component />
    </Box>
  );
};

const OperationsWorkbench = () => {
  const hostRef = useRef(null);
  const layoutRef = useRef(null);
  const panelTargetsRef = useRef(new Map());
  const activeRef = useRef(false);
  const [panelTargets, setPanelTargets] = useState([]);
  const [version, setVersion] = useState(0);
  const [resolvedConfig, setResolvedConfig] = useState(null);
  const [message, setMessage] = useState(null);

  const refreshPanelTargets = useCallback(() => {
    if (activeRef.current) setPanelTargets([...panelTargetsRef.current.values()]);
  }, []);

  useEffect(() => {
    if (!hostRef.current) return undefined;
    activeRef.current = true;
    const abortController = new AbortController();
    let resizeObserver;

    const bindComponent = (container, itemConfig) => {
      const target = document.createElement('div');
      target.className = 'ffax-golden-panel';
      Object.assign(target.style, { position: 'absolute', overflow: 'hidden' });
      hostRef.current.appendChild(target);
      const descriptor = {
        ...(panelCatalog[String(itemConfig.componentType)] || {}),
        ...(itemConfig.componentState && typeof itemConfig.componentState === 'object'
          ? itemConfig.componentState
          : {}),
        type: String(itemConfig.componentType),
        title: itemConfig.title,
      };
      const key = `${descriptor.type}:${crypto.randomUUID()}`;
      panelTargetsRef.current.set(container, { key, target, descriptor });

      container.stateRequestEvent = () => descriptor;
      container.virtualRectingRequiredEvent = (componentContainer, panelWidth, panelHeight) => {
        const hostRect = hostRef.current.getBoundingClientRect();
        const panelRect = componentContainer.element.getBoundingClientRect();
        Object.assign(target.style, {
          left: `${panelRect.left - hostRect.left}px`,
          top: `${panelRect.top - hostRect.top}px`,
          width: `${panelWidth}px`,
          height: `${panelHeight}px`,
        });
      };
      container.virtualVisibilityChangeRequiredEvent = (_componentContainer, visible) => {
        target.style.display = visible ? '' : 'none';
      };
      container.virtualZIndexChangeRequiredEvent = (
        _componentContainer,
        _logicalZIndex,
        defaultZIndex,
      ) => {
        target.style.zIndex = defaultZIndex;
      };
      refreshPanelTargets();
      return { component: { key, descriptor }, virtual: true };
    };

    const unbindComponent = (container) => {
      const panel = panelTargetsRef.current.get(container);
      container.stateRequestEvent = undefined;
      container.virtualRectingRequiredEvent = undefined;
      container.virtualVisibilityChangeRequiredEvent = undefined;
      container.virtualZIndexChangeRequiredEvent = undefined;
      panel?.target.remove();
      panelTargetsRef.current.delete(container);
      refreshPanelTargets();
    };

    const initialize = async () => {
      let saved;
      try {
        saved = await axiosInstance.get(`/v1/workspaces/${WORKSPACE_ID}/panel-layout`, {
          signal: abortController.signal,
        });
      } catch (error) {
        if (error?.name !== 'CanceledError')
          setMessage({ severity: 'warning', text: '未能读取已保存布局，已使用默认布局。' });
      }
      if (abortController.signal.aborted || !hostRef.current) return;

      const layout = new VirtualLayout(hostRef.current, bindComponent, unbindComponent);
      layoutRef.current = layout;
      layout.loadLayout(
        saved?.resolved_config && saved.resolved_config.root
          ? saved.resolved_config
          : defaultConfig,
      );
      setVersion(saved?.version || 0);
      setResolvedConfig(layout.saveLayout());
      layout.on('stateChanged', () => setResolvedConfig(layout.saveLayout()));
      resizeObserver = new ResizeObserver(([entry]) =>
        layout.setSize(entry.contentRect.width, entry.contentRect.height),
      );
      resizeObserver.observe(hostRef.current);
    };

    initialize();
    return () => {
      activeRef.current = false;
      abortController.abort();
      resizeObserver?.disconnect();
      layoutRef.current?.destroy();
      layoutRef.current = null;
      panelTargetsRef.current.forEach(({ target }) => target.remove());
      panelTargetsRef.current.clear();
    };
  }, [refreshPanelTargets]);

  const openPanelTypes = useMemo(
    () => new Set(panelTargets.map(({ descriptor }) => descriptor.type)),
    [panelTargets],
  );

  const reopenPanel = useCallback(
    (panel) => {
      if (openPanelTypes.has(panel.type)) return;
      layoutRef.current?.addComponent(panel.type, panel, panel.title);
    },
    [openPanelTypes],
  );

  const resetLayout = useCallback(() => {
    layoutRef.current?.loadLayout(defaultConfig);
    setResolvedConfig(layoutRef.current?.saveLayout() || defaultConfig);
  }, []);

  const saveLayout = useCallback(async () => {
    try {
      const panels = panelTargets.map(({ descriptor }) => descriptor);
      const saved = await axiosInstance.put(`/v1/workspaces/${WORKSPACE_ID}/panel-layout`, {
        version,
        resolvedConfig,
        panels,
      });
      setVersion(saved.version);
      setMessage({ severity: 'success', text: '专业工作台布局已保存。' });
    } catch (error) {
      setMessage({
        severity: 'error',
        text: error?.status === 409 ? '布局已在其他设备更新，请刷新后重试。' : '布局保存失败。',
      });
    }
  }, [panelTargets, resolvedConfig, version]);

  return (
    <Box sx={{ width: 1 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h4">专业分屏工作台</Typography>
          <Typography color="text.secondary">
            拖动标签或分隔条，支持左右、上下分屏与最大化。
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button color="inherit" onClick={resetLayout}>
            恢复默认
          </Button>
          <Button variant="contained" onClick={saveLayout}>
            保存布局
          </Button>
        </Stack>
      </Stack>
      {message ? (
        <Alert severity={message.severity} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      ) : null}
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1.5 }}>
        {Object.values(panelCatalog).map((panel) => (
          <Chip
            key={panel.type}
            label={
              openPanelTypes.has(panel.type) ? `${panel.title} · 已打开` : `重新打开 ${panel.title}`
            }
            disabled={openPanelTypes.has(panel.type)}
            onClick={() => reopenPanel(panel)}
          />
        ))}
      </Stack>
      <Box
        ref={hostRef}
        className="ffax-golden-host"
        sx={{
          position: 'relative',
          height: { xs: 620, md: 'calc(100vh - 230px)' },
          minHeight: 560,
          overflow: 'hidden',
          borderRadius: 1,
        }}
      />
      {panelTargets.map(({ key, target, descriptor }) =>
        createPortal(<PanelContent descriptor={descriptor} />, target, key),
      )}
    </Box>
  );
};

export default OperationsWorkbench;
