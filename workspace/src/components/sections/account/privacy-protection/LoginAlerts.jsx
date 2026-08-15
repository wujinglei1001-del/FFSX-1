import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

const LoginAlerts = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  return (
    <FormControl component="form" sx={{ gap: 1, mb: 5 }}>
      <Controller
        name="email_alert"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox checked={field.value} size="small" {...field} />}
            label={translateUi(
              'ui.sections.account.privacy_protection.loginalerts.send_an_email_to_so_email_com_9b3224b4',
            )}
          />
        )}
      />
      <Controller
        name="text_message_alert"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox checked={field.value} size="small" {...field} />}
            label={translateUi(
              'ui.sections.account.privacy_protection.loginalerts.send_a_text_message_to_24_59eecf13',
            )}
          />
        )}
      />
    </FormControl>
  );
};

export default LoginAlerts;
