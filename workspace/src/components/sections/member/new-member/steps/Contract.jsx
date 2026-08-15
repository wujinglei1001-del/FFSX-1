import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import PhoneInput from 'components/common/PhoneInput';

export const addressSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(i18n.t('ui.sections.member.new_member.steps.email_is_required_4da1d591')),
  phone: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.phone_no_is_required_b892c517')),
});
const Contract = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container rowSpacing={2} columnSpacing={1}>
      <Grid size={6}>
        <TextField
          fullWidth
          label={translateUi('ui.sections.member.new_member.steps.email_84add5b2')}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              fullWidth
              label={translateUi('ui.sections.member.new_member.steps.phone_no_8578b945')}
              {...field}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
export default Contract;
