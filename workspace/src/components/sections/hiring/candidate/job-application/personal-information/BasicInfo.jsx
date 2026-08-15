import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AvatarDropBox from 'components/base/AvatarDropBox';
import ApplicationFormSection from '../common/ApplicationFormSection';

const BasicInfo = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <ApplicationFormSection name="Basic">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          gap: 4,
          alignItems: { xs: 'center', sm: 'stretch' },
        }}
      >
        <Box sx={{ py: { sm: 2 } }}>
          <Controller
            control={control}
            name="personalInfo.basic.avatar"
            render={({ field: { value, onChange } }) => {
              return (
                <AvatarDropBox
                  defaultFile={value}
                  onDrop={(acceptedFiles) => {
                    if (acceptedFiles.length > 0) {
                      onChange(acceptedFiles[0]);
                    }
                  }}
                  error={errors.personalInfo?.basic?.avatar ? 'Invalid avatar' : undefined}
                />
              );
            }}
          />
        </Box>
        <Grid container spacing={1}>
          <Grid size={6}>
            <TextField
              label={translateUi(
                'ui.sections.hiring.candidate.job_application.first_name_b6ea992a',
              )}
              fullWidth
              error={!!errors.personalInfo?.basic?.firstName}
              helperText={errors.personalInfo?.basic?.firstName?.message}
              {...register('personalInfo.basic.firstName')}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label={translateUi('ui.sections.hiring.candidate.job_application.last_name_863cb39f')}
              fullWidth
              error={!!errors.personalInfo?.basic?.lastName}
              helperText={errors.personalInfo?.basic?.lastName?.message}
              {...register('personalInfo.basic.lastName')}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label={translateUi('ui.sections.hiring.candidate.job_application.email_84add5b2')}
              fullWidth
              error={!!errors.personalInfo?.basic?.email}
              helperText={errors.personalInfo?.basic?.email?.message}
              {...register('personalInfo.basic.email')}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label={translateUi('ui.sections.hiring.candidate.job_application.phone_no_8578b945')}
              fullWidth
              error={!!errors.personalInfo?.basic?.phone}
              helperText={errors.personalInfo?.basic?.phone?.message}
              {...register('personalInfo.basic.phone')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label={translateUi(
                'ui.sections.hiring.candidate.job_application.current_address_04dbe0f3',
              )}
              fullWidth
              error={!!errors.personalInfo?.basic?.currentAddress}
              helperText={errors.personalInfo?.basic?.currentAddress?.message}
              {...register('personalInfo.basic.currentAddress')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label={translateUi(
                'ui.sections.hiring.candidate.job_application.permanent_address_b1bfe9e9',
              )}
              fullWidth
              error={!!errors.personalInfo?.basic?.permanentAddress}
              helperText={errors.personalInfo?.basic?.permanentAddress?.message}
              {...register('personalInfo.basic.permanentAddress')}
            />
          </Grid>
        </Grid>
      </Stack>
    </ApplicationFormSection>
  );
};

export default BasicInfo;
