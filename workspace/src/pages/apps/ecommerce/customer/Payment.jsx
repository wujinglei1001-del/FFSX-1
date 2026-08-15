import { useTranslation } from 'react-i18next';
import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import paths from 'routes/paths';
import CartSummary from 'components/sections/ecommerce/customer/checkout/aside/CartSummary';
import PageHeader from 'components/sections/ecommerce/customer/common/PageHeader';
import PaymentSummary from 'components/sections/ecommerce/customer/common/PaymentSummary';
import PaymentBottomBar from 'components/sections/ecommerce/customer/payment/PaymentBottomBar';
import PaymentDetails from 'components/sections/ecommerce/customer/payment/PaymentDetails';
import PaymentMethods from 'components/sections/ecommerce/customer/payment/PaymentMethods';

const Payment = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title={translateUi('ui.pages.apps.ecommerce.customer.payment_b41a92be')}
          breadcrumb={[
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.cart_44656820'),
              url: paths.cart,
            },
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.checkout_3ac8e9e5'),
              url: paths.checkout,
            },
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.payment_b41a92be'),
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
          <Container maxWidth="sm" sx={{ px: { xs: 0 } }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: 'success.main',
                mb: 1,
              }}
            >
              {translateUi('ui.pages.apps.ecommerce.customer.your_order_has_been_placed_52e2ba05')}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
              }}
            >
              <Box
                component="span"
                sx={{
                  fontWeight: 400,
                  color: 'text.secondary',
                }}
              >
                {translateUi('ui.pages.apps.ecommerce.customer.order_id_81415342')}{' '}
              </Box>
              #51253134
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                mb: 3,
              }}
            >
              {translateUi(
                'ui.pages.apps.ecommerce.customer.a_confirmation_email_has_been_sent_to_82006b1e',
              )}
              <strong>
                {translateUi('ui.pages.apps.ecommerce.customer.hello_email_com_7b5f21e4')}
              </strong>
            </Typography>
            <PaymentDetails sx={{ mb: 7 }} />
            <PaymentMethods />
          </Container>
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
            <CartSummary />
            <Divider sx={{ my: 4 }} />
            <PaymentSummary />
          </Box>
        </Paper>
      </Grid>
      <Grid sx={{ position: 'sticky', zIndex: 999, width: 1, bottom: 0 }} size={12}>
        <PaymentBottomBar />
      </Grid>
    </Grid>
  );
};

export default Payment;
