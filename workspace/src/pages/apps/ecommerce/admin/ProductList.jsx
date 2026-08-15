import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack } from '@mui/material';
import paths from 'routes/paths';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import ProductListContainer from 'components/sections/ecommerce/admin/product-list';

const ProductList = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        height: 1,
      }}
    >
      <PageHeader
        title={translateUi('ui.pages.apps.ecommerce.admin.product_list_87eabc7a')}
        breadcrumb={[
          {
            label: translateUi('ui.pages.apps.ecommerce.admin.home_70f8bb9a'),
            url: paths.ecommerceHomepage,
          },
          { label: translateUi('ui.pages.apps.ecommerce.admin.products_fe0a091f'), active: true },
        ]}
        actionComponent={
          <Stack direction="row" sx={{ gap: 1 }}>
            <Button variant="soft" color="neutral">
              {translateUi('ui.pages.apps.ecommerce.admin.export_f3e4fadb')}
            </Button>
            <Button variant="soft" color="neutral">
              {translateUi('ui.pages.apps.ecommerce.admin.import_d6fbc9d2')}
            </Button>
          </Stack>
        }
      />
      <Paper sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
        <ProductListContainer />
      </Paper>
    </Stack>
  );
};

export default ProductList;
