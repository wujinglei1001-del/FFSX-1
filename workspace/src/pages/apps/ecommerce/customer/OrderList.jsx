import { useTranslation } from 'react-i18next';
import { Container, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { orderDetailsList } from 'data/e-commerce/orders';
import paths from 'routes/paths';
import PageHeader from 'components/sections/ecommerce/customer/common/PageHeader';
import OrderListContainer from 'components/sections/ecommerce/customer/order-list';

const OrderList = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title={translateUi('ui.pages.apps.ecommerce.customer.order_list_86e684a4')}
          userLoggedIn
          breadcrumb={[
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.home_70f8bb9a'),
              url: paths.ecommerceHomepage,
            },
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.order_list_86e684a4'),
              active: true,
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <Paper sx={{ height: 1, px: { xs: 3, md: 5 }, py: { xs: 5, md: 8 } }}>
          <Container maxWidth="lg" sx={{ px: { xs: 0 } }}>
            <OrderListContainer orders={orderDetailsList} />
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderList;
