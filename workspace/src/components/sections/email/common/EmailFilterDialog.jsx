import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  dialogClasses,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { defaultEmails } from 'data/email';
import * as yup from 'yup';
import DateRangePicker from 'components/base/DateRangePicker';
import IconifyIcon from 'components/base/IconifyIcon';

const emailFilterSchema = yup.object().shape({
  from: yup.array().of(yup.string().email().required()).optional(),
  to: yup.array().of(yup.string().email().required()).optional(),
  subject: yup.string().optional(),
  timePeriod: yup.string().optional(),
  date: yup.date().nullable().optional(),
  containsWords: yup.string().optional(),
  exclusiveWords: yup.string().optional(),
  search: yup.string().optional(),
  size: yup.string().optional(),
});
const EmailFilterDialog = ({ handleClose, open }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailFilterSchema),
    mode: 'onChange',
  });
  const submitHandler = (data) => {
    console.log(data);
    if (errors) {
      handleClose();
      reset();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit(submitHandler)}
      sx={{
        [`& .${dialogClasses.paper}`]: { p: 0, width: 1, borderRadius: 6 },
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          p: 3,
          pb: 2,
          zIndex: 1000,
        }}
      >
        <Typography variant="h6">
          {translateUi('ui.sections.email.common.emailfilterdialog.filter_d7decf1a')}
        </Typography>
        <IconButton onClick={handleClose}>
          <IconifyIcon icon="material-symbols:close" sx={{ fontSize: 20, color: 'neutral.dark' }} />
        </IconButton>
      </Stack>
      <DialogContent sx={{ px: 3, py: 1 }}>
        <Controller
          name="from"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              aria-labelledby="from-autocomplete-label"
              {...field}
              freeSolo
              multiple
              options={defaultEmails}
              onChange={(_, newValue) => field.onChange(newValue)}
              value={field.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translateUi('ui.sections.email.common.emailfilterdialog.from_3f66052a')}
                  error={!!errors.from}
                />
              )}
            />
          )}
        />
        <Controller
          name="to"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              aria-labelledby="to-autocomplete-label"
              {...field}
              multiple
              freeSolo
              options={defaultEmails}
              onChange={(_, newValue) => field.onChange(newValue)}
              value={field.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translateUi('ui.sections.email.common.emailfilterdialog.to_ae79ea1e')}
                  error={!!errors.to}
                />
              )}
              sx={{ mt: 1, mb: 2 }}
            />
          )}
        />
        <TextField
          sx={{ width: 1 }}
          label={translateUi('ui.sections.email.common.emailfilterdialog.subject_8d183dbd')}
          {...register('subject')}
        />
        <Grid container sx={{ my: 2 }} spacing={1}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="time-period-label">
                {translateUi('ui.sections.email.common.emailfilterdialog.time_period_8a4c7b16')}
              </InputLabel>
              <Select
                labelId="time-period-label"
                id="time-period"
                label={translateUi(
                  'ui.sections.email.common.emailfilterdialog.time_period_749975a9',
                )}
                defaultValue=""
                {...register('timePeriod')}
              >
                <MenuItem value="1day">
                  {translateUi('ui.sections.email.common.emailfilterdialog.1_day_2d8a6f7c')}
                </MenuItem>
                <MenuItem value="3days">
                  {translateUi('ui.sections.email.common.emailfilterdialog.3_days_09ad9df4')}
                </MenuItem>
                <MenuItem value="1week">
                  {translateUi('ui.sections.email.common.emailfilterdialog.1_week_fdb8d5cd')}
                </MenuItem>
                <MenuItem value="2weeks">
                  {translateUi('ui.sections.email.common.emailfilterdialog.1_weeks_9986e9f5')}
                </MenuItem>
                <MenuItem value="1month">
                  {translateUi('ui.sections.email.common.emailfilterdialog.1_month_42fa50c1')}
                </MenuItem>
                <MenuItem value="2months">
                  {translateUi('ui.sections.email.common.emailfilterdialog.2_months_9dbe1097')}
                </MenuItem>
                <MenuItem value="6months">
                  {translateUi('ui.sections.email.common.emailfilterdialog.6_months_cd75b86f')}
                </MenuItem>
                <MenuItem value="1year">
                  {translateUi('ui.sections.email.common.emailfilterdialog.1_year_afe36da6')}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DateRangePicker withPortal onChange={(dates) => field.onChange(dates)} />
              )}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 1 }} spacing={1}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              sx={{ width: 1 }}
              label={translateUi(
                'ui.sections.email.common.emailfilterdialog.contains_words_5254b622',
              )}
              {...register('containsWords')}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              sx={{ width: 1 }}
              label={translateUi(
                'ui.sections.email.common.emailfilterdialog.excludes_words_d4385773',
              )}
              {...register('exclusiveWords')}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="search-label">
                {translateUi('ui.sections.email.common.emailfilterdialog.search_bce06414')}
              </InputLabel>
              <Select
                labelId="search-label"
                defaultValue=""
                id="search"
                label={translateUi('ui.sections.email.common.emailfilterdialog.search_bce06414')}
                {...register('search')}
              >
                <MenuItem value="allMail">
                  {translateUi('ui.sections.email.common.emailfilterdialog.all_mail_56b11e05')}
                </MenuItem>
                <MenuItem value="inbox">
                  {translateUi('ui.sections.email.common.emailfilterdialog.inbox_44caf746')}
                </MenuItem>
                <MenuItem value="starred">
                  {translateUi('ui.sections.email.common.emailfilterdialog.starred_e61561a8')}
                </MenuItem>
                <MenuItem value="sentMail">
                  {translateUi('ui.sections.email.common.emailfilterdialog.sent_mail_ce9ff5f1')}
                </MenuItem>
                <MenuItem value="draft">
                  {translateUi('ui.sections.email.common.emailfilterdialog.draft_23d33e22')}
                </MenuItem>
                <MenuItem value="spam">
                  {translateUi('ui.sections.email.common.emailfilterdialog.spam_d8628a52')}
                </MenuItem>
                <MenuItem value="trash">
                  {translateUi('ui.sections.email.common.emailfilterdialog.trash_e3bf62bb')}
                </MenuItem>
                <MenuItem value="archived">
                  {translateUi('ui.sections.email.common.emailfilterdialog.archived_eddc813f')}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="size-label">
                {translateUi('ui.sections.email.common.emailfilterdialog.size_b7152342')}
              </InputLabel>
              <Select
                labelId="size-label"
                defaultValue=""
                id="size"
                label={translateUi('ui.sections.email.common.emailfilterdialog.age_ff9f1ff3')}
                {...register('size')}
              >
                <MenuItem value="under10mb">
                  {translateUi('ui.sections.email.common.emailfilterdialog.under_10_mb_9db90f77')}
                </MenuItem>
                <MenuItem value="10to25mb">
                  {translateUi('ui.sections.email.common.emailfilterdialog.10_mb_25_mb_85c3e092')}
                </MenuItem>
                <MenuItem value="over25mb">
                  {translateUi('ui.sections.email.common.emailfilterdialog.over_25_mb_99b4cd08')}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          position: 'sticky',
          bottom: 0,
          bgcolor: 'background.default',
          zIndex: 1000,
        }}
      >
        <Button variant="text" color="primary" sx={{ mr: 'auto', ml: -1.5 }}>
          {translateUi('ui.sections.email.common.emailfilterdialog.clear_719ea396')}
        </Button>
        <Button variant="soft" color="neutral" onClick={handleClose}>
          {translateUi('ui.sections.email.common.emailfilterdialog.cancel_77dfd213')}
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {translateUi('ui.sections.email.common.emailfilterdialog.search_bce06414')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EmailFilterDialog;
