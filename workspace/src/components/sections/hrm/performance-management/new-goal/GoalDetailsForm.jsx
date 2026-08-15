import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const GoalDetailsForm = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack
      sx={{
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
        }}
      >
        {translateUi('ui.sections.hrm.performance_management.new_goal.goal_details_e3b10c39')}
      </Typography>
      <Grid container spacing={1}>
        <Grid size={12}>
          <TextField
            label={translateUi(
              'ui.sections.hrm.performance_management.new_goal.goal_name_19caf143',
            )}
            fullWidth
            error={!!errors.goalDetails?.name}
            helperText={errors.goalDetails?.name?.message}
            {...register('goalDetails.name')}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label={translateUi(
              'ui.sections.hrm.performance_management.new_goal.short_description_e090d537',
            )}
            multiline
            rows={3}
            fullWidth
            error={!!errors.goalDetails?.description}
            helperText={errors.goalDetails?.description?.message}
            {...register('goalDetails.description')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid size={6}>
          <Controller
            control={control}
            name="goalDetails.startDate"
            render={({ field: { value, onChange, ...rest } }) => (
              <DatePicker
                label={translateUi(
                  'ui.sections.hrm.performance_management.new_goal.start_date_9d7ab1a5',
                )}
                value={dayjs(value)}
                onChange={(date) => onChange(date)}
                slotProps={{
                  textField: {
                    error: !!errors.goalDetails?.startDate,
                    helperText: errors.goalDetails?.startDate?.message,
                    fullWidth: true,
                  },
                  inputAdornment: {
                    position: 'start',
                  },
                }}
                {...rest}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="goalDetails.dueDate"
            render={({ field: { value, onChange, ...rest } }) => (
              <DatePicker
                label={translateUi(
                  'ui.sections.hrm.performance_management.new_goal.due_date_a1b308ec',
                )}
                value={dayjs(value)}
                onChange={(date) => onChange(date)}
                slotProps={{
                  textField: {
                    error: !!errors.goalDetails?.dueDate,
                    helperText: errors.goalDetails?.dueDate?.message,
                    fullWidth: true,
                  },
                  inputAdornment: {
                    position: 'start',
                  },
                }}
                {...rest}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label={translateUi('ui.sections.hrm.performance_management.new_goal.status_bae7d5be')}
            fullWidth
            defaultValue="High"
            select
            error={!!errors.goalDetails?.status}
            helperText={errors.goalDetails?.status?.message}
            {...register('goalDetails.status')}
          >
            <MenuItem value="High">
              {translateUi('ui.sections.hrm.performance_management.new_goal.high_b1a5954a')}
            </MenuItem>
            <MenuItem value="Medium">
              {translateUi('ui.sections.hrm.performance_management.new_goal.medium_d404968e')}
            </MenuItem>
            <MenuItem value="Low">
              {translateUi('ui.sections.hrm.performance_management.new_goal.low_a124947c')}
            </MenuItem>
            <MenuItem value="In Progress">
              {translateUi('ui.sections.hrm.performance_management.new_goal.in_progress_f61eadaf')}
            </MenuItem>
            <MenuItem value="Delayed">
              {translateUi('ui.sections.hrm.performance_management.new_goal.delayed_cc6e7b6a')}
            </MenuItem>
            <MenuItem value="Hold">
              {translateUi('ui.sections.hrm.performance_management.new_goal.hold_3bd32832')}
            </MenuItem>
            <MenuItem value="At Risk">
              {translateUi('ui.sections.hrm.performance_management.new_goal.at_risk_b7a67661')}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={6}>
          <TextField
            label={translateUi('ui.sections.hrm.performance_management.new_goal.priority_886cbff9')}
            fullWidth
            defaultValue="High"
            select
            error={!!errors.goalDetails?.priority}
            helperText={errors.goalDetails?.priority?.message}
            {...register('goalDetails.priority')}
          >
            <MenuItem value="High">
              {translateUi('ui.sections.hrm.performance_management.new_goal.high_b1a5954a')}
            </MenuItem>
            <MenuItem value="Medium">
              {translateUi('ui.sections.hrm.performance_management.new_goal.medium_d404968e')}
            </MenuItem>
            <MenuItem value="Low">
              {translateUi('ui.sections.hrm.performance_management.new_goal.low_a124947c')}
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Stack>
  );
};
export default GoalDetailsForm;
