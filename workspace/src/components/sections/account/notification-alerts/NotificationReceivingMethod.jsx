import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControl, Stack, Switch } from '@mui/material';
import NotificationOptions from './NotificationOptions';

const NotificationReceivingMethod = () => {
  const { t: translateUi } = useTranslation();
  const { control, watch, setValue, resetField } = useFormContext();

  const pushEnabled = watch('push.checked');
  const emailEnabled = watch('email.checked');
  const smsEnabled = watch('sms.checked');

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      sx={{ mt: 1, mb: 5, gap: 2, alignItems: 'flex-start' }}
    >
      <Stack direction="row" sx={{ gap: 2 }}>
        <Controller
          name="push.checked"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (!e.target.checked) {
                  setValue('push.options', {
                    newNotifications: false,
                    directNotifications: false,
                    postsEmailed: false,
                    notificationFrequency: null,
                    feedback: false,
                    deals: false,
                    personalizedDeals: false,
                    updates: false,
                    accountSecurity: false,
                    packageUpdates: false,
                  });
                } else resetField('push.options');
              }}
            />
          )}
        />
        <NotificationOptions
          checked={pushEnabled}
          notificationMethod="push"
          label={translateUi(
            'ui.sections.account.notification_alerts.notificationreceivingmethod.push_8f7f57b5',
          )}
          icon="material-symbols:ad-units-outline"
        />
      </Stack>
      <Stack direction="row" sx={{ gap: 2 }}>
        <Controller
          name="email.checked"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (!e.target.checked) {
                  setValue('email.options', {
                    newNotifications: false,
                    directNotifications: false,
                    postsEmailed: false,
                    notificationFrequency: null,
                    feedback: false,
                    deals: false,
                    personalizedDeals: false,
                    updates: false,
                    accountSecurity: false,
                    packageUpdates: false,
                  });
                } else resetField('email.options');
              }}
            />
          )}
        />
        <NotificationOptions
          checked={emailEnabled}
          notificationMethod="email"
          label={translateUi(
            'ui.sections.account.notification_alerts.notificationreceivingmethod.email_84add5b2',
          )}
          icon="material-symbols:mail-outline"
        />
      </Stack>
      <Stack direction="row" sx={{ gap: 2 }}>
        <Controller
          name="sms.checked"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (!e.target.checked) {
                  setValue('sms.options', {
                    newNotifications: false,
                    directNotifications: false,
                    postsEmailed: false,
                    notificationFrequency: null,
                    feedback: false,
                    deals: false,
                    personalizedDeals: false,
                    updates: false,
                    accountSecurity: false,
                    packageUpdates: false,
                  });
                } else resetField('sms.options');
              }}
            />
          )}
        />
        <NotificationOptions
          checked={smsEnabled}
          notificationMethod="sms"
          label="SMS"
          icon="material-symbols:sms-outline"
        />
      </Stack>
    </FormControl>
  );
};

export default NotificationReceivingMethod;
