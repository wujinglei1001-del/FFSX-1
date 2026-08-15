import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { appraisalList } from 'data/hrm/performance-management';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import DateRangePicker from 'components/base/DateRangePicker';
import IconifyIcon from 'components/base/IconifyIcon';
import useNewCycleForm from './useNewCycleForm';

const mainEvaluators = appraisalList.map((appraisal) => appraisal.mainEvaluator);
const NewCycleDialog = ({ sx, onClose, handleClose, ...rest }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useNewCycleForm();
  const { enqueueSnackbar } = useSnackbar();
  const startDate = watch('startDate');
  const onSubmit = (data) => {
    console.log('New Cycle Data', data);
    enqueueSnackbar('New Cycle created successfully', { variant: 'success' });
    handleClose();
  };
  return (
    <Dialog
      scroll="body"
      maxWidth={false}
      onClose={onClose}
      slotProps={{
        paper: {
          component: 'form',
          id: 'add-member-form',
          onSubmit: handleSubmit(onSubmit),
        },
      }}
      sx={{
        [`& .${dialogClasses.paper}`]: {
          borderRadius: 6,
          overflow: 'visible',
          maxWidth: 600,
          ...sx,
        },
      }}
      {...rest}
    >
      <DialogTitle
        component="h6"
        sx={{
          pt: 3,
          pb: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {translateUi(
          'ui.sections.hrm.performance_management.appraisal_cycle.create_appraisal_cycle_acd4ed83',
        )}
        <Button shape="circle" color="neutral" onClick={handleClose}>
          <IconifyIcon icon="material-symbols:close" sx={{ fontSize: 20, color: 'neutral.dark' }} />
        </Button>
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          {translateUi(
            'ui.sections.hrm.performance_management.appraisal_cycle.set_up_a_new_appraisal_cycle_by_defining_its_name_re_bc0fc976',
          )}
        </DialogContentText>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid container size={12} rowSpacing={1}>
            <Grid size={12}>
              <TextField
                label={translateUi(
                  'ui.sections.hrm.performance_management.appraisal_cycle.cycle_name_8a675e0e',
                )}
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name')}
              />
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth error={!!errors.reviewPeriod} sx={{ mb: 1 }}>
                <Controller
                  name="reviewPeriod"
                  control={control}
                  render={({ field }) => (
                    <DateRangePicker
                      className="react-datepicker-class"
                      selected={field.value?.[0] || undefined}
                      startDate={field.value?.[0] || undefined}
                      endDate={field.value?.[1] || undefined}
                      onChange={(dates) => {
                        field.onChange(dates);
                      }}
                      withPortal
                      isClearable
                      customInput={
                        <TextField
                          label={translateUi(
                            'ui.sections.hrm.performance_management.appraisal_cycle.review_period_9a6ebbbc',
                          )}
                          fullWidth
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <IconifyIcon icon="material-symbols:calendar-month-outline-rounded" />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      }
                    />
                  )}
                />

                {errors.reviewPeriod && (
                  <FormHelperText>{errors.reviewPeriod?.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid size={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={translateUi(
                    'ui.sections.hrm.performance_management.appraisal_cycle.start_date_9d7ab1a5',
                  )}
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date ? date.toDate() : null);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.startDate,
                      helperText: errors.startDate?.message,
                    },
                  }}
                  sx={{ width: 1 }}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={translateUi(
                    'ui.sections.hrm.performance_management.appraisal_cycle.due_date_a1b308ec',
                  )}
                  format="DD/MM/YYYY"
                  shouldDisableDate={(date) => date.isBefore(dayjs(startDate))}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date ? date.toDate() : null);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dueDate,
                      helperText: errors.dueDate?.message,
                    },
                  }}
                  sx={{ width: 1 }}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="mainEvaluator"
              render={({ field }) => (
                <Autocomplete
                  fullWidth
                  options={mainEvaluators}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  value={field.value}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label={translateUi(
                          'ui.sections.hrm.performance_management.appraisal_cycle.main_evaluator_40a00873',
                        )}
                        slotProps={{
                          ...params.slotProps,
                          input: {
                            ...params.slotProps.input,
                          },
                        }}
                        sx={{ flexGrow: 1 }}
                      />
                    );
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="template"
              render={({ field }) => (
                <Autocomplete
                  fullWidth
                  options={[
                    'Annual Review',
                    'Probation Review',
                    '360 Feedback',
                    'Performance Check-in',
                  ]}
                  value={field.value}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label={translateUi(
                          'ui.sections.hrm.performance_management.appraisal_cycle.template_3ec1ae06',
                        )}
                        slotProps={{
                          ...params.slotProps,
                          input: {
                            ...params.slotProps.input,
                          },
                        }}
                        sx={{ flexGrow: 1 }}
                      />
                    );
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          pt: 0.5,
        }}
      >
        <Button variant="soft" color="neutral" onClick={handleClose}>
          {translateUi('ui.sections.hrm.performance_management.appraisal_cycle.discard_36fff63c')}
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {translateUi('ui.sections.hrm.performance_management.appraisal_cycle.confirm_04a21221')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewCycleDialog;
