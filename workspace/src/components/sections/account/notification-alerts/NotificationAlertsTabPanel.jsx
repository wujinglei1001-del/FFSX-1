import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Stack } from '@mui/material';
import {
  desktopNotifications,
  muteNotifications,
  taggedNotifications,
} from 'data/account/notification-alerts';
import { useSnackbar } from 'notistack';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import GeneralNotification from './GeneralNotification';
import NotificationReceivingMethod from './NotificationReceivingMethod';

const NotificationAlertsTabPanel = () => {
  const { t: translateUi } = useTranslation();
  const methods = useForm({
    defaultValues: {
      desktopNotifications,
      taggedNotifications,
      muteNotifications,
      push: {
        checked: true,
        options: {
          newNotifications: false,
          directNotifications: true,
          postsEmailed: false,
          notificationFrequency: 'Off',
          feedback: false,
          deals: true,
          personalizedDeals: false,
          updates: false,
          accountSecurity: true,
          packageUpdates: false,
        },
      },
      email: {
        checked: false,
        options: {
          newNotifications: false,
          directNotifications: false,
          postsEmailed: false,
          notificationFrequency: 'Off',
          feedback: false,
          deals: false,
          personalizedDeals: false,
          updates: false,
          accountSecurity: false,
          packageUpdates: false,
        },
      },
      sms: {
        checked: false,
        options: {
          newNotifications: false,
          directNotifications: false,
          postsEmailed: false,
          notificationFrequency: 'Off',
          feedback: false,
          deals: false,
          personalizedDeals: false,
          updates: false,
          accountSecurity: false,
          packageUpdates: false,
        },
      },
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, reset } = methods;
  const onSubmit = (data) => {
    console.log(data);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        divider={<Divider />}
        sx={{ gap: 5 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.notification_alerts.notificationalertstabpanel.general_settings_71dd223f',
          )}
          subtitle={translateUi(
            'ui.sections.account.notification_alerts.notificationalertstabpanel.set_your_notification_preferences_select_who_can_tag_822114fc',
          )}
          icon="material-symbols:settings-alert-outline"
        >
          <GeneralNotification />
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.notification_alerts.notificationalertstabpanel.notification_receiving_method_19819858',
          )}
          icon="material-symbols:settings-alert-outline"
        >
          <NotificationReceivingMethod />
          <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="soft" color="neutral" onClick={() => reset()}>
              {translateUi(
                'ui.sections.account.notification_alerts.notificationalertstabpanel.discard_36fff63c',
              )}
            </Button>
            <Button type="submit" variant="contained">
              {translateUi(
                'ui.sections.account.notification_alerts.notificationalertstabpanel.confirm_04a21221',
              )}
            </Button>
          </Stack>
        </AccountTabPanelSection>
      </Stack>
    </FormProvider>
  );
};

export default NotificationAlertsTabPanel;
