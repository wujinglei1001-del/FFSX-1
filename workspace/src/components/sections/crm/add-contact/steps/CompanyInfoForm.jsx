import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Divider,
  FormHelperText,
  InputAdornment,
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
import IconifyIcon from 'components/base/IconifyIcon';
import NumberTextField from 'components/base/NumberTextField';
import ContactFormSection from 'components/sections/crm/add-contact/ContactFormSection';
import ControlledSelect from 'components/sections/crm/add-contact/ControlledSelect';

export const companyInfoSchema = yup.object().shape({
  companyInfo: yup.object({
    avatar: yup
      .mixed()
      .required(i18n.t('ui.sections.crm.add_contact.steps.avatar_is_required_fc059e07')),
    companyName: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    industryType: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    foundingYear: yup
      .string()
      .nullable()
      .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
    contact: yup.object({
      officialEmail: yup
        .string()
        .email(i18n.t('ui.sections.crm.add_contact.steps.invalid_email_format_789ec25c'))
        .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
      phoneNumber: yup
        .string()
        .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
      streetAddress: yup
        .string()
        .required(i18n.t('ui.sections.crm.add_contact.steps.this_field_is_required_dedbaded')),
      city: yup
        .string()
        .required(i18n.t('ui.sections.crm.add_contact.steps.city_is_required_2b1145f8')),
      state: yup
        .string()
        .required(i18n.t('ui.sections.crm.add_contact.steps.state_is_required_63e36a8e')),
      country: yup
        .string()
        .required(i18n.t('ui.sections.crm.add_contact.steps.country_is_required_66a0de60')),
      zipCode: yup
        .string()
        .required(i18n.t('ui.sections.crm.add_contact.steps.zip_code_is_required_7ea92f6c')),
    }),
    website: yup.string().url('Invalid website URL').optional(),
    note: yup.string().optional(),
  }),
});
const industryOptions = [
  {
    value: 'technology',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.technology_d018b082');
    },
  },
  {
    value: 'finance',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.finance_banking_3a6e7b46');
    },
  },
  {
    value: 'healthcare',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.healthcare_pharmaceuticals_424864d5');
    },
  },
  {
    value: 'manufacturing',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.manufacturing_0471386e');
    },
  },
  {
    value: 'retail',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.retail_e_commerce_c99164b0');
    },
  },
  {
    value: 'marketing',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.marketing_advertising_51fca27f');
    },
  },
  {
    value: 'hospitality',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.hospitality_tourism_9a1237a1');
    },
  },
  {
    value: 'energy',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.energy_utilities_b5e2483c');
    },
  },
  {
    value: 'government',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.government_public_services_e6c982f3');
    },
  },
];
const CompanyInfoForm = ({ label }) => {
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
          title={translateUi('ui.sections.crm.add_contact.steps.company_logo_b2d0bdaa')}
        >
          <Controller
            control={control}
            name="companyInfo.avatar"
            render={({ field: { value, onChange } }) => {
              return (
                <AvatarDropBox
                  defaultFile={value}
                  onDrop={(acceptedFiles) => {
                    if (acceptedFiles.length > 0) {
                      onChange(acceptedFiles[0]);
                    }
                  }}
                  error={errors.companyInfo?.avatar ? 'Invalid avatar' : undefined}
                />
              );
            }}
          />
          {errors.companyInfo?.avatar?.message && (
            <FormHelperText error>{errors.companyInfo.avatar.message}</FormHelperText>
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
          title={translateUi('ui.sections.crm.add_contact.steps.company_details_934fd4f2')}
        >
          <TextField
            fullWidth
            label={translateUi('ui.sections.crm.add_contact.steps.company_name_8599f5cc')}
            error={!!errors.companyInfo?.companyName}
            helperText={errors.companyInfo?.companyName?.message}
            {...register('companyInfo.companyName')}
          />
          <Grid container spacing={2} sx={{ width: 1 }}>
            <Grid size={6}>
              <ControlledSelect
                name="companyInfo.industryType"
                label={translateUi('ui.sections.crm.add_contact.steps.industry_type_ac6c65bd')}
                options={industryOptions}
                control={control}
                error={errors.companyInfo?.industryType?.message}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                control={control}
                name="companyInfo.foundingYear"
                render={({ field: { value, onChange, ...rest } }) => (
                  <DatePicker
                    views={['year']}
                    disableFuture
                    openTo="year"
                    label={translateUi('ui.sections.crm.add_contact.steps.founding_year_5fb8b20a')}
                    value={value ? dayjs(value) : null}
                    onChange={(date) => onChange(date ? date.toString() : null)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.companyInfo?.foundingYear,
                        helperText: errors.companyInfo?.foundingYear?.message,
                      },
                    }}
                    sx={{ width: 1 }}
                    {...rest}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ContactFormSection>

        <ContactFormSection
          title={translateUi('ui.sections.crm.add_contact.steps.contact_information_a34b69fc')}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.official_email_72c7ee91')}
                error={!!errors.companyInfo?.contact?.officialEmail}
                helperText={errors.companyInfo?.contact?.officialEmail?.message}
                {...register('companyInfo.contact.officialEmail')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <NumberTextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.phone_number_ab25d61b')}
                error={!!errors.companyInfo?.contact?.phoneNumber}
                helperText={errors.companyInfo?.contact?.phoneNumber?.message}
                {...register('companyInfo.contact.phoneNumber')}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.street_address_ea00c66e')}
                error={!!errors.companyInfo?.contact?.streetAddress}
                helperText={errors.companyInfo?.contact?.streetAddress?.message}
                {...register('companyInfo.contact.streetAddress')}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.city_4271627f')}
                error={!!errors.companyInfo?.contact?.city}
                helperText={errors.companyInfo?.contact?.city?.message}
                {...register('companyInfo.contact.city')}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.state_a7250206')}
                error={!!errors.companyInfo?.contact?.state}
                helperText={errors.companyInfo?.contact?.state?.message}
                {...register('companyInfo.contact.state')}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.country_d523ebbd')}
                error={!!errors.companyInfo?.contact?.country}
                helperText={errors.companyInfo?.contact?.country?.message}
                {...register('companyInfo.contact.country')}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <NumberTextField
                fullWidth
                label={translateUi('ui.sections.crm.add_contact.steps.zip_code_35d55624')}
                error={!!errors.companyInfo?.contact?.zipCode}
                helperText={errors.companyInfo?.contact?.zipCode?.message}
                {...register('companyInfo.contact.zipCode')}
              />
            </Grid>
          </Grid>
        </ContactFormSection>

        <ContactFormSection
          title={translateUi('ui.sections.crm.add_contact.steps.additional_information_ecfe29ef')}
        >
          <TextField
            label={
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 400,
                }}
              >
                {translateUi('ui.sections.crm.add_contact.steps.website_2e8a57cc')}
                <Box component="span" sx={{ color: 'text.disabled', ml: 0.5 }}>
                  {translateUi('ui.sections.crm.add_contact.steps.optional_d2bb786c')}
                </Box>
              </Typography>
            }
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconifyIcon icon="material-symbols:language" />
                  </InputAdornment>
                ),
              },
            }}
            error={!!errors.companyInfo?.website}
            helperText={errors.companyInfo?.website?.message}
            {...register('companyInfo.website')}
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
            {...register('companyInfo.note')}
          />
        </ContactFormSection>
      </Stack>
    </div>
  );
};
export default CompanyInfoForm;
