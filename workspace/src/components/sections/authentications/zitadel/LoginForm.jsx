import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink } from 'react-router';
import {
  Alert,
  Box,
  Button,
  Checkbox,
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

const schema = yup
  .object({
    email: yup
      .string()
      .required(i18n.t('ffax.auth.validation.required')),
    password: yup
      .string()
      .required(i18n.t('ffax.auth.validation.required')),
  })
  .required();

const LoginForm = ({ handleLogin, signUpLink }) => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rememberDevice: false,
    },
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
              {translateUi('ffax.auth.login_form.title')}
            </Typography>
            {signUpLink && (
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {translateUi('ffax.auth.login_form.no_account')}
                <Link component={RouterLink} to={signUpLink} sx={{ ml: 1 }}>
                  {translateUi('ffax.auth.login_form.sign_up')}
                </Link>
              </Typography>
            )}
          </Stack>
        </Grid>
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
                  id="email"
                  type="text"
                  label={translateUi('ffax.auth.login_form.login_name')}
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
                  label={translateUi('ffax.auth.login_form.password')}
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
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        size="small"
                        {...register('rememberDevice')}
                      />
                    }
                    label={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        {translateUi('ffax.auth.login_form.remember_device')}
                      </Typography>
                    }
                  />
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
                  {translateUi('ffax.auth.login_form.submit')}
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
