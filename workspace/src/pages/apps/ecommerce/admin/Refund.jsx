import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { orderDetailsList } from 'data/e-commerce/orders';
import i18n from 'locales/i18n';
import paths from 'routes/paths';
import * as yup from 'yup';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import OrderDetailsProvider, {
  useOrderDetails,
} from 'components/sections/ecommerce/admin/order/OrderDetailsProvider';
import RefundAside from 'components/sections/ecommerce/admin/refund/aside';
import RefundContainer from 'components/sections/ecommerce/admin/refund/main';

export const refundFormValuesSchema = yup.object({
  note: yup.string(),
  refunds: yup
    .array()
    .of(
      yup.object({
        product: yup
          .number()
          .min(0, i18n.t('ui.pages.apps.ecommerce.admin.value_must_be_a_positive_number_3a3dbbda'))
          .required(),
        shipping: yup
          .number()
          .min(0, i18n.t('ui.pages.apps.ecommerce.admin.value_must_be_a_positive_number_3a3dbbda'))
          .required(),
        concession: yup
          .number()
          .min(0, i18n.t('ui.pages.apps.ecommerce.admin.value_must_be_a_positive_number_3a3dbbda'))
          .required(),
      }),
    )
    .required(),
});

const index = () => {
  return (
    <OrderDetailsProvider>
      <Refund />
    </OrderDetailsProvider>
  );
};

const Refund = () => {
  const { t: translateUi } = useTranslation();
  const { order, setSetselectedOrder } = useOrderDetails();

  const methods = useForm({
    resolver: yupResolver(refundFormValuesSchema),
  });

  useEffect(() => {
    setSetselectedOrder(orderDetailsList[0]);
  }, []);

  if (!order) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Grid container>
        <Grid
          size={{
            xs: 12,
            md: 8,
            xl: 9,
          }}
        >
          <Stack>
            <PageHeader
              title={`Refund Order ${order.id}`}
              breadcrumb={[
                {
                  label: translateUi('ui.pages.apps.ecommerce.admin.order_list_86e684a4'),
                  url: paths.orderList,
                },
                {
                  label: translateUi('ui.pages.apps.ecommerce.admin.refund_e17c8ad0'),
                  active: true,
                },
              ]}
              actionComponent={
                <Button variant="soft" color="neutral" sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {translateUi('ui.pages.apps.ecommerce.admin.edit_refunds_settings_1e2bcc86')}
                </Button>
              }
            />

            <RefundContainer />
          </Stack>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 4,
            xl: 3,
          }}
        >
          <RefundAside />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default index;
