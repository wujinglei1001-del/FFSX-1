import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, Link, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';
import { useOrderDetails } from '../OrderDetailsProvider';

const Customer = ({ sx }) => {
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
          {translateUi('ui.sections.ecommerce.admin.order.customer_0e85749a')}
        </Typography>

        <Button variant="text" size="small" sx={{ flexShrink: 0, minWidth: 0 }}>
          {translateUi('ui.sections.ecommerce.admin.order.edit_5301648d')}
        </Button>
      </Stack>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Avatar
          src={customer?.avatar}
          alt={translateUi('ui.sections.ecommerce.admin.order.captain_haddock_b801c768')}
          sx={{ width: 54, height: 54, mb: 1 }}
        />
        <Link href={paths.customerAccount} variant="body2">
          {customer?.name}
        </Link>
      </Box>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          alignItems: 'center',
          mb: 1,
        }}
      >
        <IconifyIcon
          icon="material-symbols:mail-outline-rounded"
          fontSize={20}
          color="text.primary"
        />
        <Link href={`mailto:${customer?.contactInfo.email}`} variant="body2">
          {customer?.contactInfo.email}
        </Link>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          alignItems: 'center',
        }}
      >
        <IconifyIcon icon="material-symbols:call-outline" fontSize={20} color="text.primary" />
        <Link
          href={`tel:${customer?.contactInfo.phone}`}
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          {customer?.contactInfo.phone}
        </Link>
      </Stack>
    </Box>
  );
};

export default Customer;
