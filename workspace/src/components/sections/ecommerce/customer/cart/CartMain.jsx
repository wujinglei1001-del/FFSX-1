import { useTranslation } from 'react-i18next';
import { Box, Button, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import useNumberFormat from 'hooks/useNumberFormat';
import i18n from 'locales/i18n';
import { useEcommerce } from 'providers/EcommerceProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import CartItem from './CartItem';

const ActionButtons = ({ sx }) => (
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    sx={{
      gap: 2,
      ...sx,
    }}
  >
    <Button
      variant="soft"
      color="primary"
      href={paths.products}
      startIcon={
        <IconifyIcon icon="material-symbols:chevron-left-rounded" fontSize="20px !important" />
      }
    >
      {i18n.t('ui.sections.ecommerce.customer.cart.continue_shopping_84a90820')}
    </Button>
    <Button
      variant="soft"
      color="neutral"
      startIcon={
        <IconifyIcon icon="material-symbols:favorite-outline-rounded" fontSize="20px !important" />
      }
    >
      {i18n.t('ui.sections.ecommerce.customer.cart.move_all_items_into_wishlist_6d7698d2')}
    </Button>
  </Stack>
);

const CartMain = () => {
  const { t: translateUi } = useTranslation();
  const { cartItems } = useEcommerce();
  const { currencyFormat } = useNumberFormat();

  return (
    <Paper sx={{ height: 1, px: { xs: 3, md: 5 }, py: 5 }}>
      <Container maxWidth="md" sx={{ px: { xs: 0 } }}>
        <Typography
          variant="h3"
          sx={{
            color: 'success.main',
            mb: 5,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.cart.excellent_choices_961a4115')}
        </Typography>

        <ActionButtons sx={{ mb: 5 }} />

        <Stack sx={{ gap: 5, mb: 5 }}>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))}
        </Stack>

        <Box sx={{ mb: 5 }}>
          <Divider sx={{ mb: 1 }} />
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center', px: { xs: 3, md: 5 } }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
              }}
            >
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              {translateUi('ui.sections.ecommerce.customer.cart.items_7316c8b2')}
            </Typography>

            <Stack direction="row" sx={{ gap: { xs: 3, md: 5 }, alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                {translateUi('ui.sections.ecommerce.customer.cart.total_5a537e20')}
              </Typography>
              <Typography variant="h5">
                {currencyFormat(
                  cartItems.reduce((sum, item) => sum + item.price.discounted * item.quantity, 0),
                )}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <ActionButtons />
      </Container>
    </Paper>
  );
};

export default CartMain;
