import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { countries } from 'data/countries';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import CountrySelect from 'components/common/CountrySelect';

export const addressSchema = yup.object({
  permanent: yup.object({
    country: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.country_is_required_66a0de60')),
    state: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.state_is_required_63e36a8e')),
    city: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.city_is_required_2b1145f8')),
    street: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.street_is_required_6745ff51')),
    zip: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.zip_code_is_required_d5bb6eb0')),
  }),
  present: yup.object({
    country: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.country_is_required_66a0de60')),
    state: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.state_is_required_63e36a8e')),
    city: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.city_is_required_2b1145f8')),
    street: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.street_is_required_6745ff51')),
    zip: yup
      .string()
      .required(i18n.t('ui.sections.member.new_member.steps.zip_code_is_required_d5bb6eb0')),
  }),
  isSameAddress: yup.boolean().required(),
});
const Address = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const { isSameAddress, permanent } = watch();
  useEffect(() => {
    if (isSameAddress) {
      setValue('present', permanent, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue('present', {
        country: '',
        state: '',
        city: '',
        street: '',
        zip: '',
      });
    }
  }, [isSameAddress, permanent, setValue]);
  return (
    <Stack
      sx={{
        gap: 4,
      }}
    >
      <Stack
        sx={{
          gap: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>
          {translateUi('ui.sections.member.new_member.steps.permanent_address_b1bfe9e9')}
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid size={6}>
            <Controller
              name="permanent.country"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CountrySelect
                  sx={{ mb: 1 }}
                  fullWidth
                  onChange={(_, value) => onChange(value ? value.label : '')}
                  value={countries.find((country) => country.label === value) || null}
                  renderInput={(params) => (
                    <TextField
                      label={translateUi('ui.sections.member.new_member.steps.country_d523ebbd')}
                      error={!!errors.permanent?.country?.message}
                      helperText={errors.permanent?.country?.message}
                      {...params}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label={translateUi('ui.sections.member.new_member.steps.state_a7250206')}
              error={!!errors.permanent?.state}
              helperText={errors.permanent?.state?.message}
              {...register('permanent.state')}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label={translateUi('ui.sections.member.new_member.steps.city_4271627f')}
              error={!!errors.permanent?.city}
              helperText={errors.permanent?.city?.message}
              {...register('permanent.city')}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label={translateUi('ui.sections.member.new_member.steps.street_b4541099')}
              error={!!errors.permanent?.street}
              helperText={errors.permanent?.street?.message}
              {...register('permanent.street')}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label={translateUi('ui.sections.member.new_member.steps.zip_aec742c8')}
              error={!!errors.permanent?.zip}
              helperText={errors.permanent?.zip?.message}
              {...register('permanent.zip')}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack
        sx={{
          gap: 1,
        }}
      >
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 600 }}>
            {translateUi('ui.sections.member.new_member.steps.present_address_898a440b')}
          </Typography>
          <Controller
            name="isSameAddress"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} {...field} />}
                label={translateUi(
                  'ui.sections.member.new_member.steps.same_as_permanent_8f092d1b',
                )}
              />
            )}
          />
        </Stack>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid size={6}>
            <Controller
              name="present.country"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CountrySelect
                  sx={{ mb: 1 }}
                  fullWidth
                  disabled={isSameAddress}
                  onChange={(_, value) => onChange(value ? value.label : '')}
                  value={countries.find((country) => country.label === value) || null}
                  renderInput={(params) => (
                    <TextField
                      label={translateUi('ui.sections.member.new_member.steps.country_d523ebbd')}
                      error={!!errors.present?.country?.message}
                      helperText={errors.present?.country?.message}
                      {...params}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="present.state"
              render={({ field }) => (
                <TextField
                  fullWidth
                  disabled={isSameAddress}
                  label={translateUi('ui.sections.member.new_member.steps.state_a7250206')}
                  error={!!errors.present?.state}
                  helperText={errors.present?.state?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="present.city"
              render={({ field }) => (
                <TextField
                  fullWidth
                  disabled={isSameAddress}
                  label={translateUi('ui.sections.member.new_member.steps.city_4271627f')}
                  error={!!errors.present?.city}
                  helperText={errors.present?.city?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="present.street"
              render={({ field }) => (
                <TextField
                  fullWidth
                  disabled={isSameAddress}
                  label={translateUi('ui.sections.member.new_member.steps.street_b4541099')}
                  error={!!errors.present?.street}
                  helperText={errors.present?.street?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="present.zip"
              render={({ field }) => (
                <TextField
                  fullWidth
                  disabled={isSameAddress}
                  label={translateUi('ui.sections.member.new_member.steps.zip_aec742c8')}
                  error={!!errors.present?.zip}
                  helperText={errors.present?.zip?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};
export default Address;
