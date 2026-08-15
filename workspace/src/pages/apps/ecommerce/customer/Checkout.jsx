import { useTranslation } from 'react-i18next';
import { Box, Container, Divider, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import paths from 'routes/paths';
import CheckoutBottomBar from 'components/sections/ecommerce/customer/checkout/CheckoutBottomBar';
import CartSummary from 'components/sections/ecommerce/customer/checkout/aside/CartSummary';
import ExpressCheckout from 'components/sections/ecommerce/customer/checkout/main/ExpressCheckout';
import CheckoutStepper from 'components/sections/ecommerce/customer/checkout/main/checkout-stepper/CheckoutStepper';
import PageHeader from 'components/sections/ecommerce/customer/common/PageHeader';
import PaymentSummary from 'components/sections/ecommerce/customer/common/PaymentSummary';

const Checkout = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title={translateUi('ui.pages.apps.ecommerce.customer.checkout_3ac8e9e5')}
          breadcrumb={[
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.home_70f8bb9a'),
              url: paths.ecommerceHomepage,
            },
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.cart_44656820'),
              url: paths.cart,
            },
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.checkout_3ac8e9e5'),
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
            <ExpressCheckout sx={{ mb: 7 }} />
            <CheckoutStepper />
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
        <CheckoutBottomBar />
      </Grid>
    </Grid>
  );
};

export default Checkout;
