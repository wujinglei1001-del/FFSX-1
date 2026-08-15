import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, Divider, Link, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import PasswordTextField from 'components/common/PasswordTextField';
import ViewOnlyAlert from '../common/ViewOnlyAlert';
import SocialAuth from './SocialAuth';

const schema = yup
  .object({
    name: yup
      .string()
      .required(
        i18n.t('ui.sections.authentications.default.signupform.this_field_is_required_dedbaded'),
      ),
    email: yup
      .string()
      .email(
        i18n.t(
          'ui.sections.authentications.default.signupform.please_provide_a_valid_email_address_09016875',
        ),
      )
      .required(
        i18n.t('ui.sections.authentications.default.signupform.this_field_is_required_dedbaded'),
      ),
    password: yup
      .string()
      .required(
        i18n.t('ui.sections.authentications.default.signupform.this_field_is_required_dedbaded'),
      ),
  })
  .required();

const SignupForm = ({ provider = 'jwt', handleSignup, socialAuth = true, loginLink }) => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await handleSignup(data).catch((error) => {
      if (error) {
        setError('root.credential', { type: 'manual', message: error.message });
      }
    });
  };

  return (
    <Stack
      sx={{
        height: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: { md: 10 },
        pb: 10,
      }}
    >
      <div />

      <Grid
        container
        sx={{
          height: 1,
          maxWidth: '35rem',
          rowGap: 4,
          alignContent: { md: 'center' },
          p: { xs: 3, sm: 5 },
          mb: 5,
        }}
      >
        {provider === 'firebase' && import.meta.env.VITE_BUILD_MODE === 'production' && (
          <Grid size={12} sx={{ mb: 1 }}>
            <ViewOnlyAlert docLink="https://aurora.themewagon.com/documentation/authentication#firebase" />
          </Grid>
        )}
        <Grid size={12}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              gap: 1,
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'flex-end' },
            }}
          >
            <Typography variant="h4">
              {translateUi('ui.sections.authentications.default.signupform.sign_up_0b81497c')}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
              }}
            >
              {translateUi(
                'ui.sections.authentications.default.signupform.already_have_an_account_8559034a',
              )}
              <Link href={loginLink} sx={{ ml: 1 }}>
                {translateUi('ui.sections.authentications.default.signupform.log_in_f7c400ed')}
              </Link>
            </Typography>
          </Stack>
        </Grid>
        {socialAuth && (
          <>
            <Grid size={12}>
              <SocialAuth />
            </Grid>
            <Grid size={12}>
              <Divider sx={{ color: 'text.secondary' }}>
                {translateUi(
                  'ui.sections.authentications.default.signupform.or_use_email_be1bca91',
                )}
              </Divider>
            </Grid>
          </>
        )}
        <Grid size={12}>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.credential?.message && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.root?.credential?.message}
              </Alert>
            )}
            <Grid container>
              <Grid
                sx={{
                  mb: 3,
                }}
                size={12}
              >
                <TextField
                  fullWidth
                  size="large"
                  id="name"
                  type="text"
                  label={translateUi(
                    'ui.sections.authentications.default.signupform.name_709a2322',
                  )}
                  variant="filled"
                  error={!!errors.name}
                  helperText={<>{errors.name?.message}</>}
                  {...register('name')}
                />
              </Grid>
              <Grid
                sx={{
                  mb: 3,
                }}
                size={12}
              >
                <TextField
                  fullWidth
                  size="large"
                  id="email"
                  type="email"
                  label={translateUi(
                    'ui.sections.authentications.default.signupform.email_84add5b2',
                  )}
                  variant="filled"
                  error={!!errors.email}
                  helperText={<>{errors.email?.message}</>}
                  {...register('email')}
                />
              </Grid>
              <Grid
                sx={{
                  mb: 4,
                }}
                size={12}
              >
                <PasswordTextField
                  fullWidth
                  size="large"
                  id="password"
                  label={translateUi(
                    'ui.sections.authentications.default.signupform.password_8be3c943',
                  )}
                  variant="filled"
                  error={!!errors.password}
                  helperText={<>{errors.password?.message}</>}
                  {...register('password')}
                />
              </Grid>
              <Grid
                sx={{
                  mb: 2.5,
                }}
                size={12}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  <IconifyIcon
                    icon="material-symbols:info-outline-rounded"
                    fontSize={16}
                    color="warning.main"
                    sx={{ verticalAlign: 'text-bottom' }}
                  />{' '}
                  {translateUi(
                    'ui.sections.authentications.default.signupform.this_site_is_protected_by_recaptcha_and_the_google_p_9da1042c',
                  )}{' '}
                  <Link href="#!">
                    {translateUi(
                      'ui.sections.authentications.default.signupform.terms_and_conditions_0aee34d9',
                    )}
                  </Link>
                </Typography>
              </Grid>
              <Grid size={12}>
                <Button
                  loading={isSubmitting}
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                >
                  {translateUi(
                    'ui.sections.authentications.default.signupform.create_account_eff4fd86',
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Link href="#!" variant="subtitle2" sx={{ flex: 1 }}>
        {translateUi('ui.sections.authentications.default.signupform.trouble_signing_in_363e4476')}
      </Link>
    </Stack>
  );
};

export default SignupForm;
