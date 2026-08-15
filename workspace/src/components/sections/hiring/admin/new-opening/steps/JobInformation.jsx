import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import Editor from 'components/base/Editor';

export const jobInformationFormSchema = yup.object({
  jobInformation: yup.object({
    jobTitle: yup
      .string()
      .required(i18n.t('ui.sections.hiring.admin.new_opening.job_title_is_required_ffd82597')),
    positionNumber: yup
      .number()
      .required(
        i18n.t('ui.sections.hiring.admin.new_opening.position_number_is_required_d97e0365'),
      ),
    department: yup
      .string()
      .required(i18n.t('ui.sections.hiring.admin.new_opening.department_is_required_0c4a29d6')),
    hiringLead: yup
      .string()
      .required(i18n.t('ui.sections.hiring.admin.new_opening.hiring_lead_is_required_50899d06')),
    branch: yup
      .string()
      .required(i18n.t('ui.sections.hiring.admin.new_opening.branch_is_required_a3ca29d7')),
    experience: yup
      .number()
      .required(i18n.t('ui.sections.hiring.admin.new_opening.experience_is_required_87098bd9')),
    deadline: yup
      .string()
      .required(i18n.t('ui.sections.hiring.admin.new_opening.deadline_is_required_8bdafb52')),
    compensation: yup.object({
      currency: yup
        .string()
        .required(i18n.t('ui.sections.hiring.admin.new_opening.currency_is_required_64b8e35a')),
      salary: yup
        .number()
        .required(i18n.t('ui.sections.hiring.admin.new_opening.salary_is_required_0b23dfe3')),
      interval: yup
        .string()
        .required(i18n.t('ui.sections.hiring.admin.new_opening.interval_is_required_7a9f5a1e')),
    }),
    jobDescription: yup
      .string()
      .required(
        i18n.t('ui.sections.hiring.admin.new_opening.job_description_is_required_f96ee991'),
      ),
  }),
});
const JobInformation = () => {
  const { currencyFormat } = useNumberFormat();
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container spacing={2}>
      <Grid container size={12} spacing={1}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={translateUi('ui.sections.hiring.admin.new_opening.job_title_0e1d5b56')}
            fullWidth
            error={!!errors.jobInformation?.jobTitle}
            helperText={errors.jobInformation?.jobTitle?.message}
            {...register('jobInformation.jobTitle')}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <FormControl variant="filled" fullWidth error={!!errors.jobInformation?.positionNumber}>
            <InputLabel id="position-number-label">
              {translateUi('ui.sections.hiring.admin.new_opening.position_number_e1dab71a')}
            </InputLabel>
            <Controller
              control={control}
              name="jobInformation.positionNumber"
              render={({ field }) => (
                <Select
                  labelId="position-number-label"
                  label={translateUi(
                    'ui.sections.hiring.admin.new_opening.position_number_e1dab71a',
                  )}
                  inputProps={{ 'aria-label': 'Without label' }}
                  {...field}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.jobInformation?.positionNumber?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <FormControl variant="filled" fullWidth error={!!errors.jobInformation?.department}>
            <InputLabel id="department-label">
              {translateUi('ui.sections.hiring.admin.new_opening.department_db40106a')}
            </InputLabel>
            <Controller
              control={control}
              name="jobInformation.department"
              render={({ field }) => (
                <Select
                  labelId="department-label"
                  label={translateUi('ui.sections.hiring.admin.new_opening.department_db40106a')}
                  inputProps={{ 'aria-label': 'Without label' }}
                  {...field}
                >
                  <MenuItem value="Support">
                    {translateUi('ui.sections.hiring.admin.new_opening.support_f32d5a3b')}
                  </MenuItem>
                  <MenuItem value="Sales">
                    {translateUi('ui.sections.hiring.admin.new_opening.sales_d0edfb6e')}
                  </MenuItem>
                  <MenuItem value="Data & Analytics">
                    {translateUi('ui.sections.hiring.admin.new_opening.data_analytics_7113d51a')}
                  </MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.jobInformation?.department?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <FormControl variant="filled" fullWidth error={!!errors.jobInformation?.hiringLead}>
            <InputLabel id="hiring-lead-label">
              {translateUi('ui.sections.hiring.admin.new_opening.hiring_lead_682b3ad5')}
            </InputLabel>
            <Controller
              control={control}
              name="jobInformation.hiringLead"
              render={({ field }) => (
                <Select
                  labelId="hiring-lead-label"
                  label={translateUi('ui.sections.hiring.admin.new_opening.hiring_lead_682b3ad5')}
                  inputProps={{ 'aria-label': 'Without label' }}
                  {...field}
                >
                  <MenuItem value="Michael Hall">
                    {translateUi('ui.sections.hiring.admin.new_opening.michael_hall_2948bbff')}
                  </MenuItem>
                  <MenuItem value="Jack Smith">
                    {translateUi('ui.sections.hiring.admin.new_opening.jack_smith_0f48ecc5')}
                  </MenuItem>
                  <MenuItem value="Grace Wong">
                    {translateUi('ui.sections.hiring.admin.new_opening.grace_wong_1324df4b')}
                  </MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.jobInformation?.hiringLead?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <FormControl variant="filled" fullWidth error={!!errors.jobInformation?.branch}>
            <InputLabel id="branch-label">
              {translateUi('ui.sections.hiring.admin.new_opening.branch_1627510b')}
            </InputLabel>
            <Controller
              control={control}
              name="jobInformation.branch"
              render={({ field }) => (
                <Select
                  labelId="branch-label"
                  label={translateUi('ui.sections.hiring.admin.new_opening.branch_1627510b')}
                  inputProps={{ 'aria-label': 'Without label' }}
                  {...field}
                >
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="Chicago">
                    {translateUi('ui.sections.hiring.admin.new_opening.chicago_34971b8f')}
                  </MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.jobInformation?.branch?.message}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container size={12} spacing={1}>
        <Grid size={{ xs: 6, sm: 6 }}>
          <FormControl variant="filled" fullWidth error={!!errors.jobInformation?.experience}>
            <InputLabel id="experience-label">
              {translateUi('ui.sections.hiring.admin.new_opening.experience_5b5aafe6')}
            </InputLabel>
            <Controller
              control={control}
              name="jobInformation.experience"
              render={({ field }) => (
                <Select
                  labelId="experience-label"
                  label={translateUi('ui.sections.hiring.admin.new_opening.experience_5b5aafe6')}
                  inputProps={{ 'aria-label': 'Without label' }}
                  {...field}
                >
                  <MenuItem value={1}>
                    {translateUi('ui.sections.hiring.admin.new_opening.1_year_41ee1bc7')}
                  </MenuItem>
                  <MenuItem value={2}>
                    {translateUi('ui.sections.hiring.admin.new_opening.2_years_dd5ba396')}
                  </MenuItem>
                  <MenuItem value={3}>
                    {translateUi('ui.sections.hiring.admin.new_opening.3_years_a72f081a')}
                  </MenuItem>
                  <MenuItem value={4}>
                    {translateUi('ui.sections.hiring.admin.new_opening.4_years_2390ab05')}
                  </MenuItem>
                  <MenuItem value={5}>
                    {translateUi('ui.sections.hiring.admin.new_opening.5_years_a4781e38')}
                  </MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.jobInformation?.experience?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <Controller
            control={control}
            name="jobInformation.deadline"
            render={({ field: { value, ...rest } }) => (
              <DatePicker
                label={translateUi('ui.sections.hiring.admin.new_opening.deadline_2b12f369')}
                value={dayjs(value)}
                slotProps={{
                  textField: {
                    error: !!errors.jobInformation?.deadline,
                    helperText: errors.jobInformation?.deadline?.message,
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
      </Grid>
      <Grid container size={12} spacing={1}>
        <Grid size={12}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
            }}
          >
            {translateUi('ui.sections.hiring.admin.new_opening.compensation_2eff6099')}
          </Typography>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ xs: 6, sm: 'auto' }}>
            <FormControl
              variant="filled"
              fullWidth
              error={!!errors.jobInformation?.compensation?.currency}
              sx={{ minWidth: { sm: 120 } }}
            >
              <InputLabel id="currency-label">
                {translateUi('ui.sections.hiring.admin.new_opening.currency_e070de22')}
              </InputLabel>
              <Controller
                control={control}
                name="jobInformation.compensation.currency"
                render={({ field }) => (
                  <Select
                    labelId="currency-label"
                    label={translateUi('ui.sections.hiring.admin.new_opening.currency_e070de22')}
                    inputProps={{ 'aria-label': 'Without label' }}
                    {...field}
                  >
                    <MenuItem value="AUD">
                      {translateUi('ui.sections.hiring.admin.new_opening.aud_bf328608')}
                    </MenuItem>
                    <MenuItem value="USD">
                      {translateUi('ui.sections.hiring.admin.new_opening.usd_3df6c299')}
                    </MenuItem>
                    <MenuItem value="CAD">
                      {translateUi('ui.sections.hiring.admin.new_opening.cad_0ec0a67f')}
                    </MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>
                {errors.jobInformation?.compensation?.currency?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid
            size="grow"
            sx={{
              order: { xs: 1, sm: 0 },
            }}
          >
            <Controller
              control={control}
              name="jobInformation.compensation.salary"
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label={translateUi(
                    'ui.sections.hiring.admin.new_opening.desired_salary_f683579b',
                  )}
                  fullWidth
                  value={field.value && currencyFormat(field.value, { maximumFractionDigits: 0 })}
                  error={!!errors.jobInformation?.compensation?.salary}
                  helperText={errors.jobInformation?.compensation?.salary?.message}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
                    field.onChange(rawValue ? Number(rawValue) : '');
                  }}
                  sx={{ order: { xs: 1, sm: 0 } }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 'auto' }}>
            <FormControl
              variant="filled"
              fullWidth
              error={!!errors.jobInformation?.compensation?.interval}
              sx={{ minWidth: { sm: 165 } }}
            >
              <InputLabel id="interval-label">
                {translateUi('ui.sections.hiring.admin.new_opening.interval_011efcd5')}
              </InputLabel>
              <Controller
                control={control}
                name="jobInformation.compensation.interval"
                render={({ field }) => (
                  <Select
                    labelId="interval-label"
                    label={translateUi('ui.sections.hiring.admin.new_opening.interval_011efcd5')}
                    inputProps={{ 'aria-label': 'Without label' }}
                    {...field}
                  >
                    <MenuItem value="weekly">
                      {translateUi('ui.sections.hiring.admin.new_opening.per_week_4a98b3cb')}
                    </MenuItem>
                    <MenuItem value="monthly">
                      {translateUi('ui.sections.hiring.admin.new_opening.per_month_457117bf')}
                    </MenuItem>
                    <MenuItem value="yearly">
                      {translateUi('ui.sections.hiring.admin.new_opening.per_year_59a315b0')}
                    </MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>
                {errors.jobInformation?.compensation?.interval?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container size={12} rowSpacing={1}>
        <Grid size={12}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
            }}
          >
            {translateUi('ui.sections.hiring.admin.new_opening.job_description_4124a134')}
          </Typography>
        </Grid>

        <Grid size={12}>
          <FormControl variant="filled" fullWidth error={!!errors.jobInformation?.jobDescription}>
            <Controller
              name="jobInformation.jobDescription"
              control={control}
              render={({ field }) => (
                <Editor
                  onChange={field.onChange}
                  content={field.value}
                  isValid={!errors.jobInformation?.jobDescription}
                  sx={{
                    '& .tiptap': {
                      height: 110,
                      minHeight: '0 !important',
                    },
                  }}
                />
              )}
            />
            <FormHelperText>{errors.jobInformation?.jobDescription?.message}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default JobInformation;
