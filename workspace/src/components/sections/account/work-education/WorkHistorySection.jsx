import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useAccounts } from 'providers/AccountsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import AccountFormDialog from '../common/AccountFormDialog';
import Work from './Work';

const workFormSchema = yup.object().shape({
  companyName: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.work_education.workhistorysection.company_name_is_required_26410170',
      ),
    ),
  designation: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.work_education.workhistorysection.designation_is_required_183fefe6',
      ),
    ),
  location: yup
    .string()
    .required(
      i18n.t('ui.sections.account.work_education.workhistorysection.location_is_required_3997aae0'),
    ),
  startDate: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.work_education.workhistorysection.start_date_is_required_438387af',
      ),
    ),
  endDate: yup.string().optional(),
  currentlyWorking: yup.boolean().required(),
  companyLogo: yup.string().nullable().defined(),
});

const WorkHistorySection = () => {
  const { t: translateUi } = useTranslation();
  const { workHistory } = useAccounts();
  const [workHistories, setWorkHistories] = useState(workHistory);
  const [selectedWork, setSelectedWork] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: {
      companyName: '',
      designation: '',
      location: '',
      startDate: '',
      endDate: dayjs().format(),
      currentlyWorking: false,
      companyLogo: null,
    },
    resolver: yupResolver(workFormSchema),
  });

  const {
    register,
    control,
    formState: { errors },
    watch,
    reset,
  } = methods;

  const { currentlyWorking } = watch();
  useEffect(() => {
    if (selectedWork) {
      reset(selectedWork);
    } else {
      reset({
        companyName: '',
        designation: '',
        location: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        companyLogo: null,
      });
    }
  }, [selectedWork, reset]);

  const handleOpenDialog = (work) => {
    setSelectedWork(work);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log({ data });
    if (selectedWork) {
      setWorkHistories((prev) =>
        prev.map((work) =>
          work.id === selectedWork.id
            ? {
                ...work,
                ...data,
                endDate: data.endDate ?? undefined,
                companyLogo: work.companyLogo,
              }
            : work,
        ),
      );
      enqueueSnackbar('Work history updated successfully!', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } else {
      setWorkHistories((prev) => [
        ...prev,
        {
          ...data,
          endDate: data.endDate ?? undefined,
          id: workHistories.length + 1,
          companyLogo: '',
        },
      ]);
      enqueueSnackbar('Work history added successfully!', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    }
    handleCloseDialog();
  };

  return (
    <>
      <Stack sx={{ gap: 1, mb: 4 }}>
        {workHistories.map((work) => (
          <Work key={work.id} work={work} handleOpenDialog={handleOpenDialog} />
        ))}
      </Stack>
      <Button
        variant="soft"
        color="neutral"
        fullWidth
        startIcon={<IconifyIcon icon="material-symbols:add" sx={{ fontSize: 20 }} />}
        onClick={() => handleOpenDialog(null)}
      >
        {translateUi(
          'ui.sections.account.work_education.workhistorysection.add_new_workplace_32deaca5',
        )}
      </Button>
      <FormProvider {...methods}>
        <AccountFormDialog
          title={translateUi(
            'ui.sections.account.work_education.workhistorysection.workplace_details_cbcd4dee',
          )}
          subtitle={translateUi(
            'ui.sections.account.work_education.workhistorysection.update_your_workplace_information_is_current_for_pre_d8ed51d5',
          )}
          open={dialogOpen}
          onSubmit={handleFormSubmit}
          handleDialogClose={handleCloseDialog}
          handleRemove={selectedWork ? () => {} : undefined}
          sx={{
            maxWidth: 452,
          }}
        >
          <Stack sx={{ gap: 2, alignItems: 'flex-start', p: 0.125 }}>
            <Stack sx={{ gap: 1, width: 1 }}>
              <TextField
                label={translateUi(
                  'ui.sections.account.work_education.workhistorysection.company_name_8599f5cc',
                )}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        {selectedWork?.companyLogo ? (
                          <Image src={selectedWork?.companyLogo} alt="" width={20} height={20} />
                        ) : (
                          <IconifyIcon icon="material-symbols:account-balance-outline-rounded" />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
                {...register('companyName')}
              />
              <TextField
                label={translateUi(
                  'ui.sections.account.work_education.workhistorysection.designation_b2797c75',
                )}
                fullWidth
                error={!!errors.designation}
                helperText={errors.designation?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon icon="material-symbols:work-outline" />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register('designation')}
              />
            </Stack>
            <TextField
              label={translateUi(
                'ui.sections.account.work_education.workhistorysection.location_d219c681',
              )}
              fullWidth
              error={!!errors.location}
              helperText={errors.location?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconifyIcon icon="material-symbols:location-on-outline" />
                    </InputAdornment>
                  ),
                },
              }}
              {...register('location')}
            />
            <Controller
              control={control}
              name="currentlyWorking"
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox checked={field.value} {...field} />}
                  label={translateUi(
                    'ui.sections.account.work_education.workhistorysection.i_am_currently_working_here_932a1dbc',
                  )}
                  sx={{ ml: 0 }}
                />
              )}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1, width: 1 }}>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { value, onChange, ...rest } }) => (
                  <DatePicker
                    label={translateUi(
                      'ui.sections.account.work_education.workhistorysection.start_date_9d7ab1a5',
                    )}
                    value={dayjs(value)}
                    onChange={(date) => onChange(date)}
                    slotProps={{
                      textField: {
                        variant: 'filled',
                        error: !!errors.startDate,
                        helperText: errors.startDate?.message,
                      },
                      inputAdornment: {
                        position: 'start',
                      },
                    }}
                    {...rest}
                  />
                )}
              />
              <Controller
                control={control}
                name="endDate"
                render={({ field: { value, onChange, ...rest } }) => (
                  <DatePicker
                    label={translateUi(
                      'ui.sections.account.work_education.workhistorysection.end_date_84b14781',
                    )}
                    disabled={currentlyWorking}
                    value={currentlyWorking ? dayjs() : dayjs(value)}
                    onChange={(date) => onChange(date)}
                    slotProps={{
                      textField: {
                        variant: 'filled',
                        error: !!errors.endDate,
                        helperText: errors.endDate?.message,
                      },
                      inputAdornment: {
                        position: 'start',
                      },
                    }}
                    {...rest}
                  />
                )}
              />
            </Stack>
          </Stack>
        </AccountFormDialog>
      </FormProvider>
    </>
  );
};
export default WorkHistorySection;
