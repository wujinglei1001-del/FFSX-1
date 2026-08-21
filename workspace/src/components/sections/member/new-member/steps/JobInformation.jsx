import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import * as yup from 'yup';

export const jobInformationSchema = yup.object({
  designation: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.designation_is_required_183fefe6')),
  joiningDate: yup
    .date()
    .required(i18n.t('ui.sections.member.new_member.steps.joining_date_is_required_da5c3f3b')),
  department: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.department_is_required_0c4a29d6')),
  team: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.team_is_required_dd76bf76')),
  branch: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.branch_is_required_a3ca29d7')),
  shift: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.shift_is_required_c69eddf1')),
  supervisor: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.supervisor_is_required_2bd19b0c')),
  employmentStatus: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.status_is_required_d88cae16')),
  employmentType: yup
    .string()
    .oneOf(['in-office', 'hybrid', 'remote'])
    .required(i18n.t('ui.sections.member.new_member.steps.type_is_required_7adad2bb')),
});
const JobInformation = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack
      sx={{
        gap: 3,
      }}
    >
      <Grid container rowSpacing={2} columnSpacing={1}>
        <Grid size={6}>
          <TextField
            fullWidth
            label={translateUi('ui.sections.member.new_member.steps.designation_b2797c75')}
            error={!!errors.designation}
            helperText={errors.designation?.message}
            {...register('designation')}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="joiningDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label={translateUi('ui.sections.member.new_member.steps.joining_date_a94e7880')}
                value={field.value ? dayjs(field.value) : null}
                onChange={(val) => field.onChange(dayjs(val?.toDate()).format('MM/DD/YYYY'))}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.joiningDate,
                    helperText: errors.joiningDate?.message,
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            select
            fullWidth
            label={translateUi('ui.sections.member.new_member.steps.department_db40106a')}
            error={!!errors.department}
            defaultValue=""
            helperText={errors.department?.message}
            {...register('department')}
          >
            <MenuItem value="" disabled>
              {translateUi('ui.sections.member.new_member.steps.select_85982229')}
            </MenuItem>
            <MenuItem value="Design">
              {translateUi('ui.sections.member.new_member.steps.design_59b03536')}
            </MenuItem>
            <MenuItem value="Engineering">
              {translateUi('ui.sections.member.new_member.steps.engineering_4143d048')}
            </MenuItem>
            <MenuItem value="Marketing">
              {translateUi('ui.sections.member.new_member.steps.marketing_e0c534a0')}
            </MenuItem>
            <MenuItem value="Support">
              {translateUi('ui.sections.member.new_member.steps.support_f32d5a3b')}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={6}>
          <TextField
            select
            fullWidth
            label={translateUi('ui.sections.member.new_member.steps.team_21888726')}
            error={!!errors.team}
            defaultValue=""
            helperText={errors.team?.message}
            {...register('team')}
          >
            <MenuItem value="" disabled>
              {translateUi('ui.sections.member.new_member.steps.select_85982229')}
            </MenuItem>
            <MenuItem value="FFA-X">
              {translateUi('ui.sections.member.new_member.steps.themewagon_4ba48b41')}
            </MenuItem>
            <MenuItem value="Mailbluster">
              {translateUi('ui.sections.member.new_member.steps.mailbluster_0d51e6c7')}
            </MenuItem>
            <MenuItem value="Blackbox">
              {translateUi('ui.sections.member.new_member.steps.blackbox_78246761')}
            </MenuItem>
            <MenuItem value="Hyperninja">
              {translateUi('ui.sections.member.new_member.steps.hyperninja_86aeb854')}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={6}>
          <TextField
            select
            fullWidth
            label={translateUi('ui.sections.member.new_member.steps.branch_1627510b')}
            error={!!errors.branch}
            defaultValue=""
            helperText={errors.branch?.message}
            {...register('branch')}
          >
            <MenuItem value="" disabled>
              {translateUi('ui.sections.member.new_member.steps.select_85982229')}
            </MenuItem>
            <MenuItem value="Sylhet">
              {translateUi('ui.sections.member.new_member.steps.sylhet_f97c15f8')}
            </MenuItem>
            <MenuItem value="Dhaka">
              {translateUi('ui.sections.member.new_member.steps.dhaka_49df2925')}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={6}>
          <TextField
            select
            fullWidth
            label={translateUi('ui.sections.member.new_member.steps.shift_469d5b18')}
            defaultValue=""
            error={!!errors.shift}
            helperText={errors.shift?.message}
            {...register('shift')}
          >
            <MenuItem value="" disabled>
              {translateUi('ui.sections.member.new_member.steps.select_85982229')}
            </MenuItem>
            <MenuItem value="Day">
              {translateUi('ui.sections.member.new_member.steps.day_987b9ced')}
            </MenuItem>
            <MenuItem value="Night">
              {translateUi('ui.sections.member.new_member.steps.night_1097b553')}
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label={translateUi('ui.sections.member.new_member.steps.supervisor_2cd4fa19')}
            error={!!errors.supervisor}
            helperText={errors.supervisor?.message}
            {...register('supervisor')}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            select
            fullWidth
            label={translateUi('ui.sections.member.new_member.steps.employment_status_9845e4c7')}
            defaultValue=""
            error={!!errors.employmentStatus}
            helperText={errors.employmentStatus?.message}
            {...register('employmentStatus')}
          >
            <MenuItem value="" disabled>
              {translateUi('ui.sections.member.new_member.steps.select_85982229')}
            </MenuItem>
            <MenuItem value="Active">
              {translateUi('ui.sections.member.new_member.steps.active_a733b809')}
            </MenuItem>
            <MenuItem value="Resigned">
              {translateUi('ui.sections.member.new_member.steps.resigned_6eac413a')}
            </MenuItem>
            <MenuItem value="Intern">
              {translateUi('ui.sections.member.new_member.steps.intern_f841f984')}
            </MenuItem>
            <MenuItem value="Contract">
              {translateUi('ui.sections.member.new_member.steps.contract_5a0ba3bb')}
            </MenuItem>
            <MenuItem value="Probation">
              {translateUi('ui.sections.member.new_member.steps.probation_70168673')}
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <FormControl>
        <FormLabel
          id="employement-type-radio-buttons-group-label"
          sx={{
            typography: 'caption',
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          {translateUi('ui.sections.member.new_member.steps.gender_8a754c61')}
        </FormLabel>
        <Controller
          control={control}
          name="employmentType"
          defaultValue="in-office"
          render={({ field }) => (
            <RadioGroup row aria-labelledby="employement-type-radio-buttons-group-label" {...field}>
              <FormControlLabel
                value="in-office"
                control={<Radio />}
                label={translateUi('ui.sections.member.new_member.steps.in_office_0edeb669')}
              />
              <FormControlLabel
                value="hybrid"
                control={<Radio />}
                label={translateUi('ui.sections.member.new_member.steps.hybrid_8e01f6bc')}
              />
              <FormControlLabel
                value="remote"
                control={<Radio />}
                label={translateUi('ui.sections.member.new_member.steps.remote_c93f6536')}
              />
            </RadioGroup>
          )}
        />
      </FormControl>
    </Stack>
  );
};
export default JobInformation;
