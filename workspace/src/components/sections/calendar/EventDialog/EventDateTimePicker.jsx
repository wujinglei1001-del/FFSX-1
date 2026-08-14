import { Controller, useFormContext } from 'react-hook-form';
import { Grid, inputBaseClasses } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const EventDateTimePicker = ({ name, label, isAllDay, errors }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Grid container spacing={1}>
          <Grid size={{ xs: 6, sm: 8 }}>
            <DatePicker
              label={`${label} Date`}
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date ? date.toDate() : null)}
              slotProps={{
                textField: {
                  variant: 'filled',
                  fullWidth: true,
                  error: !!errors[name],
                  helperText: errors[name]?.message,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <TimePicker
              label={`${label} Time`}
              disabled={isAllDay}
              value={dayjs(value)}
              onChange={(time) => onChange(time ? time.toDate() : null)}
              slotProps={{
                textField: {
                  variant: 'filled',
                  fullWidth: true,
                  error: !!errors[name],
                  sx: {
                    [`& .${inputBaseClasses.input}`]: {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      )}
    />
  );
};
export default EventDateTimePicker;
