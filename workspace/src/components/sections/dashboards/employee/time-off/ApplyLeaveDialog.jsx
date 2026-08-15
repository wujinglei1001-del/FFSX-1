import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { filledInputClasses } from '@mui/material/FilledInput';
import Grid from '@mui/material/Grid';
import { inputBaseClasses } from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { Fragment } from 'react/jsx-runtime';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';

const leaveApplyingSchema = yup.object({
  from: yup
    .date()
    .required(i18n.t('ui.sections.dashboards.employee.time_off.date_is_required_2f7469c4')),
  to: yup
    .date()
    .required(i18n.t('ui.sections.dashboards.employee.time_off.date_is_required_2f7469c4')),
  categories: yup
    .string()
    .required(i18n.t('ui.sections.dashboards.employee.time_off.category_is_required_eb1ae362')),
  totalDays: yup.number().required(''),
  reason: yup
    .string()
    .required(i18n.t('ui.sections.dashboards.employee.time_off.reason_is_required_d691fce5')),
});
const ApplyLeaveDialog = () => {
  const { t: translateUi } = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(leaveApplyingSchema),
    defaultValues: {
      totalDays: 0,
      categories: '',
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const from = watch('from');
  const to = watch('to');
  const days =
    from && to && dayjs(to).isAfter(dayjs(from)) ? dayjs(to).diff(dayjs(from), 'day') : 0;
  const onClose = () => setOpen(false);
  const onSubmit = function (data) {
    console.log({ data });
    enqueueSnackbar('Leave applied successfully', { variant: 'success' });
    onClose();
  };
  useEffect(() => setValue('totalDays', days), [days, setValue]);
  return (
    <Fragment>
      <Button fullWidth variant="soft" color="neutral" onClick={(_) => setOpen(true)}>
        {translateUi('ui.sections.dashboards.employee.time_off.apply_leave_b9236983')}
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit(onSubmit),
          },
        }}
        sx={{
          [`& .${dialogClasses.paper}`]: {
            borderRadius: 6,
            overflow: 'visible',
            maxWidth: 540,
          },
        }}
      >
        <DialogTitle
          component="h6"
          sx={({ spacing }) => ({
            padding: `${spacing(5)} ${spacing(5)} ${spacing(1)}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          {translateUi('ui.sections.dashboards.employee.time_off.leave_request_261b685d')}
          <Button shape="circle" color="neutral" onClick={onClose}>
            <IconifyIcon
              icon="material-symbols:close"
              sx={{ fontSize: 20, color: 'neutral.dark' }}
            />
          </Button>
        </DialogTitle>
        <DialogContent
          sx={({ spacing }) => ({ padding: `${spacing(5)} ${spacing(5)} ${spacing(3)}` })}
        >
          <DialogContentText
            variant="body2"
            sx={{ color: 'text.secondary', mb: 3, textWrap: 'pretty' }}
          >
            {translateUi(
              'ui.sections.dashboards.employee.time_off.provide_the_details_of_your_leave_request_includingd_f5fc89b3',
            )}
          </DialogContentText>
          <Grid container rowSpacing={2} columnSpacing={1} sx={{ mb: 3 }}>
            <Grid size={6}>
              <Controller
                name="from"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label={translateUi('ui.sections.dashboards.employee.time_off.from_3f66052a')}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(val) => field.onChange(val?.toDate())}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.from,
                        helperText: errors.from?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={6}>
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label={translateUi('ui.sections.dashboards.employee.time_off.to_ae79ea1e')}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(val) => field.onChange(val?.toDate())}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.to,
                        helperText: errors.to?.message,
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
                label={translateUi('ui.sections.dashboards.employee.time_off.cateogories_3361d230')}
                error={!!errors.categories}
                helperText={errors.categories?.message}
                {...register('categories')}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  {translateUi('ui.sections.dashboards.employee.time_off.select_85982229')}
                </MenuItem>
                <MenuItem value="Casual Leave">
                  {translateUi('ui.sections.dashboards.employee.time_off.casual_leave_4d425434')}
                </MenuItem>
                <MenuItem value="Sick Leave">
                  {translateUi('ui.sections.dashboards.employee.time_off.sick_leave_2d980554')}
                </MenuItem>
                <MenuItem value="Paid Leave">
                  {translateUi('ui.sections.dashboards.employee.time_off.paid_leave_f1eec325')}
                </MenuItem>
                <MenuItem value="Vacation">
                  {translateUi('ui.sections.dashboards.employee.time_off.vacation_789ca75e')}
                </MenuItem>
              </TextField>
            </Grid>
            <Grid size={6}>
              <TextField
                label={translateUi('ui.sections.dashboards.employee.time_off.total_days_b60c2dd3')}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                value={days}
              />
            </Grid>
          </Grid>
          <TextAreaField
            placeholder={translateUi('ui.sections.dashboards.employee.time_off.reason_f219cc06')}
            error={!!errors.reason}
            helperText={errors.reason?.message}
            {...register('reason')}
          />
        </DialogContent>
        <DialogActions
          sx={({ spacing }) => ({
            padding: `${spacing(0)} ${spacing(5)} ${spacing(5)}`,
            justifyContent: 'flex-start',
          })}
        >
          <Button color="neutral" onClick={() => onClose()} sx={{ ml: 'auto !important' }}>
            {translateUi('ui.sections.dashboards.employee.time_off.discard_36fff63c')}
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {translateUi('ui.sections.dashboards.employee.time_off.save_efc007a3')}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export const TextAreaField = styled(({ ref, sx, ...rest }) => (
  <TextField sx={{ ...sx }} rows={4} ref={ref} {...rest} multiline fullWidth />
))(({ theme }) => ({
  [`& .${filledInputClasses.root}.${inputBaseClasses.multiline}`]: {
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
    [`& .${inputBaseClasses.input}`]: {
      padding: 0,
    },
  },
}));
export default ApplyLeaveDialog;
