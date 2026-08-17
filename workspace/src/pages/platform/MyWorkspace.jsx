import { useCallback, useEffect, useMemo, useState } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { useNavigate } from 'react-router';
import { Alert, Box, Button, Chip, Drawer, Paper, Stack, Typography } from '@mui/material';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import paths from 'routes/paths';
import axiosInstance from 'services/axios/axiosInstance';

const WORKSPACE_ID = 'default';
const BREAKPOINTS = { desktop: 1200, tablet: 768, mobile: 0 };
const COLS = { desktop: 12, tablet: 8, mobile: 1 };
const sortedBreakpoints = ['mobile', 'tablet', 'desktop'];

const widgetCatalog = [
  {
    id: 'trade-demand',
    title: '需求社区',
    value: '发布、报价与议价',
    description: '管理企业需求、收藏、会话和成交评价。',
    path: paths.community,
  },
  {
    id: 'order-fulfillment',
    title: '订单与履约',
    value: '订单进度与交付',
    description: '集中处理订单、退款、交付和结算状态。',
    path: paths.ecommerce,
  },
  {
    id: 'logistics',
    title: '物流追踪',
    value: '实时节点',
    description: '汇总承运商、海外仓和异常预警。',
    path: paths.operationsWorkbench,
  },
  {
    id: 'plugin-center',
    title: '插件中心',
    value: '购买、安装与授权',
    description: '管理本企业已购买、安装和启用的插件。',
    path: paths.plugins,
  },
  {
    id: 'marketplace',
    title: '需求市场',
    value: '采购、服务与供应商需求',
    description: '在跨境电商商店入口浏览真实需求、供应能力和企业报价。',
    path: paths.marketplace,
  },
  {
    id: 'projects',
    title: '企业协作',
    value: '项目、任务与文件',
    description: '将贸易合作拆分为可跟踪的项目和任务。',
    path: paths.project,
  },
  {
    id: 'customer-management',
    title: '客户与供应商',
    value: '准入、关系与跟进',
    description: '统一管理客户、供应商和企业协作关系。',
    path: paths.crm,
  },
  {
    id: 'analytics',
    title: '数据看板',
    value: '交易、履约与风险',
    description: '查看企业经营、订单履约和协作效率。',
    path: paths.analytics,
  },
];

const defaultWidgetIds = widgetCatalog.slice(0, 6).map(({ id }) => id);

const defaultLayouts = {
  desktop: widgetCatalog.map((widget, index) => ({
    i: widget.id,
    x: (index % 2) * 6,
    y: Math.floor(index / 2) * 3,
    w: 6,
    h: 3,
    minW: 3,
    minH: 2,
  })),
  tablet: widgetCatalog.map((widget, index) => ({
    i: widget.id,
    x: (index % 2) * 4,
    y: Math.floor(index / 2) * 3,
    w: 4,
    h: 3,
    minW: 2,
    minH: 2,
  })),
  mobile: widgetCatalog.map((widget, index) => ({
    i: widget.id,
    x: 0,
    y: index * 3,
    w: 1,
    h: 3,
    minW: 1,
    minH: 2,
  })),
};

const cloneLayouts = (layouts) =>
  Object.fromEntries(
    Object.entries(layouts).map(([breakpoint, items]) => [
      breakpoint,
      items.map((item) => ({ ...item })),
    ]),
  );

const normalizeWidgets = (widgets) => {
  if (!Array.isArray(widgets) || widgets.length === 0) return defaultWidgetIds;
  const allowed = new Set(widgetCatalog.map(({ id }) => id));
  return widgets
    .map((item) => (typeof item === 'string' ? item : item?.id))
    .filter((id) => allowed.has(id));
};

const getCurrentBreakpoint = (width) => {
  const ordered = Object.entries(BREAKPOINTS).sort(([, a], [, b]) => b - a);
  return ordered.find(([, minWidth]) => width >= minWidth)?.[0] || sortedBreakpoints[0];
};

const WorkspaceWidget = ({ widget, editing, onHide, onOpen }) => (
  <Paper
    variant="outlined"
    sx={{
      height: '100%',
      p: 2.5,
      borderRadius: 2,
      overflow: 'hidden',
      bgcolor: 'background.paper',
    }}
  >
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
      <Typography variant="subtitle1" fontWeight={700}>
        {widget.title}
      </Typography>
      {editing ? (
        <Button size="small" color="inherit" onClick={() => onHide(widget.id)}>
          删除
        </Button>
      ) : (
        <Button size="small" variant="soft" onClick={() => onOpen(widget.path)}>
          打开模块
        </Button>
      )}
    </Stack>
    <Typography variant="h5" sx={{ mt: 2, mb: 0.75 }}>
      {widget.value}
    </Typography>
    <Typography color="text.secondary" variant="body2">
      {widget.description}
    </Typography>
  </Paper>
);

const MyWorkspace = ({ initialToolboxOpen = false }) => {
  const navigate = useNavigate();
  const { width, containerRef, mounted } = useContainerWidth();
  const [layouts, setLayouts] = useState(() => cloneLayouts(defaultLayouts));
  const [visibleWidgets, setVisibleWidgets] = useState(() => defaultWidgetIds);
  const [version, setVersion] = useState(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [toolboxOpen, setToolboxOpen] = useState(initialToolboxOpen);
  const { setSettingsPanelConfig } = useSettingsPanelContext();

  const visibleCatalog = useMemo(() => {
    const visible = new Set(visibleWidgets);
    return widgetCatalog.filter((widget) => visible.has(widget.id));
  }, [visibleWidgets]);

  useEffect(() => {
    const controller = new AbortController();
    const loadLayout = async () => {
      try {
        const saved = await axiosInstance.get(`/v1/workspaces/${WORKSPACE_ID}/dashboard-layout`, {
          signal: controller.signal,
        });
        if (!saved) return;
        setLayouts(
          Object.keys(saved.breakpoints || {}).length
            ? saved.breakpoints
            : cloneLayouts(defaultLayouts),
        );
        setVisibleWidgets(normalizeWidgets(saved.widgets));
        setVersion(saved.version || 0);
      } catch (error) {
        if (error?.data !== 'canceled' && error?.name !== 'CanceledError')
          setMessage({
            severity: 'error',
            text: `工作台布局加载失败（${error?.status || 'NETWORK'}: ${error?.data || '请求失败'}）。`,
          });
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadLayout();
    return () => controller.abort();
  }, []);

  const handleLayoutChange = useCallback(
    (_layout, allLayouts) => {
      if (!editing) return;
      if (!allLayouts || typeof allLayouts !== 'object' || Array.isArray(allLayouts)) {
        setLayouts((current) => {
          const next = cloneLayouts(current);
          const bp = getCurrentBreakpoint(width);
          next[bp] = Array.isArray(_layout) ? _layout.map((item) => ({ ...item })) : next[bp];
          return next;
        });
        return;
      }

      setLayouts(cloneLayouts(allLayouts));
    },
    [editing, width],
  );

  const handleHide = useCallback((widgetId) => {
    setVisibleWidgets((current) => current.filter((id) => id !== widgetId));
    setEditing(true);
  }, []);

  const handleAdd = useCallback((widgetId) => {
    setVisibleWidgets((current) => (current.includes(widgetId) ? current : [...current, widgetId]));
    setEditing(true);
    setLayouts((current) => {
      const next = cloneLayouts(current);
      for (const [breakpoint, columns] of Object.entries(COLS)) {
        if (!next[breakpoint]?.some((item) => item.i === widgetId)) {
          const index = next[breakpoint]?.length || 0;
          const widthForItem = breakpoint === 'mobile' ? 1 : Math.max(2, Math.floor(columns / 2));
          next[breakpoint] = [
            ...(next[breakpoint] || []),
            { i: widgetId, x: 0, y: index * 3, w: widthForItem, h: 3, minW: 1, minH: 2 },
          ];
        }
      }
      return next;
    });
  }, []);

  const restoreDefaults = useCallback(() => {
    setLayouts(cloneLayouts(defaultLayouts));
    setVisibleWidgets(defaultWidgetIds);
    setMessage({ severity: 'info', text: '已恢复默认布局，保存后同步到服务器。' });
  }, []);

  const saveLayout = useCallback(async () => {
    try {
      const saved = await axiosInstance.put(`/v1/workspaces/${WORKSPACE_ID}/dashboard-layout`, {
        version,
        breakpoints: layouts,
        widgets: visibleWidgets.map((id) => ({ id })),
      });
      setVersion(saved.version);
      setEditing(false);
      setMessage({ severity: 'success', text: '布局已保存到企业工作区。' });
    } catch (error) {
      setMessage({
        severity: 'error',
        text:
          error?.status === 409
            ? '布局已在其他设备更新，请刷新后重试。'
            : `布局保存失败（${error?.status || 'NETWORK'}: ${error?.data || '请求失败'}）。`,
      });
    }
  }, [layouts, version, visibleWidgets]);

  const hiddenWidgets = widgetCatalog.filter(({ id }) => !visibleWidgets.includes(id));

  return (
    <Box sx={{ width: 1 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h4">自定义工作台</Typography>
          <Typography color="text.secondary">
            从工具箱添加或删除模块，拖动位置、调整大小并保存企业布局。
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button color="inherit" onClick={() => setToolboxOpen(true)}>
            工具箱
          </Button>
          <Button
            color="inherit"
            onClick={() => setSettingsPanelConfig({ openSettingPanel: true })}
          >
            模板与布局
          </Button>
          {editing ? (
            <Button color="inherit" onClick={restoreDefaults}>
              恢复默认
            </Button>
          ) : null}
          {editing ? (
            <Button variant="contained" onClick={saveLayout}>
              保存布局
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setEditing(true)}>
              编辑工作台
            </Button>
          )}
        </Stack>
      </Stack>

      {message ? (
        <Alert severity={message.severity} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      ) : null}

      {editing && hiddenWidgets.length > 0 ? (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ mb: 2 }}
        >
          <Typography variant="body2" color="text.secondary">
            添加组件：
          </Typography>
          {hiddenWidgets.map((widget) => (
            <Chip key={widget.id} label={widget.title} onClick={() => handleAdd(widget.id)} />
          ))}
        </Stack>
      ) : null}

      <Box ref={containerRef} sx={{ minHeight: 320, opacity: loading ? 0.55 : 1 }}>
        {mounted ? (
          <Responsive
            width={width}
            layouts={layouts}
            breakpoints={BREAKPOINTS}
            cols={COLS}
            rowHeight={72}
            margin={[16, 16]}
            dragConfig={{ enabled: editing, handle: '.ffax-widget-drag-handle' }}
            resizeConfig={{ enabled: editing, handles: ['se'] }}
            isDraggable={editing}
            isResizable={editing}
            onLayoutChange={handleLayoutChange}
          >
            {visibleCatalog.map((widget) => (
              <Box
                key={widget.id}
                className={editing ? 'ffax-widget-drag-handle' : undefined}
                sx={{ cursor: editing ? 'move' : 'default' }}
              >
                <WorkspaceWidget
                  widget={widget}
                  editing={editing}
                  onHide={handleHide}
                  onOpen={navigate}
                />
              </Box>
            ))}
          </Responsive>
        ) : null}
      </Box>

      <Drawer anchor="right" open={toolboxOpen} onClose={() => setToolboxOpen(false)}>
        <Box sx={{ width: { xs: 320, sm: 380 }, p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h5">工作台工具箱</Typography>
            <Button color="neutral" onClick={() => setToolboxOpen(false)}>
              关闭
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            添加或移除当前工作台的企业组件。
          </Typography>
          <Stack spacing={1.5}>
            {widgetCatalog.map((widget) => {
              const visible = visibleWidgets.includes(widget.id);
              return (
                <Paper key={widget.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {widget.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {widget.description}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant={visible ? 'soft' : 'contained'}
                      color={visible ? 'neutral' : 'primary'}
                      onClick={() => (visible ? handleHide(widget.id) : handleAdd(widget.id))}
                    >
                      {visible ? '移除' : '添加'}
                    </Button>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MyWorkspace;
