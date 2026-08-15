import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, FormControlLabel, Stack, Switch } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountFormDialog from '../common/AccountFormDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const dateTimeSchema = yup.object().shape({
  dateTime: yup
    .string()
    .required(
      i18n.t('ui.sections.account.date_time.dateandtime.date_and_time_is_required_2db858c4'),
    ),
  options: yup.object().shape({
    setAutomatically: yup.boolean().required(),
    _24hoursTime: yup.boolean().required(),
    show24hoursTime: yup.boolean().required(),
  }),
});
const DateAndTime = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues: {
      dateTime: '2024-11-13 16:30:24',
      options: {
        setAutomatically: false,
        _24hoursTime: false,
        show24hoursTime: false,
      },
    },
    resolver: yupResolver(dateTimeSchema),
  });
  const {
    control,
    getValues,
    formState: { errors },
  } = methods;
  const { dateTime } = getValues();
  const onSubmit = (data) => {
    console.log({ data });
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success' });
  };
  return (
    <FormProvider {...methods}>
      <InfoCard setOpen={setOpen} sx={{ mb: 3 }}>
        <Stack sx={{ gap: 1 }}>
          <InfoCardAttribute
            label={translateUi('ui.sections.account.date_time.dateandtime.date_and_time_07c9c3a5')}
            value={dayjs(dateTime).format('MMM D, YYYY [a]t h:mm:ss A')}
          />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>
      <AccountFormDialog
        title={translateUi('ui.sections.account.date_time.dateandtime.set_date_and_time_4caf4eb2')}
        subtitle={translateUi(
          'ui.sections.account.date_time.dateandtime.adjust_date_time_and_time_zone_settings_to_ensure_ac_309409b9',
        )}
        open={open}
        onSubmit={onSubmit}
        handleDialogClose={() => setOpen(false)}
        sx={{
          maxWidth: 463,
        }}
      >
        <Stack sx={{ gap: 1 }}>
          <Controller
            control={control}
            name="dateTime"
            render={({ field: { value, onChange, ...rest } }) => (
              <MobileDateTimePicker
                label={translateUi(
                  'ui.sections.account.date_time.dateandtime.select_date_time_eba09500',
                )}
                value={dayjs(value)}
                onChange={(value) => onChange(value?.format('YYYY-MM-DD H:mm:ss'))}
                slotProps={{
                  textField: {
                    variant: 'filled',
                    error: !!errors.dateTime,
                    helperText: errors.dateTime?.message,
                    fullWidth: true,
                  },
                }}
                sx={{ pb: 0.125 }}
                {...rest}
              />
            )}
          />
        </Stack>
      </AccountFormDialog>
      <FormControl component="fieldset" sx={{ gap: 2 }}>
        <Controller
          control={control}
          name="options.setAutomatically"
          render={({ field }) => (
            <FormControlLabel
              control={<Switch checked={field.value} {...field} />}
              label={translateUi(
                'ui.sections.account.date_time.dateandtime.set_time_and_date_automatically_2365972a',
              )}
              sx={{ gap: 2, ml: 0 }}
            />
          )}
        />
        <Controller
          control={control}
          name="options._24hoursTime"
          render={({ field }) => (
            <FormControlLabel
              control={<Switch checked={field.value} {...field} />}
              label={translateUi(
                'ui.sections.account.date_time.dateandtime.24_hours_time_5fcae762',
              )}
              sx={{ gap: 2, ml: 0 }}
            />
          )}
        />
        <Controller
          control={control}
          name="options.show24hoursTime"
          render={({ field }) => (
            <FormControlLabel
              control={<Switch checked={field.value} {...field} />}
              label={translateUi(
                'ui.sections.account.date_time.dateandtime.show_24_hour_time_on_lock_screen_b86eb6f8',
              )}
              sx={{ gap: 2, ml: 0 }}
            />
          )}
        />
      </FormControl>
    </FormProvider>
  );
};
export default DateAndTime;
