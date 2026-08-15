import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControl, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import AvailabilityDayRow from 'components/sections/scheduler/SchedulePanel/AvaibilityDayRow';
import { useAvailabilityConfig } from 'components/sections/scheduler/SchedulePanel/useAvailiabilityConfig';
import SettingsToggle from 'components/sections/scheduler/SettingsToggle';
import StyledTextField from 'components/styled/StyledTextField';

const AvailabilityConfig = ({ onAddSlot, onUpdateSlot, onRemoveSlot }) => {
  const { t: translateUi } = useTranslation();
  const { availabilityFields, handleToggleDay, handleAddSlot, handleRemoveSlot, handleTimeChange } =
    useAvailabilityConfig(onAddSlot, onUpdateSlot, onRemoveSlot);

  const { control } = useFormContext();

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        times.push(dayjs().hour(hour).minute(minute).format('HH:mm'));
      }
    }

    return times;
  };

  const TIME_OPTIONS = generateTimeOptions();

  return (
    <SettingsToggle
      title={translateUi(
        'ui.sections.scheduler.schedulepanel.availabilityconfig.general_availability_0df031b8',
      )}
      icon="material-symbols:work-history-outline"
      defaultOpen
    >
      <FormControl sx={{ gap: 2, width: 1 }}>
        <Controller
          name="repeatedAppointment"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              fullWidth
              label={translateUi(
                'ui.sections.scheduler.schedulepanel.availabilityconfig.repeated_appointment_5730d091',
              )}
              select
            >
              <MenuItem value="none">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.availabilityconfig.does_not_repeat_69f96c81',
                )}
              </MenuItem>
              <MenuItem value="daily">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.availabilityconfig.repeated_daily_c46b884b',
                )}
              </MenuItem>
              <MenuItem value="weekly">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.availabilityconfig.repeated_weekly_c12749de',
                )}
              </MenuItem>
              <MenuItem value="monthly">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.availabilityconfig.repeated_monthly_909a6bbd',
                )}
              </MenuItem>
            </StyledTextField>
          )}
        />

        {availabilityFields.map((day, index) => (
          <AvailabilityDayRow
            key={day.id}
            dayIndex={index}
            day={day}
            onToggleDay={handleToggleDay}
            onAddSlot={handleAddSlot}
            onRemoveSlot={handleRemoveSlot}
            onTimeChange={handleTimeChange}
            timeOptions={TIME_OPTIONS}
          />
        ))}
      </FormControl>
    </SettingsToggle>
  );
};

export default AvailabilityConfig;
