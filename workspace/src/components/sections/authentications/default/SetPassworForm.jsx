import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, Link, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import paths from 'routes/paths';
import * as yup from 'yup';
import PasswordTextField from 'components/common/PasswordTextField';

const schema = yup
  .object({
    email: yup
      .string()
      .email(
        i18n.t('ui.sections.authentications.default.setpassworform.invalid_email_format_789ec25c'),
      )
      .required(
        i18n.t(
          'ui.sections.authentications.default.setpassworform.this_field_is_required_dedbaded',
        ),
      ),
    token: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.authentications.default.setpassworform.this_field_is_required_dedbaded',
        ),
      ),
    password: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.authentications.default.setpassworform.this_field_is_required_dedbaded',
        ),
      )
      .min(
        8,
        i18n.t(
          'ui.sections.authentications.default.setpassworform.password_must_be_at_least_8_characters_long_47a76040',
        ),
      ),
    password_confirmation: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.authentications.default.setpassworform.confirm_password_field_is_required_727423ea',
        ),
      )
      .oneOf(
        [yup.ref('password')],
        i18n.t(
          'ui.sections.authentications.default.setpassworform.your_passwords_do_not_match_9d716135',
        ),
      ),
  })
  .required();

const SetPasswordForm = ({ handleSetPassword }) => {
  const { t: translateUi } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const token = useMemo(() => searchParams.get('token'), [searchParams]);
  const email = useMemo(() => searchParams.get('email'), [searchParams]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: email || '', token: token || '' },
  });

  const onSubmit = async (data) => {
    try {
      const res = await handleSetPassword(data);
      enqueueSnackbar(res.data.message, { variant: 'success' });
      navigate(paths.defaultJwtLogin);
    } catch (error) {
      setError('root', { type: 'manual', message: error.message });
    }
  };

  return (
    <Stack
      sx={{
        flex: 1,
        height: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: { md: 10 },
        pb: 10,
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'block' } }} />
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
        <Grid size={12}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
            }}
          >
            {translateUi(
              'ui.sections.authentications.default.setpassworform.set_new_password_25c6fc7c',
            )}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 1,
            }}
          >
            {translateUi(
              'ui.sections.authentications.default.setpassworform.create_a_new_password_for_your_account_new_password__52c4e481',
            )}
            <Link href="#!" sx={{ ml: 1 }}>
              {translateUi(
                'ui.sections.authentications.default.setpassworform.see_password_policy_4ac9d58b',
              )}
            </Link>
          </Typography>
        </Grid>

        <Grid size={12}>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.root.message}
              </Alert>
            )}

            <Grid container>
              <Grid
                sx={{
                  mb: 3,
                }}
                size={12}
              >
                <PasswordTextField
                  fullWidth
                  size="large"
                  id="password"
                  label={translateUi(
                    'ui.sections.authentications.default.setpassworform.password_8be3c943',
                  )}
                  variant="filled"
                  error={!!errors.password}
                  helperText={<>{errors.password?.message}</>}
                  {...register('password')}
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
                    'ui.sections.authentications.default.setpassworform.confirm_password_c2d404cb',
                  )}
                  variant="filled"
                  error={!!errors.password_confirmation}
                  helperText={<>{errors.password_confirmation?.message}</>}
                  {...register('password_confirmation')}
                />
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
                    'ui.sections.authentications.default.setpassworform.set_new_password_208bb0d7',
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Link href="#!" variant="subtitle2">
        {translateUi('ui.sections.authentications.default.setpassworform.contact_support_fe1a2922')}
      </Link>
    </Stack>
  );
};

export default SetPasswordForm;
