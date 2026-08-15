import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import useNumberFormat from 'hooks/useNumberFormat';
import ApplicationFormSection from '../common/ApplicationFormSection';

const AdditionalInfo = () => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <ApplicationFormSection name="Additional Information">
      <Grid container rowSpacing={{ xs: 1, sm: 2 }} columnSpacing={1}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`personalInfo.additionalInfo.desiredSalary`}
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                label={translateUi(
                  'ui.sections.hiring.candidate.job_application.desired_salary_f683579b',
                )}
                fullWidth
                value={field.value && currencyFormat(field.value, { maximumFractionDigits: 0 })}
                error={!!errors.personalInfo?.additionalInfo?.desiredSalary}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9.]/g, '');
                  field.onChange(rawValue ? Number(rawValue) : '');
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={translateUi('ui.sections.hiring.candidate.job_application.referred_by_433a5789')}
            fullWidth
            error={!!errors.personalInfo?.additionalInfo?.refferedBy}
            helperText={errors.personalInfo?.additionalInfo?.refferedBy?.message}
            {...register('personalInfo.additionalInfo.refferedBy')}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label={translateUi(
              'ui.sections.hiring.candidate.job_application.website_portfolio_264ae133',
            )}
            fullWidth
            error={!!errors.personalInfo?.additionalInfo?.website}
            helperText={errors.personalInfo?.additionalInfo?.website?.message}
            {...register('personalInfo.additionalInfo.website')}
          />
        </Grid>
      </Grid>
    </ApplicationFormSection>
  );
};

export default AdditionalInfo;
