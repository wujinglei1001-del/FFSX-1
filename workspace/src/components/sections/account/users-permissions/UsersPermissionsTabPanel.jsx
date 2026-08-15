import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Stack } from '@mui/material';
import { users } from 'data/users';
import { useSnackbar } from 'notistack';
import { useAccounts } from 'providers/AccountsProvider';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import CollabPermissions from './CollabPermissions';
import Global from './Global';
import Ownership from './Ownership';
import UserPermissions from './UserPermissions';

const UsersPermissionsTabPanel = () => {
  const { t: translateUi } = useTranslation();
  const { usersPermissions } = useAccounts();
  const methods = useForm({
    defaultValues: usersPermissions,
  });
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, reset } = methods;
  const onSubmit = (data) => {
    console.log({ data });
    enqueueSnackbar('Updated successfully!', { variant: 'success' });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        divider={<Divider />}
        sx={{ gap: 4 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.users_permissions.userspermissionstabpanel.store_owner_45d30666',
          )}
          icon="material-symbols:storefront-outline"
        >
          <Ownership
            name="Tsamina Mina"
            email="tsaminamina@email.com"
            avatar={users[6].avatar}
            lastLoginAt="2024-11-15 15:54"
          />
        </AccountTabPanelSection>
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.users_permissions.userspermissionstabpanel.global_5f1184f7',
          )}
          icon="material-symbols:public"
        >
          <Global />
        </AccountTabPanelSection>
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.users_permissions.userspermissionstabpanel.collaborator_request_permissions_16afb3ee',
          )}
          icon="material-symbols:lock-person-outline"
        >
          <CollabPermissions />
        </AccountTabPanelSection>
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.users_permissions.userspermissionstabpanel.user_permissions_c930fd60',
          )}
          icon="material-symbols:person-outline"
        >
          <UserPermissions />
          <Stack direction="row" sx={{ justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="soft" color="neutral" onClick={() => reset()}>
              {translateUi(
                'ui.sections.account.users_permissions.userspermissionstabpanel.discard_36fff63c',
              )}
            </Button>
            <Button type="submit" variant="contained">
              {translateUi(
                'ui.sections.account.users_permissions.userspermissionstabpanel.confirm_04a21221',
              )}
            </Button>
          </Stack>
        </AccountTabPanelSection>
      </Stack>
    </FormProvider>
  );
};

export default UsersPermissionsTabPanel;
