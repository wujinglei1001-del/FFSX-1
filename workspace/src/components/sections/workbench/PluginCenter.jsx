import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Avatar, Box, Button, Chip, MenuItem, Stack, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useAuth } from 'providers/AuthProvider';
import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axios/axiosInstance';
import useSWR from 'swr';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';
import SearchTextField from 'components/common/SearchTextField';
import DataGridPagination from 'components/pagination/DataGridPagination';
import StyledTextField from 'components/styled/StyledTextField';

const defaultPageSize = 8;

const lifecycleColors = {
  available: 'neutral',
  purchased: 'info',
  installing: 'warning',
  active: 'success',
  disabled: 'neutral',
  upgrading: 'warning',
  failed: 'error',
};

const actionByLifecycle = {
  purchased: ['install'],
  active: ['upgrade', 'disable'],
  disabled: ['enable'],
  failed: ['retry'],
};

const asArray = (value) => (Array.isArray(value) ? value : []);

const PluginCenter = () => {
  const { t: translateUi, i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { sessionUser } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(apiEndpoints.plugins);
  const [searchQuery, setSearchQuery] = useState('');
  const [lifecycle, setLifecycle] = useState('all');
  const [pendingAction, setPendingAction] = useState('');

  const plugins = Array.isArray(data) ? data : [];
  const canManagePlugins = ['tenant-admin', 'marketplace-admin'].some((role) =>
    sessionUser?.roles?.includes(role),
  );

  const filteredPlugins = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return plugins.filter((plugin) => {
      const normalizedLifecycle = plugin.lifecycle || 'available';
      if (lifecycle !== 'all' && normalizedLifecycle !== lifecycle) return false;
      if (!query) return true;

      return [
        plugin.id,
        plugin.name,
        plugin.description,
        plugin.version,
        ...asArray(plugin.capabilities),
        ...asArray(plugin.required_roles),
      ].some((value) =>
        String(value || '')
          .toLocaleLowerCase()
          .includes(query),
      );
    });
  }, [lifecycle, plugins, searchQuery]);

  const formatPrice = useCallback(
    (plugin) => {
      if (!plugin.price_minor) return translateUi('ffax.workbench.free');

      return new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: plugin.currency || 'USD',
      }).format(plugin.price_minor / 100);
    },
    [i18n.language, translateUi],
  );

  const formatDate = useCallback(
    (value) => {
      if (!value) return '—';
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString(i18n.language);
    },
    [i18n.language],
  );

  const runAction = useCallback(
    async (plugin, action) => {
      const actionId = `${plugin.id}:${action}`;
      setPendingAction(actionId);

      try {
        const endpoint =
          action === 'purchase'
            ? apiEndpoints.pluginPurchase(plugin.id)
            : apiEndpoints.pluginAction(plugin.id, action);

        await axiosInstance.post(endpoint);
        await mutate();
        enqueueSnackbar(translateUi('ffax.workbench.action_completed'), { variant: 'success' });
      } catch (requestError) {
        const serverError = requestError?.data?.error || requestError?.data || '';
        const localizedError =
          typeof serverError === 'string'
            ? translateUi(`ffax.workbench.errors.${serverError}`, { defaultValue: serverError })
            : '';
        enqueueSnackbar(
          translateUi('ffax.workbench.action_failed', {
            error: localizedError,
          }),
          { variant: 'error' },
        );
      } finally {
        setPendingAction('');
      }
    },
    [enqueueSnackbar, mutate, translateUi],
  );

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: translateUi('ffax.workbench.columns.plugin'),
        minWidth: 340,
        flex: 1,
        renderCell: ({ row }) => (
          <Stack direction="row" sx={{ gap: 1.25, alignItems: 'center', minWidth: 0, height: 1 }}>
            <Avatar
              variant="rounded"
              sx={{ width: 40, height: 40, bgcolor: 'primary.lighter', color: 'primary.main' }}
            >
              <IconifyIcon icon="material-symbols:apps-rounded" fontSize={22} />
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }} noWrap>
                {row.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {row.description || row.id}
              </Typography>
            </Box>
          </Stack>
        ),
      },
      {
        field: 'version',
        headerName: translateUi('ffax.workbench.columns.version'),
        minWidth: 110,
      },
      {
        field: 'price_minor',
        headerName: translateUi('ffax.workbench.columns.price'),
        minWidth: 120,
        renderCell: ({ row }) => formatPrice(row),
      },
      {
        field: 'lifecycle',
        headerName: translateUi('ffax.workbench.columns.lifecycle'),
        minWidth: 140,
        valueGetter: (_value, row) => row.lifecycle || 'available',
        renderCell: ({ row }) => {
          const value = row.lifecycle || 'available';
          return (
            <Chip
              label={translateUi(`ffax.workbench.lifecycle.${value}`)}
              variant="soft"
              color={lifecycleColors[value] || 'neutral'}
            />
          );
        },
      },
      {
        field: 'capabilities',
        headerName: translateUi('ffax.workbench.columns.capabilities'),
        minWidth: 220,
        sortable: false,
        renderCell: ({ row }) => {
          const capabilities = asArray(row.capabilities);
          if (!capabilities.length) return '—';

          return (
            <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center', overflow: 'hidden' }}>
              {capabilities.slice(0, 2).map((capability) => (
                <Chip key={capability} label={capability} variant="soft" color="neutral" />
              ))}
              {capabilities.length > 2 && (
                <Typography variant="caption" color="text.secondary">
                  +{capabilities.length - 2}
                </Typography>
              )}
            </Stack>
          );
        },
      },
      {
        field: 'required_roles',
        headerName: translateUi('ffax.workbench.columns.roles'),
        minWidth: 190,
        sortable: false,
        renderCell: ({ row }) => asArray(row.required_roles).join(', ') || '—',
      },
      {
        field: 'updated_at',
        headerName: translateUi('ffax.workbench.columns.updated'),
        minWidth: 130,
        renderCell: ({ row }) => formatDate(row.updated_at),
      },
      {
        field: 'action',
        headerName: '',
        width: 80,
        align: 'right',
        headerAlign: 'right',
        filterable: false,
        sortable: false,
        renderCell: ({ row }) => {
          if (!canManagePlugins) {
            return (
              <Typography variant="caption" color="text.secondary">
                —
              </Typography>
            );
          }

          const normalizedLifecycle = row.lifecycle || 'available';
          const actions =
            normalizedLifecycle === 'available'
              ? row.runtime_ready && (!row.price_minor || row.payments_ready)
                ? ['purchase']
                : []
              : row.runtime_ready
                ? actionByLifecycle[normalizedLifecycle] || []
                : [];
          const isPending = actions.some((action) => pendingAction === `${row.id}:${action}`);

          if (!actions.length) {
            return (
              <Typography variant="caption" color="text.secondary">
                —
              </Typography>
            );
          }

          if (actions.length === 1) {
            const action = actions[0];
            return (
              <Button
                size="small"
                variant="soft"
                disabled={isPending}
                onClick={() => runAction(row, action)}
              >
                {translateUi(`ffax.workbench.actions.${action}`)}
              </Button>
            );
          }

          return (
            <DashboardMenu
              disabled={isPending}
              menuItems={actions.map((action) => ({
                label: translateUi(`ffax.workbench.actions.${action}`),
                onClick: () => runAction(row, action),
              }))}
            />
          );
        },
      },
    ],
    [canManagePlugins, formatDate, formatPrice, pendingAction, runAction, translateUi],
  );

  return (
    <Stack sx={{ gap: 3 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ gap: 1, alignItems: { md: 'center' }, justifyContent: 'space-between' }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1 }}>
          <SearchTextField
            value={searchQuery}
            placeholder={translateUi('ffax.workbench.search_plugins')}
            onChange={(event) => setSearchQuery(event.target.value)}
            sx={{ width: { xs: 1, sm: 280 } }}
          />
          <StyledTextField
            select
            size="small"
            value={lifecycle}
            onChange={(event) => setLifecycle(event.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="all">{translateUi('ffax.workbench.all_lifecycles')}</MenuItem>
            {Object.keys(lifecycleColors).map((value) => (
              <MenuItem key={value} value={value}>
                {translateUi(`ffax.workbench.lifecycle.${value}`)}
              </MenuItem>
            ))}
          </StyledTextField>
        </Stack>

        <Button
          color="neutral"
          variant="soft"
          startIcon={<IconifyIcon icon="material-symbols:refresh-rounded" />}
          onClick={() => mutate()}
        >
          {translateUi('ffax.workbench.refresh')}
        </Button>
      </Stack>

      {error && <Alert severity="error">{translateUi('ffax.workbench.load_failed')}</Alert>}

      <Box sx={{ width: 1 }}>
        <DataGrid
          rowHeight={64}
          rows={filteredPlugins}
          columns={columns}
          loading={isLoading}
          disableRowSelectionOnClick
          pageSizeOptions={[defaultPageSize, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: defaultPageSize,
              },
            },
          }}
          slots={{
            basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
          }}
          localeText={{
            noRowsLabel: translateUi('ffax.workbench.no_plugins'),
          }}
          sx={({ spacing }) => ({
            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
              px: spacing(1.25),
            },
          })}
        />
      </Box>
    </Stack>
  );
};

export default PluginCenter;
