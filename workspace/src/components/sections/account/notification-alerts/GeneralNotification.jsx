import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  formControlLabelClasses,
} from '@mui/material';

const GeneralNotification = () => {
  const { t: translateUi } = useTranslation();
  const { control, watch } = useFormContext();
  const { desktopNotifications, taggedNotifications, muteNotifications } = watch();

  return (
    <Stack sx={{ gap: 3 }}>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.notification_alerts.generalnotification.desktop_notifications_53a3505a',
          )}
        </Typography>
        {desktopNotifications.map((notificationItem, index) => (
          <Controller
            key={notificationItem.name}
            control={control}
            name={`desktopNotifications.${index}.checked`}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} {...field} />}
                label={notificationItem.label}
                sx={{
                  gap: 2,
                  ml: 0,
                  [`& .${formControlLabelClasses.label}`]: {
                    display: 'flex',
                    gap: 1,
                  },
                }}
              />
            )}
          />
        ))}
      </FormControl>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.notification_alerts.generalnotification.get_notifications_when_you_are_tagged_by_a718cdb0',
          )}
        </Typography>
        {taggedNotifications.map((notificationItem, index) => (
          <Controller
            key={notificationItem.name}
            control={control}
            name={`taggedNotifications.${index}.checked`}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} {...field} />}
                label={notificationItem.label}
                sx={{ gap: 2, ml: 0 }}
              />
            )}
          />
        ))}
      </FormControl>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.notification_alerts.generalnotification.mute_notifications_for_the_following_people_d286586c',
          )}
        </Typography>
        {muteNotifications.map((notificationItem, index) => (
          <Controller
            key={notificationItem.name}
            control={control}
            name={`muteNotifications.${index}.checked`}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} {...field} />}
                label={notificationItem.label}
                sx={{ gap: 2, ml: 0 }}
              />
            )}
          />
        ))}
      </FormControl>
    </Stack>
  );
};

export default GeneralNotification;
