import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';

const PaymentDetails = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={[
        {
          gap: 1,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <PaymentDetailsItem
        label={translateUi('ui.sections.ecommerce.customer.payment.customer_name_75636316')}
        value="Captain Haddock"
      />
      <PaymentDetailsItem
        label={translateUi('ui.sections.ecommerce.customer.payment.phone_number_ab25d61b')}
        value="+880 1423 4234 245"
        sx={{ mb: 1 }}
      />
      <PaymentDetailsItem
        label={translateUi('ui.sections.ecommerce.customer.payment.shipping_address_dbd7c38d')}
        value="Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580"
      />
      <PaymentDetailsItem
        label={translateUi('ui.sections.ecommerce.customer.payment.billing_address_48af96f6')}
        value="Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580"
        sx={{ mb: 1 }}
      />
      <PaymentDetailsItem
        label={translateUi('ui.sections.ecommerce.customer.payment.delivery_option_87c269d5')}
        value="Standard DDP"
      />
    </Stack>
  );
};

const PaymentDetailsItem = ({ label, value, sx }) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        gap: 0.5,
        borderRadius: 2,
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.elevation2',
          p: 2,
          width: { sm: 180 },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          bgcolor: 'background.elevation1',
          p: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export default PaymentDetails;
