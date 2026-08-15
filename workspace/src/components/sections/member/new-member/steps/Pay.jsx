import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import useNumberFormat from 'hooks/useNumberFormat';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import NumberTextField from 'components/base/NumberTextField';

export const payFormSchema = yup.object({
  payType: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.pay_type_is_required_3bb5abb0')),
  paySchedule: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.pay_schedule_is_required_f44c7e89')),
  salaryRate: yup
    .number()
    .required(i18n.t('ui.sections.member.new_member.steps.salary_rate_is_required_e297b0d6')),
});
const Pay = () => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container rowSpacing={2} columnSpacing={1}>
      <Grid size={6}>
        <TextField
          select
          fullWidth
          label={translateUi('ui.sections.member.new_member.steps.pay_type_cb304fec')}
          defaultValue=""
          error={!!errors.payType}
          helperText={errors.payType?.message}
          {...register('payType')}
        >
          <MenuItem value="" disabled>
            {translateUi('ui.sections.member.new_member.steps.select_85982229')}
          </MenuItem>
          <MenuItem value="cash">
            {translateUi('ui.sections.member.new_member.steps.cash_758ec54e')}
          </MenuItem>
          <MenuItem value="bank-transfer">
            {translateUi('ui.sections.member.new_member.steps.bank_transfer_17ef50d8')}
          </MenuItem>
        </TextField>
      </Grid>
      <Grid size={6}>
        <TextField
          select
          fullWidth
          label={translateUi('ui.sections.member.new_member.steps.pay_schedule_f93266bb')}
          defaultValue=""
          error={!!errors.paySchedule}
          helperText={errors.paySchedule?.message}
          {...register('paySchedule')}
        >
          <MenuItem value="" disabled>
            {translateUi('ui.sections.member.new_member.steps.select_85982229')}
          </MenuItem>
          <MenuItem value="weekly">
            {translateUi('ui.sections.member.new_member.steps.weekly_158f3da5')}
          </MenuItem>
          <MenuItem value="monthly">
            {translateUi('ui.sections.member.new_member.steps.monthly_d31edb7b')}
          </MenuItem>
        </TextField>
      </Grid>
      <Grid size={6}>
        <NumberTextField
          fullWidth
          label={translateUi('ui.sections.member.new_member.steps.salary_rate_c0c4d977')}
          placeholder="$0.00"
          error={!!errors.salaryRate}
          helperText={errors.salaryRate?.message}
          {...register(`salaryRate`, {
            setValueAs: (value) => currencyFormat(value),
          })}
        />
      </Grid>
    </Grid>
  );
};
export default Pay;
