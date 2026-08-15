import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Divider,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  inputBaseClasses,
} from '@mui/material';
import dayjs from 'dayjs';
import EventDateTimePicker from 'components/sections/calendar/EventDialog/EventDateTimePicker';
import StyledTextField from 'components/styled/StyledTextField';

const CalendarTaskForm = () => {
  const { t: translateUi } = useTranslation();
  const methods = useFormContext();
  const { register, control, watch, setValue, formState } = methods;
  const { errors } = formState;
  const [originalStartTime, setOriginalStartTime] = useState(null);
  const [originalEndTime, setOriginalEndTime] = useState(null);
  const isAllDay = watch('allDay');
  const handleAllDayChange = (checked) => {
    const currentStart = watch('start');
    let currentEnd = watch('end');
    if (!currentEnd || dayjs(currentEnd).isSame(dayjs(currentStart))) {
      currentEnd = dayjs(currentStart).hour(23).minute(59).second(59).toISOString();
    }
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
      <StyledTextField
        fullWidth
        label={translateUi('ui.sections.calendar.eventdialog.calendartaskform.task_title_b89d3300')}
        {...register('title', { required: 'Task title is required' })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <Stack sx={{ gap: 2 }}>
        <Controller
          name="selectedList"
          control={control}
          render={({ field }) => (
            <StyledTextField
              fullWidth
              label={translateUi(
                'ui.sections.calendar.eventdialog.calendartaskform.select_list_8859a478',
              )}
              select
              error={!!errors.selectedList}
              helperText={errors.selectedList?.message}
              {...field}
              value={field.value || ''}
            >
              <MenuItem value="personal">
                {translateUi('ui.sections.calendar.eventdialog.calendartaskform.personal_40f07323')}
              </MenuItem>
              <MenuItem value="work">
                {translateUi('ui.sections.calendar.eventdialog.calendartaskform.work_00040bab')}
              </MenuItem>
              <MenuItem value="family">
                {translateUi('ui.sections.calendar.eventdialog.calendartaskform.family_4efb6cb7')}
              </MenuItem>
              <MenuItem value="development">
                {translateUi('ui.sections.calendar.eventdialog.calendartaskform.school_f2f3d66a')}
              </MenuItem>
              <MenuItem value="other">
                {translateUi('ui.sections.calendar.eventdialog.calendartaskform.other_6e6a6f20')}
              </MenuItem>
            </StyledTextField>
          )}
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
                  'ui.sections.calendar.eventdialog.calendartaskform.all_day_task_dd369109',
                )}
                sx={{ gap: 1.5, mx: 0, mb: 1, width: 1 }}
              />
            )}
          />
          <Controller
            name="repeated"
            control={control}
            render={({ field }) => (
              <StyledTextField
                fullWidth
                label={translateUi(
                  'ui.sections.calendar.eventdialog.calendartaskform.repeat_task_d888c961',
                )}
                select
                error={!!errors.repeated}
                helperText={errors.repeated?.message}
                {...field}
                value={field.value || ''}
              >
                <MenuItem value="none">
                  {translateUi(
                    'ui.sections.calendar.eventdialog.calendartaskform.does_not_repeat_69f96c81',
                  )}
                </MenuItem>
                <MenuItem value="daily">
                  {translateUi('ui.sections.calendar.eventdialog.calendartaskform.daily_728298d3')}
                </MenuItem>
                <MenuItem value="weekly">
                  {translateUi(
                    'ui.sections.calendar.eventdialog.calendartaskform.weekly_on_selected_day_e3daff62',
                  )}
                </MenuItem>
                <MenuItem value="monthly">
                  {translateUi(
                    'ui.sections.calendar.eventdialog.calendartaskform.monthly_on_selected_date_d1597a2e',
                  )}
                </MenuItem>
                <MenuItem value="annually">
                  {translateUi(
                    'ui.sections.calendar.eventdialog.calendartaskform.annually_on_selected_date_cb0fccb0',
                  )}
                </MenuItem>
                <MenuItem value="custom">
                  {translateUi('ui.sections.calendar.eventdialog.calendartaskform.custom_cfca17d0')}
                </MenuItem>
              </StyledTextField>
            )}
          />
        </Stack>
      </Stack>
      <Stack sx={{ gap: 2 }}>
        <EventDateTimePicker
          name="start"
          label={translateUi('ui.sections.calendar.eventdialog.calendartaskform.start_952f3754')}
          isAllDay={isAllDay}
          errors={errors}
        />
        <EventDateTimePicker
          name="end"
          label={translateUi('ui.sections.calendar.eventdialog.calendartaskform.end_a2bb9d34')}
          isAllDay={isAllDay}
          errors={errors}
        />
      </Stack>
      <StyledTextField
        fullWidth
        label={translateUi(
          'ui.sections.calendar.eventdialog.calendartaskform.add_descripton_43487c59',
        )}
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
export default CalendarTaskForm;
