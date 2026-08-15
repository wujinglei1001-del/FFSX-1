import { useTranslation } from 'react-i18next';
import { Box, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { orderDetailsList } from 'data/e-commerce/orders';
import paths from 'routes/paths';
import PageHeader from 'components/sections/ecommerce/customer/common/PageHeader';
import OrderDetailsAside from 'components/sections/ecommerce/customer/order-details/OrderDetailsAside';
import OrderedItem from 'components/sections/ecommerce/customer/order-details/OrderedItem';

const OrderDetails = () => {
  const { t: translateUi } = useTranslation();
  const order = orderDetailsList[1];

  return (
    <Grid
      container
      sx={{
        height: 1,
      }}
    >
      <Grid size={12}>
        <PageHeader
          title={translateUi('ui.pages.apps.ecommerce.customer.order_details_1a897948')}
          userLoggedIn
          breadcrumb={[
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.home_e83249bd'),
              url: paths.ecommerceHomepage,
            },
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.order_list_b9d186ef'),
              url: paths.orderList,
            },
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.order_details_b14b7aa9'),
              active: true,
            },
          ]}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 8,
          xl: 9,
        }}
      >
        <Paper sx={{ height: 1, px: { xs: 3, md: 5 }, py: { xs: 5, md: 8 } }}>
          <Stack sx={{ gap: 8 }}>
            {order.items.map((product) => (
              <OrderedItem key={product.id} product={product} customer={order.customer} />
            ))}
          </Stack>
        </Paper>
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 4,
          xl: 3,
        }}
      >
        <Paper background={1} sx={{ height: 1 }}>
          <Box
            sx={(theme) => ({
              position: 'sticky',
              top: theme.mixins.ecommerceTopbar,
              p: { xs: 3, md: 5 },
            })}
          >
            <OrderDetailsAside order={order} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
