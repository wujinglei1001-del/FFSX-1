import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const TwoFactorAuthOTP = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  return (
    <FormControl sx={{ gap: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        {translateUi(
          'ui.sections.account.privacy_protection.twofactorauthotp.set_how_you_are_going_to_receive_opt_b6121b8a',
        )}
      </Typography>
      <Controller
        name="otpMethod"
        control={control}
        render={({ field }) => (
          <RadioGroup aria-labelledby="privacy-protection-2fa-radio-buttons" {...field}>
            <FormControlLabel
              value="send_text"
              defaultChecked
              control={<Radio />}
              label={translateUi(
                'ui.sections.account.privacy_protection.twofactorauthotp.send_a_text_message_to_78_3fc4d8d6',
              )}
            />
            <FormControlLabel
              value="send_email"
              control={<Radio />}
              label={translateUi(
                'ui.sections.account.privacy_protection.twofactorauthotp.send_an_email_to_hing_email_com_0c892e75',
              )}
            />
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export default TwoFactorAuthOTP;
