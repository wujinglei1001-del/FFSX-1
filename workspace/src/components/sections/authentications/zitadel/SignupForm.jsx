import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import PasswordTextField from 'components/common/PasswordTextField';

const schema = yup
  .object({
    givenName: yup.string().trim().required(i18n.t('ffax.auth.validation.required')),
    familyName: yup.string().trim().required(i18n.t('ffax.auth.validation.required')),
    email: yup
      .string()
      .trim()
      .email(i18n.t('ffax.auth.validation.email'))
      .required(i18n.t('ffax.auth.validation.required')),
    password: yup
      .string()
      .min(8, i18n.t('ffax.auth.validation.password_length'))
      .required(i18n.t('ffax.auth.validation.required')),
  })
  .required();

const SignupForm = ({ handleSignup, loginLink, disabled = false }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      givenName: '',
      familyName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    await handleSignup(data).catch((error) => {
      setError('root.credential', {
        type: 'manual',
        message: error?.message || t('ffax.auth.signup.failed'),
      });
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
          maxWidth: '35rem',
          rowGap: 4,
          p: { xs: 3, sm: 5 },
          mb: 5,
        }}
      >
        <Grid size={12}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              gap: 1,
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'flex-end' },
            }}
          >
            <Typography variant="h4">{t('ffax.auth.signup.title')}</Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {t('ffax.auth.signup.existing_account')}
              <Link component={RouterLink} to={loginLink} sx={{ ml: 1 }}>
                {t('ffax.auth.login')}
              </Link>
            </Typography>
          </Stack>
        </Grid>

        <Grid size={12}>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.credential?.message && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.root.credential.message}
              </Alert>
            )}

            <Grid container>
              <Grid size={12} sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="large"
                      id="givenName"
                      type="text"
                      label={t('ffax.auth.signup.given_name')}
                      variant="filled"
                      disabled={disabled}
                      error={!!errors.givenName}
                      helperText={<>{errors.givenName?.message}</>}
                      {...register('givenName')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="large"
                      id="familyName"
                      type="text"
                      label={t('ffax.auth.signup.family_name')}
                      variant="filled"
                      disabled={disabled}
                      error={!!errors.familyName}
                      helperText={<>{errors.familyName?.message}</>}
                      {...register('familyName')}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={12} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  size="large"
                  id="email"
                  type="email"
                  label={t('ffax.auth.signup.email')}
                  variant="filled"
                  disabled={disabled}
                  error={!!errors.email}
                  helperText={<>{errors.email?.message}</>}
                  {...register('email')}
                />
              </Grid>

              <Grid size={12} sx={{ mb: 4 }}>
                <PasswordTextField
                  fullWidth
                  size="large"
                  id="password"
                  label={t('ffax.auth.signup.password')}
                  variant="filled"
                  disabled={disabled}
                  error={!!errors.password}
                  helperText={<>{errors.password?.message}</>}
                  {...register('password')}
                />
              </Grid>

              <Grid size={12}>
                <Button
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={disabled}
                >
                  {t('ffax.auth.signup.create_account')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <div />
    </Stack>
  );
};

export default SignupForm;
