import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ViewOnlyAlert from 'components/sections/authentications/common/ViewOnlyAlert';

const Auth0Login = () => {
  const { t: translateUi } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLoginRedirect = async () => {
    setLoginLoading(true);
    await loginWithRedirect();
    setLoginLoading(false);
  };

  const handleSignupRedirect = async () => {
    setSignupLoading(true);
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
    setSignupLoading(false);
  };

  return (
    <Stack
      sx={[
        {
          height: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: { md: 10 },
          pb: 10,
        },
        (loginLoading || signupLoading) && {
          pointerEvents: 'none',
        },
      ]}
    >
      <div />

      <Box
        sx={{
          p: 5,
        }}
      >
        <Box
          sx={{
            mb: 6,
          }}
        >
          {import.meta.env.VITE_BUILD_MODE === 'production' && (
            <ViewOnlyAlert
              docLink="https://aurora.themewagon.com/documentation/authentication#auth0"
              sx={{ mb: 6 }}
            />
          )}
          <Typography
            variant="h4"
            sx={{
              mb: 2,
            }}
          >
            {translateUi('ui.pages.authentication.default.auth0.log_in_f7c400ed')}
          </Typography>
          <Typography variant="body1">
            {translateUi(
              'ui.pages.authentication.default.auth0.click_redirect_button_to_continue_logging_in_with_au_c8268009',
            )}
          </Typography>
        </Box>

        <Box>
          <Grid container spacing={2.5}>
            <Grid
              size={{
                xs: 12,
                lg: 6,
              }}
            >
              <Button
                fullWidth
                size="large"
                variant="soft"
                loading={signupLoading}
                onClick={handleSignupRedirect}
                sx={{ textWrap: 'nowrap' }}
              >
                {translateUi(
                  'ui.pages.authentication.default.auth0.redirect_to_auth0_sign_up_5de80eb5',
                )}
              </Button>
            </Grid>
            <Grid
              size={{
                xs: 12,
                lg: 6,
              }}
            >
              <Button
                fullWidth
                size="large"
                variant="contained"
                loading={loginLoading}
                onClick={handleLoginRedirect}
                sx={{ textWrap: 'nowrap' }}
              >
                {translateUi(
                  'ui.pages.authentication.default.auth0.redirect_to_auth0_log_in_6307d662',
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Link href="#!" variant="subtitle2">
        {translateUi('ui.pages.authentication.default.auth0.trouble_signing_in_363e4476')}
      </Link>
    </Stack>
  );
};

export default Auth0Login;
