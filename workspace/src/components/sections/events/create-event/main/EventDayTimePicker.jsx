import { Controller } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';

const EventDayTimePicker = ({ dayLabel, startTimeName, endTimeName, errors, control }) => (
  <Grid
    container
    spacing={1}
    sx={{
      alignItems: 'center',
    }}
  >
    <Grid size={2}>
      <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
        {dayLabel}
        <Box component="span" sx={{ color: 'error.main', ml: '2px' }}>
          *
        </Box>
      </Typography>
    </Grid>

    <Grid size={5}>
      <Controller
        control={control}
        name={startTimeName}
        render={({ field }) => (
          <TimePicker
            label={i18n.t('ui.sections.events.create_event.main.start_time_88d8206d')}
            value={dayjs(field.value) ?? null}
            onChange={field.onChange}
            slotProps={{
              inputAdornment: {
                position: 'start',
              },
              textField: {
                error: !!errors[startTimeName],
                helperText: errors[startTimeName]?.message,
              },
            }}
          />
        )}
      />
    </Grid>

    <Grid size={5}>
      <Controller
        control={control}
        name={endTimeName}
        render={({ field }) => (
          <TimePicker
            label={i18n.t('ui.sections.events.create_event.main.end_time_cd7800da')}
            value={dayjs(field.value) ?? null}
            onChange={field.onChange}
            slotProps={{
              inputAdornment: {
                position: 'start',
              },
              textField: {
                error: !!errors[endTimeName],
                helperText: errors[endTimeName]?.message,
              },
            }}
          />
        )}
      />
    </Grid>
  </Grid>
);

export default EventDayTimePicker;
