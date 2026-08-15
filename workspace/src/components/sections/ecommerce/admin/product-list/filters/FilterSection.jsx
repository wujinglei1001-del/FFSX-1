import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack } from '@mui/material';
import { productListAdmin } from 'data/e-commerce/products';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import FilterMenu from './FilterMenu';

const vendors = Array.from(new Set(productListAdmin.map((item) => item.vendor)));
const categories = Array.from(new Set(productListAdmin.map((item) => item.category)));
const statuses = ['active', 'inactive', 'draft', 'archive'];

const FilterSection = ({ apiRef, handleToggleFilterPanel }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const upSm = up('sm');

  const handleFilter = useCallback(
    (field, value, defaultOperator = 'contains') => {
      if (!field) {
        apiRef.current?.setFilterModel({ items: [] });
      } else {
        const operator = field === 'status' ? 'equals' : defaultOperator;
        apiRef.current?.setFilterModel({
          items: [{ field, operator, value: value?.toString() }],
        });
      }
    },
    [apiRef],
  );

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Stack
        direction="row"
        sx={{ gap: 1, overflowX: { xs: 'auto', md: 'initial' }, scrollbarWidth: 'thin' }}
      >
        <FilterMenu
          label={translateUi('ui.sections.ecommerce.admin.product_list.vendor_d96159ff')}
          field="vendor"
          handleFilter={handleFilter}
          menuItems={vendors}
        />
        <FilterMenu
          label={translateUi('ui.sections.ecommerce.admin.product_list.tagged_with_6a065937')}
          field="category"
          handleFilter={handleFilter}
          menuItems={categories}
        />
        <FilterMenu
          label={translateUi('ui.sections.ecommerce.admin.product_list.status_bae7d5be')}
          field="status"
          handleFilter={handleFilter}
          menuItems={statuses}
        />
      </Stack>

      <Stack direction="row" sx={{ gap: { xs: 1, sm: 2, md: 3 } }}>
        <Button
          variant="text"
          color="neutral"
          shape={upSm ? undefined : 'square'}
          disabled
          sx={{ ml: { md: 'auto' }, flexShrink: 0, minWidth: 0 }}
        >
          <IconifyIcon icon="material-symbols:star-rounded" fontSize={20} />
          {upSm && (
            <Box component="span">
              {translateUi('ui.sections.ecommerce.admin.product_list.saved_c0ae8f6e')}
            </Box>
          )}
        </Button>

        <Button
          variant="text"
          sx={{ flexShrink: 0 }}
          color="neutral"
          shape={upSm ? undefined : 'square'}
          onClick={handleToggleFilterPanel}
        >
          {upSm && (
            <IconifyIcon icon="material-symbols:swap-vert-rounded" fontSize={'20px !important'} />
          )}
          {!upSm && (
            <IconifyIcon icon="material-symbols:filter-alt-outline" fontSize={'20px !important'} />
          )}
          {upSm && (
            <Box component="span">
              {translateUi('ui.sections.ecommerce.admin.product_list.more_filters_bf7117ef')}
            </Box>
          )}
        </Button>
      </Stack>
    </Stack>
  );
};

export default FilterSection;
