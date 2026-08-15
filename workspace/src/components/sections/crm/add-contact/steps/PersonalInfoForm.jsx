import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import AvatarDropBox from 'components/base/AvatarDropBox';
import NumberTextField from 'components/base/NumberTextField';
import ContactFormSection from 'components/sections/crm/add-contact/ContactFormSection';
import ControlledSelect from 'components/sections/crm/add-contact/ControlledSelect';

export const personalInfoSchema = yup.object({
  personalInfo: yup.object({
    profileImage: yup
      .mixed()
      .required(i18n.t('ui.sections.crm.add_contact.steps.profile_picture_is_required_354e882a')),
    firstName: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    lastName: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    workEmail: yup
      .string()
      .email(i18n.t('ui.sections.crm.add_contact.steps.invalid_email_format_789ec25c'))
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    personalEmail: yup
      .string()
      .email(i18n.t('ui.sections.crm.add_contact.steps.invalid_email_format_789ec25c'))
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    phoneNumber: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.phone_number_is_required_51a25ff7')),
    alternatePhoneNumber: yup.string().notRequired(),
    dateOfBirth: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    jobTitle: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    status: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    linkedInUrl: yup.string().url('Invalid URL').optional(),
    note: yup.string().optional(),
  }),
});
const PersonalInfoForm = ({ label }) => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <Box sx={{ mb: 4.5 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {label}
        </Typography>
        <Divider />
      </Box>
      <Stack sx={{ gap: 4 }}>
        <ContactFormSection
          title={translateUi('ui.sections.crm.add_contact.steps.profile_picture_ea918c42')}
        >
          <Controller
            control={control}
            name="personalInfo.profileImage"
            render={({ field: { value, onChange } }) => {
              return (
                <AvatarDropBox
                  defaultFile={value}
                  onDrop={(acceptedFiles) => {
                    if (acceptedFiles.length > 0) {
                      onChange(acceptedFiles[0]);
                    }
                  }}
                  sx={{
                    '& img': {
                      objectFit: 'cover',
                    },
                  }}
                  error={errors.personalInfo?.profileImage ? 'Invalid avatar' : undefined}
                />
              );
            }}
          />
          {errors.personalInfo?.profileImage?.message && (
            <FormHelperText error>{errors.personalInfo?.profileImage?.message}</FormHelperText>
          )}
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
            }}
          >
            {translateUi(
              'ui.sections.crm.add_contact.steps.jpg_or_png_recommended_size_1_1_up_to_10mb_f6dd99f5',
            )}
          </Typography>
        </ContactFormSection>
        <ContactFormSection
          title={translateUi('ui.sections.crm.add_contact.steps.basic_information_b0d5be39')}
        >
          <Grid container spacing={2} sx={{ width: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.first_name_b6ea992a')}
                error={!!errors.personalInfo?.firstName}
                helperText={errors.personalInfo?.firstName?.message}
                {...register('personalInfo.firstName')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.last_name_863cb39f')}
                error={!!errors.personalInfo?.lastName}
                helperText={errors.personalInfo?.lastName?.message}
                {...register('personalInfo.lastName')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.work_email_f6c07b41')}
                type="email"
                error={!!errors.personalInfo?.workEmail}
                helperText={errors.personalInfo?.workEmail?.message}
                {...register('personalInfo.workEmail')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.personal_email_71f7b5ad')}
                type="email"
                error={!!errors.personalInfo?.personalEmail}
                helperText={errors.personalInfo?.personalEmail?.message}
                {...register('personalInfo.personalEmail')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <NumberTextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.phone_number_ab25d61b')}
                error={!!errors.personalInfo?.phoneNumber}
                helperText={errors.personalInfo?.phoneNumber?.message}
                {...register('personalInfo.phoneNumber')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <NumberTextField
                fullWidth
                label={translateUi(
                  'ui.sections.crm.add_contact.steps.alternate_phone_number_145953a1',
                )}
                error={!!errors.personalInfo?.alternatePhoneNumber}
                helperText={errors.personalInfo?.alternatePhoneNumber?.message}
                {...register('personalInfo.alternatePhoneNumber')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl variant="filled" fullWidth={true}>
                <Controller
                  name="personalInfo.dateOfBirth"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        label={translateUi(
                          'ui.sections.crm.add_contact.steps.date_of_birth_13316059',
                        )}
                        disableFuture
                        format="DD/MM/YYYY"
                        value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
                        onChange={(newValue) => {
                          const formattedDate = newValue?.format('DD/MM/YYYY');
                          field.onChange(formattedDate || '');
                        }}
                        slotProps={{
                          textField: {
                            error: !!errors.personalInfo?.dateOfBirth,
                            helperText: errors.personalInfo?.dateOfBirth?.message,
                          },
                        }}
                      />
                    );
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </ContactFormSection>

        <ContactFormSection
          title={translateUi('ui.sections.crm.add_contact.steps.professional_details_5970ab1c')}
        >
          <Grid container spacing={2} sx={{ width: 1 }}>
            <Grid size={6}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.job_title_d4297792')}
                error={!!errors.personalInfo?.jobTitle}
                helperText={errors.personalInfo?.jobTitle?.message}
                {...register('personalInfo.jobTitle')}
              />
            </Grid>
            <Grid size={6}>
              <ControlledSelect
                name="personalInfo.status"
                label={translateUi('ui.sections.crm.add_contact.steps.status_bae7d5be')}
                options={[
                  {
                    value: 'currentlyWorking',
                    label: translateUi(
                      'ui.sections.crm.add_contact.steps.currently_working_23fd7840',
                    ),
                  },
                  {
                    value: 'notWorking',
                    label: translateUi('ui.sections.crm.add_contact.steps.not_working_0ed7565a'),
                  },
                  {
                    value: 'seekingOpportunities',
                    label: translateUi(
                      'ui.sections.crm.add_contact.steps.seeking_opportunities_aced9268',
                    ),
                  },
                ]}
                control={control}
                error={errors.personalInfo?.status?.message}
              />
            </Grid>
          </Grid>
        </ContactFormSection>

        <ContactFormSection
          title={translateUi('ui.sections.crm.add_contact.steps.additional_information_ecfe29ef')}
        >
          <TextField
            fullWidth
            label={
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 400,
                }}
              >
                {translateUi('ui.sections.crm.add_contact.steps.linkedin_url_05ef943f')}
                <Box component="span" sx={{ color: 'text.disabled', ml: 0.5 }}>
                  {translateUi('ui.sections.crm.add_contact.steps.optional_d2bb786c')}
                </Box>
              </Typography>
            }
            error={!!errors.personalInfo?.linkedInUrl}
            helperText={errors.personalInfo?.linkedInUrl?.message}
            {...register('personalInfo.linkedInUrl')}
          />

          <TextField
            fullWidth
            label={
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 400,
                }}
              >
                {translateUi('ui.sections.crm.add_contact.steps.add_note_757092db')}
                <Box component="span" sx={{ color: 'text.disabled', ml: 0.5 }}>
                  {translateUi('ui.sections.crm.add_contact.steps.optional_d2bb786c')}
                </Box>
              </Typography>
            }
            multiline
            rows={3}
            error={!!errors.personalInfo?.note}
            helperText={errors.personalInfo?.note?.message}
            {...register('personalInfo.note')}
          />
        </ContactFormSection>
      </Stack>
    </div>
  );
};
export default PersonalInfoForm;
