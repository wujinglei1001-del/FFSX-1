import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconButton, Stack, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import IconifyIcon from 'components/base/IconifyIcon';

const TimeSlotControl = ({ dayIndex, slotIndex, slotId, disabled, onTimeChange, onRemoveSlot }) => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();
  return (
    <Stack key={slotId} direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Controller
        name={`availability.${dayIndex}.timeSlots.${slotIndex}.start`}
        control={control}
        render={({ field, fieldState }) => (
          <TimePicker
            ampm={false}
            slotProps={{
              textField: {
                variant: 'filled',
                size: 'small',
                fullWidth: true,
                error: !!fieldState.error,
              },
            }}
            value={field.value ? dayjs(field.value, 'HH:mm') : null}
            onChange={(newValue) => {
              const formatted = newValue ? dayjs(newValue).format('HH:mm') : '';
              field.onChange(formatted);
              onTimeChange(dayIndex, slotIndex, 'start', formatted);
            }}
          />
        )}
      />
      <Typography variant="subtitle2">{translateUi('common.to')}</Typography>
      <Controller
        name={`availability.${dayIndex}.timeSlots.${slotIndex}.end`}
        control={control}
        render={({ field, fieldState }) => (
          <TimePicker
            ampm={false}
            slotProps={{
              textField: {
                variant: 'filled',
                size: 'small',
                fullWidth: true,
                error: !!fieldState.error,
              },
            }}
            value={field.value ? dayjs(field.value, 'HH:mm') : null}
            onChange={(newValue) => {
              const formatted = newValue ? dayjs(newValue).format('HH:mm') : '';
              field.onChange(formatted);
              onTimeChange(dayIndex, slotIndex, 'end', formatted);
            }}
          />
        )}
      />
      <IconButton size="small" onClick={() => onRemoveSlot(slotId)} disabled={disabled}>
        <IconifyIcon icon="material-symbols:remove-rounded" color="text.primary" />
      </IconButton>
    </Stack>
  );
};
export default TimeSlotControl;
