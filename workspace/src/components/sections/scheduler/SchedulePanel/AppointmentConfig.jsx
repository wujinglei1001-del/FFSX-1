import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Stack,
  Switch,
  Typography,
  inputBaseClasses,
} from '@mui/material';
import NumberTextField from 'components/base/NumberTextField';
import SettingsToggle from 'components/sections/scheduler/SettingsToggle';
import StyledTextField from 'components/styled/StyledTextField';

const AppointmentConfig = () => {
  const { t: translateUi } = useTranslation();
  const { control, watch, setValue } = useFormContext();

  const bufferTime = watch('config.bufferTime');
  const maxBookingsPerDay = watch('config.maxBookingsPerDay');

  return (
    <SettingsToggle
      title={translateUi(
        'ui.sections.scheduler.schedulepanel.appointmentconfig.appointment_settings_b0e2d97d',
      )}
      icon="material-symbols:event-available-outline"
      defaultOpen
    >
      <FormControl sx={{ gap: 2 }}>
        <FormGroup sx={{ gap: 1 }}>
          <FormControlLabel
            control={
              <Controller
                name="config.bufferTimeEnabled"
                control={control}
                render={({ field }) => (
                  <Switch
                    size="small"
                    checked={bufferTime > 0}
                    {...field}
                    onChange={(e) => setValue('config.bufferTime', e.target.checked ? 5 : 0)}
                  />
                )}
              />
            }
            label={
              <Typography variant="subtitle2">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.appointmentconfig.buffer_time_7e719d21',
                )}
              </Typography>
            }
            sx={{ mx: 0, gap: 1 }}
          />
          <Stack direction="row" sx={{ gap: 1, ml: 5 }}>
            <Controller
              name="config.bufferTime"
              control={control}
              render={({ field }) => (
                <NumberTextField
                  variant="custom"
                  disabled={bufferTime === 0}
                  sx={{
                    maxWidth: 80,
                    [`& .${inputBaseClasses.input}`]: { textAlign: 'center' },
                  }}
                  {...field}
                />
              )}
            />
            <Controller
              name="config.bufferTimeUnit"
              control={control}
              render={({ field }) => (
                <StyledTextField select {...field} disabled={bufferTime === 0}>
                  <MenuItem value="minutes">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.appointmentconfig.minutes_092f99ea',
                    )}
                  </MenuItem>
                  <MenuItem value="hr">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.appointmentconfig.hour_c37cf838',
                    )}
                  </MenuItem>
                  <MenuItem value="day">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.appointmentconfig.day_987b9ced',
                    )}
                  </MenuItem>
                </StyledTextField>
              )}
            />
          </Stack>
        </FormGroup>

        <FormGroup sx={{ gap: 1 }}>
          <FormControlLabel
            control={
              <Controller
                name="config.maxBookingsPerDayEnabled"
                control={control}
                render={({ field }) => (
                  <Switch
                    size="small"
                    checked={maxBookingsPerDay > 0}
                    {...field}
                    onChange={(e) => setValue('config.maxBookingsPerDay', e.target.checked ? 1 : 0)}
                  />
                )}
              />
            }
            label={
              <Typography variant="subtitle2">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.appointmentconfig.maximum_booking_per_day_8cffdcd1',
                )}
              </Typography>
            }
            sx={{ mx: 0, gap: 1 }}
          />
          <Controller
            name="config.maxBookingsPerDay"
            control={control}
            render={({ field }) => (
              <NumberTextField
                variant="custom"
                fullWidth
                disabled={maxBookingsPerDay === 0}
                sx={{
                  ml: 5,
                  maxWidth: 80,
                  [`& .${inputBaseClasses.input}`]: { textAlign: 'center' },
                }}
                {...field}
              />
            )}
          />
        </FormGroup>

        <FormGroup sx={{ gap: 1 }}>
          <Controller
            name="config.canInviteOthers"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch size="small" {...field} />}
                label={
                  <Typography variant="subtitle2">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.appointmentconfig.guests_can_invite_others_a9813d83',
                    )}
                  </Typography>
                }
                sx={{ mx: 0, gap: 1 }}
              />
            )}
          />
        </FormGroup>
      </FormControl>
    </SettingsToggle>
  );
};

export default AppointmentConfig;
