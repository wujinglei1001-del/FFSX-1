import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useAccounts } from 'providers/AccountsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import AccountFormDialog from '../common/AccountFormDialog';
import Education from './Education';

const educationFormSchema = yup.object().shape({
  institutionName: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.work_education.educationhistorysection.institution_name_is_required_6794f5a5',
      ),
    ),
  subject: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.work_education.educationhistorysection.subject_is_required_be41b487',
      ),
    ),
  location: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.work_education.educationhistorysection.location_is_required_3997aae0',
      ),
    ),
  startDate: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.work_education.educationhistorysection.start_date_is_required_438387af',
      ),
    ),
  endDate: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.work_education.educationhistorysection.end_date_is_required_0f750cd5',
      ),
    ),
  institutionLogo: yup.string().nullable().defined(),
});

const EducationHistorySection = () => {
  const { t: translateUi } = useTranslation();
  const { educationHistory } = useAccounts();
  const [educationHistories, setEducationHistories] = useState(educationHistory);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: {
      institutionName: '',
      subject: '',
      location: '',
      startDate: '',
      endDate: dayjs().format(),
      institutionLogo: null,
    },
    resolver: yupResolver(educationFormSchema),
  });
  const {
    register,
    control,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (selectedEducation) {
      reset(selectedEducation);
    } else {
      reset({
        institutionName: '',
        subject: '',
        location: '',
        startDate: '',
        endDate: '',
        institutionLogo: null,
      });
    }
  }, [selectedEducation, reset]);

  const handleOpenDialog = (education) => {
    setSelectedEducation(education);
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log({ data });
    if (selectedEducation) {
      setEducationHistories((prev) =>
        prev.map((education) =>
          education.id === selectedEducation.id
            ? {
                ...education,
                ...data,
                endDate: data.endDate ?? '',
                institutionLogo: education.institutionLogo,
              }
            : education,
        ),
      );
      enqueueSnackbar('Institution updated successfully!', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } else {
      setEducationHistories((prev) => [
        ...prev,
        {
          ...data,
          endDate: data.endDate ?? '',
          id: educationHistories.length + 1,
          institutionLogo: '',
        },
      ]);
      enqueueSnackbar('Institution added successfully!', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    }
    handleCloseDialog();
  };

  return (
    <>
      <Stack sx={{ gap: 1, mb: 4 }}>
        {educationHistories.map((education) => (
          <Education key={education.id} education={education} handleOpenDialog={handleOpenDialog} />
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
          'ui.sections.account.work_education.educationhistorysection.add_new_school_d443d6e6',
        )}
      </Button>
      <FormProvider {...methods}>
        <AccountFormDialog
          title={translateUi(
            'ui.sections.account.work_education.educationhistorysection.education_details_09ab458b',
          )}
          subtitle={translateUi(
            'ui.sections.account.work_education.educationhistorysection.update_your_education_details_for_accurate_records_a_829e38aa',
          )}
          open={dialogOpen}
          onSubmit={handleFormSubmit}
          handleDialogClose={handleCloseDialog}
          sx={{
            maxWidth: 452,
          }}
        >
          <Stack sx={{ gap: 2, p: 0.125 }}>
            <Stack sx={{ gap: 1 }}>
              <TextField
                label={translateUi(
                  'ui.sections.account.work_education.educationhistorysection.institution_name_b6544303',
                )}
                error={!!errors.institutionName}
                helperText={errors.institutionName?.message}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        {selectedEducation?.institutionLogo ? (
                          <Image
                            src={selectedEducation?.institutionLogo}
                            alt=""
                            width={20}
                            height={20}
                          />
                        ) : (
                          <IconifyIcon icon="material-symbols:account-balance-outline-rounded" />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
                {...register('institutionName')}
              />
              <TextField
                label={translateUi(
                  'ui.sections.account.work_education.educationhistorysection.degree_field_of_study_8dcf3120',
                )}
                fullWidth
                error={!!errors.subject}
                helperText={errors.subject?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon icon="material-symbols:work-outline" />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register('subject')}
              />
            </Stack>
            <TextField
              label={translateUi(
                'ui.sections.account.work_education.educationhistorysection.location_d219c681',
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
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1, width: 1 }}>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { value, onChange, ...rest } }) => (
                  <DatePicker
                    label={translateUi(
                      'ui.sections.account.work_education.educationhistorysection.start_date_9d7ab1a5',
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
                      'ui.sections.account.work_education.educationhistorysection.end_date_84b14781',
                    )}
                    value={dayjs(value)}
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
export default EducationHistorySection;
