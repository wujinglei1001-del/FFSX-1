import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import illustrationDark from 'assets/images/illustrations/4-dark.webp';
import illustration from 'assets/images/illustrations/4.webp';
import paths from 'routes/paths';
import Image from 'components/base/Image';

const CartItemsFallback = ({ handleDrawerClose }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 1,
        textAlign: 'center',
      }}
    >
      <div>
        <Image
          src={{ light: illustration, dark: illustrationDark }}
          alt={translateUi('ui.sections.ecommerce.customer.cart.cart_8bfb4e1a')}
          width={270}
          sx={{ mb: 5 }}
        />
        <Typography
          variant="h3"
          sx={{
            mb: 1,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.cart.nothing_here_yet_e892255d')}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 5,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.cart.add_items_to_get_started_dd149e08')}
        </Typography>
        <Button variant="contained" href={paths.products} onClick={handleDrawerClose}>
          {translateUi('ui.sections.ecommerce.customer.cart.start_exploring_a12f1371')}
        </Button>
      </div>
    </Stack>
  );
};

export default CartItemsFallback;
