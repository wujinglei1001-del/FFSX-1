import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import PasswordTextField from 'components/common/PasswordTextField';
import DefaultCredentialAlert from '../common/DefaultCredentialAlert';
import ViewOnlyAlert from '../common/ViewOnlyAlert';
import SocialAuth from './SocialAuth';

const schema = yup
  .object({
    email: yup
      .string()
      .required(
        i18n.t('ui.sections.authentications.default.loginform.this_field_is_required_dedbaded'),
      ),
    password: yup
      .string()
      .required(
        i18n.t('ui.sections.authentications.default.loginform.this_field_is_required_dedbaded'),
      ),
  })
  .required();

const LoginForm = ({
  provider = 'jwt',
  handleLogin,
  signUpLink,
  forgotPasswordLink,
  socialAuth = true,
  rememberDevice = true,
  defaultCredential,
}) => {
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
    await handleLogin(data).catch((error) => {
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
          maxWidth: '35rem',
          rowGap: 4,
          p: { xs: 3, sm: 5 },
          mb: 5,
        }}
      >
        {provider === 'firebase' && import.meta.env.VITE_BUILD_MODE === 'production' && (
          <Grid size={12} sx={{ mb: 1 }}>
            <ViewOnlyAlert
              docLink={`https://aurora.themewagon.com/documentation/authentication#firebase`}
            />
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
              {translateUi('ui.sections.authentications.default.loginform.log_in_f7c400ed')}
            </Typography>
            {signUpLink && (
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {translateUi(
                  'ui.sections.authentications.default.loginform.don_t_have_an_account_f838dc11',
                )}
                <Link href={signUpLink} sx={{ ml: 1 }}>
                  {translateUi('ui.sections.authentications.default.loginform.sign_up_0b81497c')}
                </Link>
              </Typography>
            )}
          </Stack>
        </Grid>
        {socialAuth && (
          <>
            <Grid size={12}>
              <SocialAuth />
            </Grid>
            <Grid size={12}>
              <Divider sx={{ color: 'text.secondary' }}>
                {translateUi('ui.sections.authentications.default.loginform.or_use_email_be1bca91')}
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
            {defaultCredential && <DefaultCredentialAlert />}
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
                  id="email"
                  type="text"
                  label={translateUi(
                    'ui.sections.authentications.default.loginform.login_name_or_email',
                  )}
                  defaultValue={defaultCredential?.email}
                  error={!!errors.email}
                  helperText={<>{errors.email?.message}</>}
                  {...register('email')}
                />
              </Grid>
              <Grid
                sx={{
                  mb: 2.5,
                }}
                size={12}
              >
                <PasswordTextField
                  fullWidth
                  size="large"
                  id="password"
                  label={translateUi(
                    'ui.sections.authentications.default.loginform.password_8be3c943',
                  )}
                  defaultValue={defaultCredential?.password}
                  error={!!errors.password}
                  helperText={<>{errors.password?.message}</>}
                  {...register('password')}
                />
              </Grid>
              <Grid
                sx={{
                  mb: 6,
                }}
                size={12}
              >
                <Stack
                  direction="row"
                  sx={{
                    gap: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {rememberDevice && (
                    <FormControlLabel
                      control={<Checkbox name="checked" color="primary" size="small" />}
                      label={
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'text.secondary',
                          }}
                        >
                          {translateUi(
                            'ui.sections.authentications.default.loginform.remember_this_device_e495443b',
                          )}
                        </Typography>
                      }
                    />
                  )}

                  {forgotPasswordLink && (
                    <Link href={forgotPasswordLink} variant="subtitle2">
                      {translateUi(
                        'ui.sections.authentications.default.loginform.forgot_password_1cc8d181',
                      )}
                    </Link>
                  )}
                </Stack>
              </Grid>
              <Grid size={12}>
                <Button
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {translateUi('ui.sections.authentications.default.loginform.log_in_f7c400ed')}
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

export default LoginForm;
