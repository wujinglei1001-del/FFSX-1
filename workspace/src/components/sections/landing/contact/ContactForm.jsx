import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  Stack,
  Switch,
  Typography,
  inputBaseClasses,
} from '@mui/material';
import { externalLinks } from 'config';
import i18n from 'locales/i18n';
import { useSubmitContactRequest } from 'services/swr/api-hooks/useContactApi';
import * as yup from 'yup';
import StyledTextField from 'components/styled/StyledTextField';
import RevealText from '../common/RevealText';
import SectionHeader from '../common/SectionHeader';

const contactFormSchema = yup.object({
  firstName: yup.string().required(i18n.t('ffax.public.contact.validation.first_name')),
  lastName: yup.string().required(i18n.t('ffax.public.contact.validation.last_name')),
  email: yup
    .string()
    .email(i18n.t('ffax.public.contact.validation.email_invalid'))
    .required(i18n.t('ffax.public.contact.validation.email_required')),
  phone: yup.string().required(i18n.t('ffax.public.contact.validation.phone')),
  company: yup.string().required(i18n.t('ffax.public.contact.validation.company')),
  purpose: yup.string().required(i18n.t('ffax.public.contact.validation.purpose')),
  policyChecked: yup
    .boolean()
    .oneOf([true], i18n.t('ffax.public.contact.validation.consent'))
    .required(i18n.t('ffax.public.contact.validation.consent')),
});
const ContactForm = () => {
  const { t: translateUi } = useTranslation();
  const [searchParams] = useSearchParams();
  const { trigger: submitContactRequest } = useSubmitContactRequest();
  const methods = useForm({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      purpose:
        searchParams.get('topic') === 'subscription'
          ? translateUi('ffax.contact.subscription_inquiry')
          : '',
      policyChecked: false,
    },
  });
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = methods;
  const onSubmitHandler = async (data) => {
    try {
      await submitContactRequest({
        ...data,
        policyAccepted: data.policyChecked,
        topic: searchParams.get('topic') === 'subscription' ? 'subscription' : 'general',
        locale: i18n.resolvedLanguage || i18n.language,
      });
      reset();
    } catch {
      setError('root.submit', {
        type: 'server',
        message: translateUi('ffax.public.contact.send_failed'),
      });
    }
  };
  return (
    <Stack>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <SectionHeader
          title={translateUi('ffax.public.contact.form_title')}
          subtitle={translateUi('ffax.public.contact.form_subtitle')}
          sx={{ mb: 2 }}
        />

        <RevealText>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translateUi('ffax.public.contact.description')}
          </Typography>
        </RevealText>
      </Box>
      <FormProvider {...methods}>
        <Stack component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            {translateUi('ffax.public.contact.personal_information')}
          </Typography>

          <Grid container spacing={1} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <StyledTextField
                type="text"
                fullWidth
                variant="filled"
                size="large"
                placeholder={translateUi('ffax.public.contact.first_name')}
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                slotProps={{
                  input: {
                    sx: {
                      [`& .${inputBaseClasses.input}`]: {
                        color: 'text.secondary',
                        padding: '9px 16px !important',
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <StyledTextField
                type="text"
                fullWidth
                variant="filled"
                size="large"
                placeholder={translateUi('ffax.public.contact.last_name')}
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                slotProps={{
                  input: {
                    sx: {
                      [`& .${inputBaseClasses.input}`]: {
                        color: 'text.secondary',
                        padding: '9px 16px !important',
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <StyledTextField
                type="email"
                fullWidth
                variant="filled"
                size="large"
                placeholder={translateUi('ffax.public.contact.email')}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                slotProps={{
                  input: {
                    sx: {
                      [`& .${inputBaseClasses.input}`]: {
                        color: 'text.secondary',
                        padding: '9px 16px !important',
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <StyledTextField
                type="text"
                fullWidth
                variant="filled"
                size="large"
                placeholder={translateUi('ffax.public.contact.phone_field')}
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                slotProps={{
                  input: {
                    sx: {
                      [`& .${inputBaseClasses.input}`]: {
                        color: 'text.secondary',
                        padding: '9px 16px !important',
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <StyledTextField
                type="text"
                fullWidth
                size="large"
                placeholder={translateUi('ffax.public.contact.company')}
                variant="filled"
                {...register('company')}
                error={!!errors.company}
                helperText={errors.company?.message}
                slotProps={{
                  input: {
                    sx: {
                      [`& .${inputBaseClasses.input}`]: {
                        color: 'text.secondary',
                        padding: '9px 16px !important',
                      },
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            {translateUi('ffax.public.contact.purpose')}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <StyledTextField
              type="text"
              fullWidth
              size="large"
              placeholder={translateUi('ffax.public.contact.message')}
              variant="filled"
              {...register('purpose')}
              error={!!errors.purpose}
              helperText={errors.purpose?.message}
              slotProps={{
                input: {
                  sx: {
                    [`& .${inputBaseClasses.input}`]: {
                      color: 'text.secondary',
                      padding: '9px 16px !important',
                    },
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <FormControl error={!!errors.policyChecked}>
              <FormControlLabel
                control={<Switch {...register('policyChecked')} />}
                label={
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {externalLinks.legal.privacy ? (
                      <>
                        {translateUi('ffax.public.contact.consent_prefix')}{' '}
                        <Box
                          component={Link}
                          href={externalLinks.legal.privacy}
                          sx={{ fontWeight: 500 }}
                        >
                          {translateUi('ffax.public.contact.privacy_policy')}
                        </Box>
                        {translateUi('ffax.public.contact.consent_suffix')}
                      </>
                    ) : (
                      translateUi('ffax.public.contact.consent_without_policy')
                    )}
                  </Typography>
                }
                sx={{ gap: 1, marginLeft: 0 }}
              />
              {errors.policyChecked && (
                <FormHelperText error sx={{ mx: 1 }}>
                  {errors.policyChecked.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>

          {isSubmitSuccessful && !errors.root?.submit && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {translateUi('ffax.public.contact.sent')}
            </Alert>
          )}
          {errors.root?.submit && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.root.submit.message}
            </Alert>
          )}

          <Button
            type="submit"
            variant="soft"
            color="primary"
            loading={isSubmitting}
            sx={{ width: 220 }}
          >
            {translateUi('ffax.public.contact.send')}
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};
export default ContactForm;
