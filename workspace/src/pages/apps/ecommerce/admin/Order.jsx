import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { orderDetailsList } from 'data/e-commerce/orders';
import paths from 'routes/paths';
import OrderDetailsProvider, {
  useOrderDetails,
} from 'components/sections/ecommerce/admin/order/OrderDetailsProvider';
import OrderHead from 'components/sections/ecommerce/admin/order/OrderHead';
import OrderAside from 'components/sections/ecommerce/admin/order/aside';
import OrderContainer from 'components/sections/ecommerce/admin/order/main';

const index = () => {
  return (
    <OrderDetailsProvider>
      <Order />
    </OrderDetailsProvider>
  );
};

const Order = () => {
  const { t: translateUi } = useTranslation();
  const { order, setSetselectedOrder } = useOrderDetails();

  useEffect(() => {
    setSetselectedOrder(orderDetailsList[0]);
  }, []);

  if (!order) {
    return null;
  }

  return (
    <Grid container>
      <Grid
        size={{
          xs: 12,
          md: 8,
          xl: 9,
        }}
      >
        <Stack>
          <OrderHead
            breadcrumb={[
              {
                label: translateUi('ui.pages.apps.ecommerce.admin.order_list_86e684a4'),
                url: paths.orderList,
              },
              { label: translateUi('ui.pages.apps.ecommerce.admin.order_1d75774c'), active: true },
            ]}
          />

          <OrderContainer />
        </Stack>
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 4,
          xl: 3,
        }}
      >
        <OrderAside />
      </Grid>
    </Grid>
  );
};

export default index;
