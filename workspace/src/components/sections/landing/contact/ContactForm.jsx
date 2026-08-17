import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
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
import i18n from 'locales/i18n';
import * as yup from 'yup';
import StyledTextField from 'components/styled/StyledTextField';
import RevealText from '../common/RevealText';
import SectionHeader from '../common/SectionHeader';

const contactFormSchema = yup.object({
  firstName: yup
    .string()
    .required(i18n.t('ui.sections.landing.contact.contactform.first_name_is_required_fd5f7f4c')),
  lastName: yup
    .string()
    .required(i18n.t('ui.sections.landing.contact.contactform.last_name_is_required_a077f216')),
  email: yup
    .string()
    .email(i18n.t('ui.sections.landing.contact.contactform.email_must_be_a_valid_email_8ab7d26c'))
    .required(i18n.t('ui.sections.landing.contact.contactform.email_is_required_c79fce0e')),
  phone: yup
    .string()
    .required(i18n.t('ui.sections.landing.contact.contactform.phone_number_is_required_ad2bfd0b')),
  company: yup
    .string()
    .required(i18n.t('ui.sections.landing.contact.contactform.company_is_required_8e6ec6c8')),
  purpose: yup
    .string()
    .required(i18n.t('ui.sections.landing.contact.contactform.purpose_is_required_a435eb58')),
  policyChecked: yup
    .boolean()
    .oneOf(
      [true],
      i18n.t('ui.sections.landing.contact.contactform.you_must_accept_the_privacy_policy_c63e10f6'),
    )
    .required(i18n.t('ui.sections.landing.contact.contactform.policy_is_required_9de372ac')),
});
const ContactForm = () => {
  const { t: translateUi } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      purpose: '',
      policyChecked: false,
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const onSubmitHandler = (data) => {
    const subject = encodeURIComponent(`FFAX 官网咨询 - ${data.company}`);
    const body = encodeURIComponent(
      `姓名：${data.firstName} ${data.lastName}\n邮箱：${data.email}\n电话：${data.phone}\n公司：${data.company}\n\n咨询内容：\n${data.purpose}`,
    );
    window.location.href = `mailto:hello@ffax.com?subject=${subject}&body=${body}`;
  };
  return (
    <Stack>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <SectionHeader
          title={translateUi('common_labels.contact')}
          subtitle={translateUi('ui.sections.landing.contact.contactform.get_in_touch_c49bb4c2')}
          sx={{ mb: 2 }}
        />

        <RevealText>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translateUi(
              'ui.sections.landing.contact.contactform.reach_out_to_us_anytime_we_re_here_to_help_with_your_8a8aaf2b',
            )}{' '}
            <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
              {translateUi('ui.sections.landing.contact.contactform.and_support_cf452fff')}
            </Box>
            .
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
            {translateUi('ui.sections.landing.contact.contactform.personal_information_ad12e422')}
          </Typography>

          <Grid container spacing={1} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <StyledTextField
                type="text"
                fullWidth
                variant="filled"
                size="large"
                placeholder={translateUi(
                  'ui.sections.landing.contact.contactform.first_name_b6ea992a',
                )}
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
                placeholder={translateUi(
                  'ui.sections.landing.contact.contactform.last_name_863cb39f',
                )}
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
                placeholder={translateUi('ui.sections.landing.contact.contactform.email_84add5b2')}
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
                placeholder={translateUi('ui.sections.landing.contact.contactform.phone_77064d52')}
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
                placeholder={translateUi(
                  'ui.sections.landing.contact.contactform.company_7a199499',
                )}
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
            {translateUi('ui.sections.landing.contact.contactform.purposes_9f4de44b')}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <StyledTextField
              type="text"
              fullWidth
              size="large"
              placeholder={translateUi('ui.sections.landing.contact.contactform.message_68f4145f')}
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
                    {translateUi(
                      'ui.sections.landing.contact.contactform.by_selecting_this_you_agree_to_our_0b7dbb8e',
                    )}{' '}
                    <Link href="#!" sx={{ fontWeight: 500 }}>
                      {translateUi(
                        'ui.sections.landing.contact.contactform.privacy_policy_bfdb392a',
                      )}
                    </Link>
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

          <Button type="submit" variant="soft" color="primary" sx={{ width: 220 }}>
            {translateUi('ui.sections.landing.contact.contactform.send_message_c70a890d')}
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};
export default ContactForm;
