import { useTranslation } from 'react-i18next';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';

const services = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.customer_account.login_security_f6cf96a8');
    },
    icon: 'material-symbols:lock-outline',
    url: '#!',
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.customer_account.gift_cards_b65882d3');
    },
    icon: 'material-symbols:redeem-rounded',
    url: '#!',
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.customer_account.my_payments_5f5c638c');
    },
    icon: 'material-symbols:payments-outline-rounded',
    url: '#!',
  },
  {
    id: 4,
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.customer_account.digital_support_7849a1ed');
    },
    icon: 'material-symbols:support',
    url: '#!',
  },
  {
    id: 5,
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.customer_account.my_messages_d04104be');
    },
    icon: 'material-symbols:chat-outline-rounded',
    url: '#!',
  },
  {
    id: 6,
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.customer_account.my_lists_dc1d2989');
    },
    icon: 'material-symbols:list-rounded',
    url: '#!',
  },
  {
    id: 7,
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.customer_account.customer_service_1d0c9a65');
    },
    icon: 'material-symbols:support-agent-rounded',
    url: '#!',
  },
];
const AccountAside = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper background={1} sx={{ height: 1 }}>
      <Box
        sx={(theme) => ({
          position: 'sticky',
          top: theme.mixins.ecommerceTopbar,
          p: { xs: 3, md: 5 },
        })}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.customer_account.my_services_82338454')}
        </Typography>
        <nav
          aria-label={translateUi(
            'ui.sections.ecommerce.customer.customer_account.services_list_2f623443',
          )}
        >
          <Grid container component={List} columnSpacing={2} disablePadding>
            {services.map(({ id, label, icon, url }) => (
              <Grid
                key={id}
                component={ListItem}
                disableGutters
                size={{
                  xs: 12,
                  sm: 6,
                  md: 12,
                }}
                sx={{ py: 0.5 }}
              >
                <ListItemButton
                  href={url}
                  sx={{
                    p: 3,
                    gap: 2,
                    bgcolor: 'background.elevation2',
                    '&:hover': { bgcolor: 'background.elevation3' },
                  }}
                >
                  <ListItemIcon>
                    <IconifyIcon icon={icon} fontSize={24} color="primary.dark" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ m: 0 }}
                    slotProps={{
                      primary: {
                        variant: 'body1',
                        sx: {
                          fontWeight: 700,
                          color: 'text.primary',
                        },
                      },
                    }}
                    primary={label}
                  />
                </ListItemButton>
              </Grid>
            ))}
          </Grid>
        </nav>
      </Box>
    </Paper>
  );
};
export default AccountAside;
