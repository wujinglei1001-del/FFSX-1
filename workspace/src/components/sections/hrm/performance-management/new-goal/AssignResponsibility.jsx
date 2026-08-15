import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const AssignResponsibility = () => {
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
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            flexGrow: 1,
          }}
        >
          {translateUi(
            'ui.sections.hrm.performance_management.new_goal.assign_responsibility_f0a071fd',
          )}
        </Typography>
        <Controller
          control={control}
          name="assignResponsibility.mode"
          render={({ field }) => (
            <RadioGroup row sx={{ gap: 3 }} {...field}>
              <FormControlLabel
                label={translateUi(
                  'ui.sections.hrm.performance_management.new_goal.single_dd118689',
                )}
                value="single"
                control={<Radio />}
                sx={{
                  mr: 0,
                }}
              />
              <FormControlLabel
                label={translateUi('ui.sections.hrm.performance_management.new_goal.bulk_d82f3b97')}
                value="bulk"
                control={<Radio />}
                sx={{
                  mr: 0,
                }}
              />
            </RadioGroup>
          )}
        />
      </Stack>
      <Grid container columnSpacing={1} rowSpacing={2}>
        <Grid size={6}>
          <TextField
            label={translateUi(
              'ui.sections.hrm.performance_management.new_goal.department_db40106a',
            )}
            fullWidth
            defaultValue="Engineering"
            select
            error={!!errors.assignResponsibility?.department}
            helperText={errors.assignResponsibility?.department?.message}
            {...register('assignResponsibility.department')}
          >
            <MenuItem value="Engineering">
              {translateUi('ui.sections.hrm.performance_management.new_goal.engineering_4143d048')}
            </MenuItem>
            <MenuItem value="Design">
              {translateUi('ui.sections.hrm.performance_management.new_goal.design_59b03536')}
            </MenuItem>
            <MenuItem value="Support">
              {translateUi('ui.sections.hrm.performance_management.new_goal.support_f32d5a3b')}
            </MenuItem>
            <MenuItem value="Marketing">
              {translateUi('ui.sections.hrm.performance_management.new_goal.marketing_e0c534a0')}
            </MenuItem>
            <MenuItem value="HRM">HRM</MenuItem>
          </TextField>
        </Grid>
        <Grid size={6}>
          <TextField
            label={translateUi('ui.sections.hrm.performance_management.new_goal.team_21888726')}
            fullWidth
            defaultValue="Aurora"
            select
            error={!!errors.assignResponsibility?.team}
            helperText={errors.assignResponsibility?.team?.message}
            {...register('assignResponsibility.team')}
          >
            <MenuItem value="Aurora">
              {translateUi('ui.sections.hrm.performance_management.new_goal.aurora_eeee9b76')}
            </MenuItem>
            <MenuItem value="Falcon">
              {translateUi('ui.sections.hrm.performance_management.new_goal.falcon_63f5c347')}
            </MenuItem>
            <MenuItem value="Phoenix">
              {translateUi('ui.sections.hrm.performance_management.new_goal.phoenix_3e978fbf')}
            </MenuItem>
            <MenuItem value="HummingBird">
              {translateUi('ui.sections.hrm.performance_management.new_goal.hummingbird_e80efe6a')}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={6}>
          <TextField
            label={translateUi(
              'ui.sections.hrm.performance_management.new_goal.employee_job_titles_ce2b7e2b',
            )}
            fullWidth
            defaultValue="Frontend Developer"
            select
            error={!!errors.assignResponsibility?.jobTitle}
            helperText={errors.assignResponsibility?.jobTitle?.message}
            {...register('assignResponsibility.jobTitle')}
          >
            <MenuItem value="Frontend Developer">
              {translateUi(
                'ui.sections.hrm.performance_management.new_goal.frontend_developer_c56054b1',
              )}
            </MenuItem>
            <MenuItem value="QA Engineer">
              {translateUi('ui.sections.hrm.performance_management.new_goal.qa_engineer_0d309ac1')}
            </MenuItem>
            <MenuItem value="Data Analyst">
              {translateUi('ui.sections.hrm.performance_management.new_goal.data_analyst_c5923c83')}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={6}>
          <TextField
            label={translateUi(
              'ui.sections.hrm.performance_management.new_goal.additional_employee_2dc9e16c',
            )}
            fullWidth
            error={!!errors.assignResponsibility?.additionalEmployee}
            helperText={errors.assignResponsibility?.additionalEmployee?.message}
            {...register('assignResponsibility.additionalEmployee')}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AssignResponsibility;
