import { useTranslation } from 'react-i18next';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import paths from 'routes/paths';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import ProductListingStepper from 'components/sections/ecommerce/admin/product-listing/ProductListingStepper';

const ProductListing = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title={translateUi('ui.pages.apps.ecommerce.admin.product_listing_78939d2e')}
          breadcrumb={[
            {
              label: translateUi('ui.pages.apps.ecommerce.admin.home_70f8bb9a'),
              url: paths.ecommerceHomepage,
            },
            {
              label: translateUi('ui.pages.apps.ecommerce.admin.product_listing_78939d2e'),
              active: true,
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <Paper sx={{ height: 1 }}>
          <ProductListingStepper />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductListing;
