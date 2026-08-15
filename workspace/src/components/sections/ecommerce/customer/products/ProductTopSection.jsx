import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormControl, MenuItem, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';
import StyledTextField from 'components/styled/StyledTextField';
import { useProducts } from './providers/ProductsProvider';

const sortByOptions = [
  {
    value: 'recommended',
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.products.recommended_9ef93755');
    },
  },
  {
    value: 'lowToHight',
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.products.price_low_high_8642cc4d');
    },
  },
  {
    value: 'highToLow',
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.products.price_high_low_7e3dddbc');
    },
  },
  {
    value: 'highestRated',
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.products.highest_rated_4710d12c');
    },
  },
];

const ProductTopSection = ({ isDrawerOpen, toggleDrawer }) => {
  const { t: translateUi } = useTranslation();
  const [sortBy, setSortBy] = useState('recommended');

  const { handleProductsSort } = useProducts();

  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <PageBreadcrumb
        items={[
          {
            label: translateUi('ui.sections.ecommerce.customer.products.home_70f8bb9a'),
            url: paths.ecommerceHomepage,
          },
          {
            label: translateUi('ui.sections.ecommerce.customer.products.living_room_25ff70b3'),
            url: '#!',
          },
          {
            label: translateUi('ui.sections.ecommerce.customer.products.armchair_d5727b18'),
            active: true,
          },
        ]}
        sx={{ mb: 4 }}
      />
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: 'center',
        }}
      >
        <Grid
          sx={{
            order: { lg: 1 },
          }}
          size={{
            xs: 12,
            lg: 'auto',
          }}
        >
          <Typography variant="h6">
            {translateUi('ui.sections.ecommerce.customer.products.searched_for_ad982376')}
            <Box
              component="span"
              sx={{
                fontWeight: 'medium',
                ml: 1.5,
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.products.armchair_08087429')}
            </Box>
          </Typography>
        </Grid>

        <Grid size="auto">
          <Button
            onClick={toggleDrawer}
            variant="soft"
            sx={{
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Box
              component="span"
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {isDrawerOpen ? 'Hide filters' : 'Show filters'}
            </Box>
            <IconifyIcon icon="material-symbols:filter-alt-outline" sx={{ fontSize: '20px' }} />
          </Button>
        </Grid>

        <Grid
          sx={{
            ml: 'auto',
            flexGrow: 1,
            order: { lg: 1 },
          }}
          size="auto"
        >
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 2,
              justifyContent: 'flex-end',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.products.85_results_4c432cbc')}
            </Typography>
            <FormControl sx={{ maxWidth: 160, width: 1 }}>
              <StyledTextField
                select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  handleProductsSort(event.target.value);
                }}
              >
                {sortByOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </StyledTextField>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductTopSection;
