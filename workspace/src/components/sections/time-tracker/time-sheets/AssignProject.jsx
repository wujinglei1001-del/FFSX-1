import { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';

export const assignProjectSchema = yup.object({
  project: yup
    .string()
    .required(
      i18n.t('ui.sections.time_tracker.time_sheets.assignproject.this_field_is_required_dedbaded'),
    ),
  task: yup
    .string()
    .required(
      i18n.t('ui.sections.time_tracker.time_sheets.assignproject.this_field_is_required_dedbaded'),
    ),
  client: yup
    .string()
    .required(
      i18n.t('ui.sections.time_tracker.time_sheets.assignproject.this_field_is_required_dedbaded'),
    ),
  billable: yup
    .boolean()
    .required(
      i18n.t('ui.sections.time_tracker.time_sheets.assignproject.this_field_is_required_dedbaded'),
    ),
});

const AssignProject = () => {
  const { t: translateUi } = useTranslation();
  const { only } = useBreakpoints();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(assignProjectSchema), defaultValues: { billable: false } });

  const onlyXs = only('xs');

  const snackbar = useSnackbar();
  const [open, setOpen] = useState(false);

  const [handleOpen, handleClose] = [() => setOpen(true), () => setOpen(false)];

  const onSubmit = (data) => {
    console.log({ data });
    snackbar.enqueueSnackbar('Project assigned successfully!', { variant: 'success' });
    handleClose();
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        startIcon={<IconifyIcon icon="material-symbols:add-2-rounded" sx={{ fontSize: 20 }} />}
        onClick={handleOpen}
        sx={{ flexGrow: 1, flexShrink: 0, maxWidth: 150 }}
      >
        {translateUi('ui.sections.time_tracker.time_sheets.assignproject.assign_project_44051ab9')}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit(onSubmit),
            sx: {
              borderRadius: 6,
              maxWidth: 460,
              width: 1,
            },
          },
        }}
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
          <Box component="span">
            {translateUi(
              'ui.sections.time_tracker.time_sheets.assignproject.assign_a_project_2b4a3c98',
            )}
          </Box>
          <Button shape="circle" color="neutral" onClick={handleClose}>
            <IconifyIcon
              icon="material-symbols:close"
              sx={{ fontSize: 20, color: 'neutral.dark' }}
            />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {translateUi(
              'ui.sections.time_tracker.time_sheets.assignproject.please_select_a_project_from_the_list_to_attach_your_a99a523c',
            )}
          </DialogContentText>

          <Grid container spacing={2}>
            <Grid container size={12} spacing={1}>
              <Grid size={12}>
                <Controller
                  control={control}
                  name="project"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      select
                      label={translateUi(
                        'ui.sections.time_tracker.time_sheets.assignproject.project_f6f4da8d',
                      )}
                      defaultValue=""
                      error={!!errors.project}
                      helperText={errors.project?.message}
                      {...field}
                    >
                      <MenuItem value="" disabled>
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.project_f6f4da8d',
                        )}
                      </MenuItem>
                      <MenuItem value="website-Redesign">
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.website_redesign_38287aad',
                        )}
                      </MenuItem>
                      <MenuItem value="mobile-app-development">
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.mobile_app_development_f4a4a9ea',
                        )}
                      </MenuItem>
                      <MenuItem value="content-Marketing">
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.content_marketing_a5238b18',
                        )}
                      </MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  control={control}
                  name="task"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      select
                      label={translateUi(
                        'ui.sections.time_tracker.time_sheets.assignproject.task_7bb0ddf9',
                      )}
                      defaultValue=""
                      error={!!errors.task}
                      helperText={errors.task?.message}
                      {...field}
                    >
                      <MenuItem value="" disabled>
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.task_7bb0ddf9',
                        )}
                      </MenuItem>
                      <MenuItem value="create-wireframes">
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.create_wireframes_78730a96',
                        )}
                      </MenuItem>
                      <MenuItem value="plan-Q2-blog-topics">
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.plan_q2_blog_topics_9e346326',
                        )}
                      </MenuItem>
                      <MenuItem value="set-up-automation-workflows">
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.set_up_automation_workflows_2c88ce2c',
                        )}
                      </MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
            <Grid container size={12} spacing={2} sx={{ alignItems: 'center' }}>
              <Grid size={8}>
                <Controller
                  control={control}
                  name="client"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      select
                      label={translateUi(
                        'ui.sections.time_tracker.time_sheets.assignproject.client_1bdd79b1',
                      )}
                      defaultValue=""
                      error={!!errors.client}
                      helperText={errors.client?.message}
                      {...field}
                    >
                      <MenuItem value="" disabled>
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.client_1bdd79b1',
                        )}
                      </MenuItem>
                      <MenuItem value="acme-corp">
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.acme_corp_8c29ce47',
                        )}
                      </MenuItem>
                      <MenuItem value="zen-mobile">
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.zenmobile_92e0da7c',
                        )}
                      </MenuItem>
                      <MenuItem value="nexatech">
                        {translateUi(
                          'ui.sections.time_tracker.time_sheets.assignproject.nexatech_bc8bbabe',
                        )}
                      </MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={4}>
                <Controller
                  control={control}
                  name="billable"
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox checked={field.value} {...field} />}
                      label={translateUi(
                        'ui.sections.time_tracker.time_sheets.assignproject.billable_ff5d36b9',
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button color="neutral" size={onlyXs ? 'medium' : 'large'} onClick={handleClose}>
            {translateUi('ui.sections.time_tracker.time_sheets.assignproject.discard_36fff63c')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size={onlyXs ? 'medium' : 'large'}
          >
            {translateUi(
              'ui.sections.time_tracker.time_sheets.assignproject.add_to_timesheet_3fdef15f',
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AssignProject;
