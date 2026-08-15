import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import useCountdown from 'hooks/useCountdown';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import CheckMailBoxDialog from '../CheckMailBoxDialog';
import ViewOnlyAlert from '../common/ViewOnlyAlert';

const schema = yup
  .object({
    email: yup
      .string()
      .email(
        i18n.t(
          'ui.sections.authentications.default.forgotpasswordform.email_must_be_a_valid_email_612a8b2a',
        ),
      )
      .required(
        i18n.t(
          'ui.sections.authentications.default.forgotpasswordform.this_field_is_required_dedbaded',
        ),
      ),
  })
  .required();

const ForgotPasswordForm = ({ provider = 'jwt', handleSendResetLink }) => {
  const { t: translateUi } = useTranslation();
  const [linkSent, setLinkSent] = useState(false);
  const [openCheckEmailDialog, setOpenCheckEmailDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { time, startTimer } = useCountdown();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await handleSendResetLink({ email: data.email });

      setLinkSent(true);
      setOpenCheckEmailDialog(true);
      if (res?.message) {
        enqueueSnackbar(res.message, { variant: 'success' });
      }
      startTimer(30, () => {
        setLinkSent(false);
      });
    } catch (error) {
      setError('email', { type: 'manual', message: error.message });
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
          maxWidth: '35rem',
          rowGap: 6,
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
          <Typography
            variant="h4"
            sx={{
              mb: 2,
            }}
          >
            {translateUi(
              'ui.sections.authentications.default.forgotpasswordform.forgot_password_1cc8d181',
            )}
          </Typography>
          <Typography variant="body1">
            {translateUi(
              'ui.sections.authentications.default.forgotpasswordform.please_enter_your_email_address_and_an_email_with_a__499592f0',
            )}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid
                sx={{
                  mb: 4,
                }}
                size={12}
              >
                <TextField
                  fullWidth
                  size="large"
                  id="email"
                  type="email"
                  label={translateUi(
                    'ui.sections.authentications.default.forgotpasswordform.email_84add5b2',
                  )}
                  variant="filled"
                  error={!!errors.email}
                  helperText={<>{errors.email?.message}</>}
                  {...register('email')}
                />
              </Grid>
              <Grid
                sx={{
                  mb: 2,
                }}
                size={12}
              >
                <Button
                  type="submit"
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={linkSent}
                >
                  {translateUi(
                    'ui.sections.authentications.default.forgotpasswordform.send_reset_link_987be452',
                  )}
                  {time > 0 ? ` in ${time} s` : ''}
                </Button>
              </Grid>
              <Grid
                sx={{
                  mb: 6,
                }}
                size={12}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {translateUi(
                    'ui.sections.authentications.default.forgotpasswordform.don_t_have_access_to_that_email_1f36a26b',
                  )}
                  <Link href="#!" sx={{ ml: 1 }}>
                    {translateUi(
                      'ui.sections.authentications.default.forgotpasswordform.try_alternate_methods_46b02e75',
                    )}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Link href="#!" variant="subtitle2">
        {translateUi(
          'ui.sections.authentications.default.forgotpasswordform.trouble_signing_in_363e4476',
        )}
      </Link>
      <CheckMailBoxDialog
        open={openCheckEmailDialog}
        handleClose={() => setOpenCheckEmailDialog(false)}
        email={watch('email')}
        time={time}
        handleSendAgain={() => onSubmit({ email: watch('email') })}
      />
    </Stack>
  );
};

export default ForgotPasswordForm;
