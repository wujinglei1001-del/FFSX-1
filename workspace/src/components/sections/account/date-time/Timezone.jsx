import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { closestCities, timezones } from 'data/account/date-time';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountFormDialog from '../common/AccountFormDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const timezoneSchema = yup.object().shape({
  autoSetTimeZone: yup.boolean().required(),
  timezone: yup
    .string()
    .required(i18n.t('ui.sections.account.date_time.timezone.timezone_is_required_7456f503')),
  closestCity: yup
    .string()
    .required(i18n.t('ui.sections.account.date_time.timezone.closest_city_is_required_c6936218')),
});

const Timezone = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues: {
      autoSetTimeZone: false,
      timezone: 'Eastern Standard Time',
      closestCity: 'Montreal, QC, Canada (GMT-5)',
    },
    resolver: yupResolver(timezoneSchema),
  });
  const {
    control,
    getValues,
    formState: { errors },
  } = methods;
  const { timezone, closestCity } = getValues();
  const onSubmit = (data) => {
    console.log({ data });
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success' });
  };

  return (
    <FormProvider {...methods}>
      <FormControl component="fieldset" sx={{ gap: 2, mb: 3 }}>
        <Controller
          control={control}
          name="autoSetTimeZone"
          render={({ field }) => (
            <FormControlLabel
              control={<Switch checked={field.value} {...field} />}
              label={translateUi(
                'ui.sections.account.date_time.timezone.auto_set_time_zone_based_on_location_f050c539',
              )}
              sx={{ gap: 2, ml: 0 }}
            />
          )}
        />
      </FormControl>
      <InfoCard setOpen={setOpen}>
        <Stack sx={{ gap: 1 }}>
          <InfoCardAttribute
            label={translateUi('ui.sections.account.date_time.timezone.time_zone_eea79afd')}
            value={timezone}
          />
          <InfoCardAttribute
            label={translateUi('ui.sections.account.date_time.timezone.closest_city_55634d9b')}
            value={closestCity}
          />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>
      <AccountFormDialog
        title={translateUi('ui.sections.account.date_time.timezone.set_regional_settings_c64ae2ee')}
        subtitle={translateUi(
          'ui.sections.account.date_time.timezone.set_your_time_zone_and_regional_preferences_to_match_b433378e',
        )}
        open={open}
        onSubmit={onSubmit}
        handleDialogClose={() => setOpen(false)}
        sx={{
          maxWidth: 463,
        }}
      >
        <Stack sx={{ gap: 1, p: 0.125 }}>
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <Autocomplete
                aria-labelledby="timezone-autocomplete-label"
                disablePortal
                options={timezones}
                {...field}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={translateUi('ui.sections.account.date_time.timezone.time_zone_a30e720c')}
                    placeholder={translateUi(
                      'ui.sections.account.date_time.timezone.select_time_zone_4e1b484e',
                    )}
                    error={!!errors.timezone}
                    helperText={errors.timezone?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="closestCity"
            control={control}
            render={({ field }) => (
              <Autocomplete
                aria-labelledby="closest-city-autocomplete-label"
                disablePortal
                options={closestCities}
                {...field}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={translateUi(
                      'ui.sections.account.date_time.timezone.closest_city_55634d9b',
                    )}
                    placeholder={translateUi(
                      'ui.sections.account.date_time.timezone.select_city_42303635',
                    )}
                    error={!!errors.closestCity}
                    helperText={errors.closestCity?.message}
                  />
                )}
              />
            )}
          />
        </Stack>
      </AccountFormDialog>
    </FormProvider>
  );
};

export default Timezone;
