import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Divider,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  inputBaseClasses,
} from '@mui/material';
import { eventCategories } from 'data/calendar';
import dayjs from 'dayjs';
import EventDateTimePicker from 'components/sections/calendar/EventDialog/EventDateTimePicker';
import EventDetailsSection from 'components/sections/calendar/EventDialog/EventDetailsSection';
import StyledTextField from 'components/styled/StyledTextField';

const CalendarEventForm = () => {
  const { t: translateUi } = useTranslation();
  const methods = useFormContext();
  const { register, control, watch, setValue, formState } = methods;
  const { errors } = formState;
  const isAllDay = watch('allDay');
  const eventType = watch('eventType');
  const [originalStartTime, setOriginalStartTime] = useState(null);
  const [originalEndTime, setOriginalEndTime] = useState(null);
  const handleAllDayChange = (checked) => {
    const currentStart = watch('start');
    const currentEnd = watch('end');
    const startString = dayjs(currentStart).toISOString();
    const endString = dayjs(currentEnd).toISOString();
    if (checked) {
      setOriginalStartTime(startString);
      setOriginalEndTime(endString);
      setValue('start', dayjs(currentStart).startOf('day').toISOString());
      setValue('end', dayjs(currentEnd).add(1, 'day').startOf('day').toISOString());
    } else {
      if (originalStartTime && originalEndTime) {
        setValue('start', originalStartTime);
        setValue('end', originalEndTime);
      } else {
        setValue('start', dayjs(currentStart).hour(0).minute(0).second(0).toISOString());
        setValue(
          'end',
          dayjs(currentEnd).subtract(1, 'day').hour(23).minute(59).second(59).toISOString(),
        );
      }
    }
    setValue('allDay', checked);
  };
  return (
    <Stack divider={<Divider sx={{ opacity: 0.4 }} />} sx={{ gap: 3, mb: 3, pl: 0.5 }}>
      <Stack sx={{ gap: 2 }}>
        <StyledTextField
          fullWidth
          label={translateUi(
            'ui.sections.calendar.eventdialog.calendareventform.event_title_072cbaea',
          )}
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register('title')}
        />
        <Stack
          direction="row"
          sx={{
            gap: 1,
            width: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Controller
            name="allDay"
            control={control}
            render={({ field: { value } }) => (
              <FormControlLabel
                control={
                  <Switch checked={value} onChange={(e) => handleAllDayChange(e.target.checked)} />
                }
                label={translateUi(
                  'ui.sections.calendar.eventdialog.calendareventform.all_day_event_63bee735',
                )}
                sx={{ gap: 1.5, mx: 0, mb: 1, width: 1 }}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                label={translateUi(
                  'ui.sections.calendar.eventdialog.calendareventform.event_category_4b4708b5',
                )}
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {eventCategories.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{
                      maxWidth: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        gap: 1.5,
                        alignItems: 'center',
                        width: '100%',
                        minWidth: 0,
                      }}
                    >
                      <Box
                        sx={(theme) => ({
                          width: 12,
                          height: 12,
                          borderRadius: 0.5,
                          bgcolor: theme.vars.palette[option.color].main,
                          flexShrink: 0,
                        })}
                      />
                      <Box
                        component="span"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          minWidth: 0,
                        }}
                      >
                        {option.label}
                      </Box>
                    </Stack>
                  </MenuItem>
                ))}
              </StyledTextField>
            )}
          />
        </Stack>

        <EventDateTimePicker
          name="start"
          label={translateUi('ui.sections.calendar.eventdialog.calendareventform.start_952f3754')}
          isAllDay={isAllDay}
          errors={errors}
        />
        <EventDateTimePicker
          name="end"
          label={translateUi('ui.sections.calendar.eventdialog.calendareventform.end_a2bb9d34')}
          isAllDay={isAllDay}
          errors={errors}
        />
      </Stack>
      <EventDetailsSection eventType={eventType} errors={errors} />
      <StyledTextField
        fullWidth
        label={translateUi('ui.sections.calendar.eventdialog.calendareventform.add_note_757092db')}
        multiline
        rows={3}
        sx={{
          [`& .${inputBaseClasses.root}`]: {
            py: 0.5,
            [`& .${inputBaseClasses.input}`]: {
              py: 0.5,
              px: '10px !important',
            },
          },
        }}
        {...register('description')}
      />
    </Stack>
  );
};
export default CalendarEventForm;
