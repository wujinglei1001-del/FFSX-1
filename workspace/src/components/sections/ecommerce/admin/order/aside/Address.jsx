import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useOrderDetails } from '../OrderDetailsProvider';

const Address = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const { order } = useOrderDetails();
  const { customer } = order;

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4, lg: 5 },
        ...sx,
      }}
    >
      <Box
        sx={{
          mb: 5,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
            }}
          >
            {translateUi('ui.sections.ecommerce.admin.order.1_shipping_address_0833d141')}
          </Typography>

          <Button variant="text" size="small" sx={{ flexShrink: 0, minWidth: 0 }}>
            {translateUi('ui.sections.ecommerce.admin.order.edit_5301648d')}
          </Button>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {customer?.contactInfo.address.shipping}
        </Typography>
      </Box>
      <div>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
            }}
          >
            {translateUi('ui.sections.ecommerce.admin.order.1_billing_address_ef220ca5')}
          </Typography>

          <Button variant="text" size="small" sx={{ flexShrink: 0, minWidth: 0 }}>
            {translateUi('ui.sections.ecommerce.admin.order.edit_5301648d')}
          </Button>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            color: 'text.disabled',
          }}
        >
          {customer?.contactInfo.address.billingAddressSameAsShipping
            ? 'Same as shipping address'
            : customer?.contactInfo.address.billing}
        </Typography>
      </div>
    </Box>
  );
};

export default Address;
