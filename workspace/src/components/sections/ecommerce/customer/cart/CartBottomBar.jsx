import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack, Typography } from '@mui/material';
import useNumberFormat from 'hooks/useNumberFormat';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useEcommerce } from 'providers/EcommerceProvider';
import paths from 'routes/paths';

const CartBottomBar = () => {
  const { t: translateUi } = useTranslation();
  const { cartItems, cartTotal } = useEcommerce();
  const { up } = useBreakpoints();
  const { currencyFormat } = useNumberFormat();
  const upSm = up('sm');

  return (
    <Paper background={2} sx={{ py: 1, px: { xs: 3, md: 5 } }}>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {upSm && (
          <Typography
            variant="subtitle1"
            sx={{
              flex: 1,
            }}
          >
            {cartItems.length}
            {translateUi('ui.sections.ecommerce.customer.cart.item_3a7d9767')}
            {cartItems.length > 1 ? 's' : ''}
            {translateUi('ui.sections.ecommerce.customer.cart.selected_835f3b50')}
          </Typography>
        )}
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: { xs: 1, sm: 'unset' },
            gap: { xs: 3, md: 8 },
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: 'text.secondary',
                display: { xs: 'none', md: 'block' },
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.cart.total_b25928c6')}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: { xs: 700 } }}>
              {currencyFormat(cartTotal)}
            </Typography>
          </Stack>
          <Button
            color="primary"
            variant="contained"
            href={paths.checkout}
            sx={{
              flexShrink: 0,
              whiteSpace: 'nowrap',
              px: { xs: 3, sm: 6 },
            }}
          >
            {translateUi('ui.sections.ecommerce.customer.cart.checkout_as_guest_f30150c7')}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CartBottomBar;
