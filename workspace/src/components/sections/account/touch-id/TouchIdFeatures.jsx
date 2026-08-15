import { useTranslation } from 'react-i18next';
import { FormControl, FormControlLabel, Stack, Switch, Typography } from '@mui/material';

const TouchIdFeatures = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ gap: 3 }}>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.touch_id.touchidfeatures.manage_touch_id_features_6ff4a848',
          )}
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={translateUi(
            'ui.sections.account.touch_id.touchidfeatures.use_touch_id_to_unlock_your_login_page_d157d8d8',
          )}
          sx={{ gap: 2, ml: 0 }}
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={translateUi(
            'ui.sections.account.touch_id.touchidfeatures.use_touch_id_for_online_payment_339f02af',
          )}
          sx={{ gap: 2, ml: 0 }}
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={translateUi(
            'ui.sections.account.touch_id.touchidfeatures.use_touch_id_for_autofilling_passwords_d8799fef',
          )}
          sx={{ gap: 2, ml: 0 }}
        />
        <FormControlLabel
          control={<Switch />}
          label={translateUi(
            'ui.sections.account.touch_id.touchidfeatures.use_touch_id_for_fast_user_switching_05749acf',
          )}
          sx={{ gap: 2, ml: 0 }}
        />
      </FormControl>
    </Stack>
  );
};

export default TouchIdFeatures;
