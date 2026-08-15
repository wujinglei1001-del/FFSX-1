import { Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';

export const globalPermissions = [
  {
    name: 'administrator',
    checked: false,
    label: (
      <Stack key="administrator-label" sx={{ gap: 0.5 }}>
        <Typography key="administrator-title" variant="subtitle2" sx={{ fontWeight: 700 }}>
          {i18n.t('ui.data.account.user_permissions.administrator_1eda2375')}
        </Typography>
        <Typography key="administrator-subtitle" variant="body2" sx={{ color: 'text.secondary' }}>
          {i18n.t(
            'ui.data.account.user_permissions.has_full_access_but_can_t_transfer_ownership_216d01d9',
          )}
        </Typography>
      </Stack>
    ),
  },
  {
    name: 'billing',
    checked: false,
    label: (
      <Stack key="billing-label" sx={{ gap: 0.5 }}>
        <Typography key="billing-title" variant="subtitle2" sx={{ fontWeight: 700 }}>
          {i18n.t('ui.data.account.user_permissions.billing_abaec452')}
        </Typography>
        <Typography key="billing-subtitle" variant="body2" sx={{ color: 'text.secondary' }}>
          {i18n.t(
            'ui.data.account.user_permissions.users_can_modify_plans_but_domains_and_google_worksp_7c9940c1',
          )}
        </Typography>
      </Stack>
    ),
  },
];

export const userPermissions = [
  {
    name: 'deleteAccount',
    checked: false,
    get label() {
      return i18n.t(
        'ui.data.account.user_permissions.permit_users_to_delete_their_accounts_28b5702d',
      );
    },
  },
  {
    name: 'createOrganizatio',
    checked: true,
    get label() {
      return i18n.t(
        'ui.data.account.user_permissions.enable_users_to_create_organizations_e575ba5d',
      );
    },
  },
];
