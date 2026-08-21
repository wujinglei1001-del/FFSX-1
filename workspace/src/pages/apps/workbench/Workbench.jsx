import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Chip, Stack, Typography } from '@mui/material';
import { VirtualLayout } from 'golden-layout';
import 'golden-layout/dist/css/goldenlayout-base.css';
import 'golden-layout/dist/css/themes/goldenlayout-light-theme.css';
import axiosInstance from 'services/axios/axiosInstance';
import PluginCenter from 'components/sections/workbench/PluginCenter';
import Notifications from 'pages/others/Notifications';

const WORKSPACE_ID = 'workbench';
const ALLOWED_PANEL_TYPES = new Set(['plugin-center', 'notifications']);

const componentConfig = (panel) => ({
  type: 'component',
  componentType: panel.type,
  componentState: panel,
  title: panel.title,
  isClosable: true,
});

const isAllowedLayoutConfig = (config) => {
  let componentCount = 0;

  const visit = (item) => {
    if (!item || typeof item !== 'object') return false;

    if (item.type === 'component') {
      componentCount += 1;
      return ALLOWED_PANEL_TYPES.has(String(item.componentType));
    }

    if (!['row', 'column', 'stack'].includes(item.type) || !Array.isArray(item.content)) {
      return false;
    }

    return item.content.every(visit);
  };

  return Boolean(config?.root && visit(config.root) && componentCount > 0);
};

const panelComponents = {
  'plugin-center': PluginCenter,
  notifications: Notifications,
};

const PanelContent = ({ descriptor, unknownPanelLabel }) => {
  const Component = panelComponents[descriptor.type];

  return (
    <Box sx={{ width: 1, height: 1, overflow: 'auto', bgcolor: 'background.paper' }}>
      {Component ? (
        <Box sx={descriptor.type === 'plugin-center' ? { p: { xs: 3, md: 5 } } : undefined}>
          <Component />
        </Box>
      ) : (
        <Alert severity="warning">{unknownPanelLabel}</Alert>
      )}
    </Box>
  );
};

const Workbench = () => {
  const { t: translateUi } = useTranslation();
  const hostRef = useRef(null);
  const layoutRef = useRef(null);
  const panelTargetsRef = useRef(new Map());
  const activeRef = useRef(false);
  const [panelTargets, setPanelTargets] = useState([]);
  const [version, setVersion] = useState(0);
  const [resolvedConfig, setResolvedConfig] = useState(null);
  const [message, setMessage] = useState(null);

  const panelCatalog = useMemo(
    () => ({
      'plugin-center': {
        type: 'plugin-center',
        title: translateUi('ffax.workbench.plugin_center'),
      },
      notifications: {
        type: 'notifications',
        title: translateUi('ffax.navigation.notifications'),
      },
    }),
    [translateUi],
  );

  const defaultConfig = useMemo(
    () => ({
      root: {
        type: 'stack',
        content: [
          componentConfig(panelCatalog['plugin-center']),
          componentConfig(panelCatalog.notifications),
        ],
      },
      settings: {
        reorderEnabled: true,
        popoutWholeStack: false,
        blockedPopoutsThrowError: false,
      },
    }),
    [panelCatalog],
  );

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
        if (error?.name !== 'CanceledError') {
          setMessage({
            severity: 'warning',
            text: translateUi('ffax.workbench.layout.load_failed'),
          });
        }
      }

      if (abortController.signal.aborted || !hostRef.current) return;

      const savedConfig = saved?.resolved_config;
      const useSavedConfig = isAllowedLayoutConfig(savedConfig);
      const layout = new VirtualLayout(hostRef.current, bindComponent, unbindComponent);
      layoutRef.current = layout;
      layout.loadLayout(useSavedConfig ? savedConfig : defaultConfig);
      setVersion(saved?.version || 0);
      setResolvedConfig(layout.saveLayout());
      layout.on('stateChanged', () => setResolvedConfig(layout.saveLayout()));

      if (savedConfig?.root && !useSavedConfig) {
        setMessage({
          severity: 'warning',
          text: translateUi('ffax.workbench.layout.legacy_removed'),
        });
      }

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
  }, [defaultConfig, panelCatalog, refreshPanelTargets, translateUi]);

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
  }, [defaultConfig]);

  const saveLayout = useCallback(async () => {
    try {
      const panels = panelTargets.map(({ descriptor }) => descriptor);
      const saved = await axiosInstance.put(`/v1/workspaces/${WORKSPACE_ID}/panel-layout`, {
        version,
        resolvedConfig,
        panels,
      });
      setVersion(saved.version);
      setMessage({
        severity: 'success',
        text: translateUi('ffax.workbench.layout.saved'),
      });
    } catch (error) {
      setMessage({
        severity: 'error',
        text:
          error?.status === 409
            ? translateUi('ffax.workbench.layout.conflict')
            : translateUi('ffax.workbench.layout.save_failed'),
      });
    }
  }, [panelTargets, resolvedConfig, translateUi, version]);

  return (
    <Box sx={{ width: 1, p: { xs: 3, md: 5 } }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">{translateUi('ffax.navigation.workbench')}</Typography>
        <Stack direction="row" spacing={1}>
          <Button color="inherit" onClick={resetLayout}>
            {translateUi('ffax.workbench.layout.reset')}
          </Button>
          <Button variant="contained" onClick={saveLayout} disabled={!resolvedConfig}>
            {translateUi('ffax.workbench.layout.save')}
          </Button>
        </Stack>
      </Stack>

      {message ? (
        <Alert severity={message.severity} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      ) : null}

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1.5 }}>
        {Object.values(panelCatalog).map((panel) => {
          const isOpen = openPanelTypes.has(panel.type);
          return (
            <Chip
              key={panel.type}
              label={
                isOpen
                  ? translateUi('ffax.workbench.layout.opened', { panel: panel.title })
                  : translateUi('ffax.workbench.layout.reopen', { panel: panel.title })
              }
              disabled={isOpen}
              onClick={() => reopenPanel(panel)}
            />
          );
        })}
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
        createPortal(
          <PanelContent
            descriptor={descriptor}
            unknownPanelLabel={translateUi('ffax.workbench.layout.unknown_panel')}
          />,
          target,
          key,
        ),
      )}
    </Box>
  );
};

export default Workbench;
