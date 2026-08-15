import { useTranslation } from 'react-i18next';
import { Avatar, Box, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { users } from 'data/users';
import IconifyIcon from 'components/base/IconifyIcon';

const Customer = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box
      sx={{
        width: 1,
        p: { xs: 3, md: 5 },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        {translateUi('ui.sections.ecommerce.admin.create_order.customer_0e85749a')}
      </Typography>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Avatar
          src={users[0].avatar}
          alt={translateUi('ui.sections.ecommerce.admin.create_order.captain_haddock_b801c768')}
          sx={{ width: 54, height: 54, mb: 1 }}
        />
      </Box>
      <Stack sx={{ gap: 2 }}>
        <TextField
          fullWidth
          id="customerName"
          type="text"
          label={translateUi('ui.sections.ecommerce.admin.create_order.user_9f8a2389')}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon icon="material-symbols:person-outline-rounded" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Stack sx={{ gap: 1 }}>
          <TextField
            fullWidth
            id="customerEmail"
            type="email"
            label={translateUi('ui.sections.ecommerce.admin.create_order.email_84add5b2')}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconifyIcon icon="material-symbols:mail-outline-rounded" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            fullWidth
            id="customerPhone"
            type="tel"
            label={translateUi('ui.sections.ecommerce.admin.create_order.phone_number_ab25d61b')}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconifyIcon icon="material-symbols:call-outline" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ '& input': { direction: 'ltr' } }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Customer;
