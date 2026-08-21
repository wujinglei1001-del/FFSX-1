import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, MenuItem, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useGridApiRef } from '@mui/x-data-grid';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import DataGridSelectionBar from 'components/common/DataGridSelectionBar';
import SearchTextField from 'components/common/SearchTextField';
import StyledTextField from 'components/styled/StyledTextField';
import OrdersTable from './OrderTable';

const emptySelection = {
  type: 'include',
  ids: new Set(),
};

const OrderListContainer = () => {
  const { t: translateUi } = useTranslation();
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [selectionModel, setSelectionModel] = useState(emptySelection);
  const apiRef = useGridApiRef();
  const { up } = useBreakpoints();

  const upLg = up('lg');

  const handleSearch = useCallback(
    (e) => {
      apiRef.current?.setQuickFilterValues([e.target.value]);
    },
    [apiRef],
  );

  const handleToggleFilterPanel = (e) => {
    const clickedEl = e.currentTarget;

    if (filterButtonEl && filterButtonEl === clickedEl) {
      setFilterButtonEl(null);
      apiRef.current?.hideFilterPanel();

      return;
    }

    setFilterButtonEl(clickedEl);
    apiRef.current?.showFilterPanel();
  };

  return (
    <Grid container spacing={4}>
      <Grid size={12}>
        <Stack
          direction="row"
          sx={{
            columnGap: 1,
            rowGap: 2,
            justifyContent: 'space-between',
            alignItems: { xl: 'center' },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          <Button href={paths.adminCreateOrder} variant="contained" color="primary" sx={{ flexShrink: 0 }}>
            {translateUi('ui.sections.ecommerce.admin.order_list.add_order_29c14ca6')}
          </Button>

          <SearchTextField
            placeholder={translateUi(
              'ui.sections.ecommerce.admin.order_list.search_order_7f86db03',
            )}
            fullWidth
            onChange={handleSearch}
            sx={{
              maxWidth: { sm: 250 },
              order: { xs: 1, sm: 0 },
              flexBasis: { xs: 'calc(100% - 88px)', sm: 'auto' },
              mr: { sm: 2 },
            }}
            iconSx={{ color: 'text.secondary' }}
          />

          <Box sx={{ maxWidth: { xs: 200, sm: 150 }, width: 1, ml: 'auto' }}>
            <StyledTextField variant="filled" fullWidth select defaultValue="30days">
              <MenuItem value="30days">
                {translateUi('ui.sections.ecommerce.admin.order_list.last_30_days_6b329852')}
              </MenuItem>
              <MenuItem value="90days">
                {translateUi('ui.sections.ecommerce.admin.order_list.last_90_days_c328508b')}
              </MenuItem>
              <MenuItem value="lastYear">
                {translateUi('ui.sections.ecommerce.admin.order_list.last_year_3cf4d8d7')}
              </MenuItem>
            </StyledTextField>
          </Box>

          <Stack direction="row" sx={{ gap: 1, order: 1, ml: { md: 2 } }}>
            <Button
              variant="text"
              color="neutral"
              shape={upLg ? undefined : 'square'}
              disabled
              size={upLg ? 'medium' : undefined}
              sx={{ flexShrink: 0 }}
            >
              <IconifyIcon icon="material-symbols:star-rounded" fontSize={20} />
              {upLg && (
                <Box component="span">
                  {translateUi('ui.sections.ecommerce.admin.order_list.saved_c0ae8f6e')}
                </Box>
              )}
            </Button>

            <Button
              variant="text"
              sx={{ flexShrink: 0 }}
              color="neutral"
              shape={upLg ? undefined : 'square'}
              size={upLg ? 'medium' : undefined}
              onClick={handleToggleFilterPanel}
            >
              {upLg && (
                <IconifyIcon
                  icon="material-symbols:swap-vert-rounded"
                  fontSize={'20px !important'}
                />
              )}
              {!upLg && (
                <IconifyIcon
                  icon="material-symbols:filter-alt-outline"
                  fontSize={'20px !important'}
                />
              )}
              {upLg && (
                <Box component="span">
                  {translateUi('ui.sections.ecommerce.admin.order_list.more_filters_bf7117ef')}
                </Box>
              )}
            </Button>
          </Stack>
        </Stack>
      </Grid>

      <Grid size={12}>
        <OrdersTable
          apiRef={apiRef}
          filterButtonEl={filterButtonEl}
          selectionModel={selectionModel}
          onSelectionChange={setSelectionModel}
        />

        <DataGridSelectionBar selectedCount={selectionModel.ids.size}>
          <Button size="small" color="neutral" shape="square" sx={{ flexShrink: 0 }}>
            <IconifyIcon icon="material-symbols:ios-share-rounded" fontSize={18} />
          </Button>

          <IconButton color="error" size="small" onClick={() => setSelectionModel(emptySelection)}>
            <IconifyIcon icon="material-symbols:delete-outline-rounded" fontSize={20} />
          </IconButton>
        </DataGridSelectionBar>
      </Grid>
    </Grid>
  );
};

export default OrderListContainer;
