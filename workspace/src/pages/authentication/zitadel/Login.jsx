import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router';
import { Alert, Stack } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import { REMEMBER_DEVICE_KEY } from 'config/zitadel';
import paths, { workbenchEntryPath } from 'routes/paths';
import { useLoginUser } from 'services/swr/api-hooks/useAuthApi';
import PageLoader from 'components/loading/PageLoader';
import LoginForm from 'components/sections/authentications/zitadel/LoginForm';

const Login = () => {
  const { t } = useTranslation();
  const { sessionUser, signin, isConfigured, isLoading, error } = useAuth();
  const location = useLocation();
  const started = useRef(false);
  const returnTo = location.state?.from || workbenchEntryPath;
  const { trigger: login } = useLoginUser();
  const authRequest = useMemo(() => {
    const value = new URLSearchParams(location.search).get('authRequest') || '';
    return value.startsWith('oidc_') ? value.slice('oidc_'.length) : value;
  }, [location.search]);

  useEffect(() => {
    if (authRequest || !isConfigured || isLoading || sessionUser || started.current) return;

    started.current = true;
    signin(returnTo);
  }, [authRequest, isConfigured, isLoading, returnTo, sessionUser, signin]);

  const handleLogin = async ({ email, password, rememberDevice }) => {
    try {
      if (rememberDevice) {
        localStorage.setItem(REMEMBER_DEVICE_KEY, 'true');
      } else {
        localStorage.removeItem(REMEMBER_DEVICE_KEY);
      }

      const result = await login({ loginName: email, password, authRequest, rememberDevice });
      window.location.assign(result.callbackUrl);
    } catch (requestError) {
      localStorage.removeItem(REMEMBER_DEVICE_KEY);
      const errorCode = requestError?.data?.error;
      throw new Error(
        errorCode
          ? t(`ffax.auth.errors.${errorCode}`, { defaultValue: t('ffax.auth.login_form.failed') })
          : t('ffax.auth.login_form.failed'),
        { cause: requestError },
      );
    }
  };

  if (sessionUser) {
    return <Navigate to={returnTo} replace />;
  }

  if (!isConfigured) {
    return (
      <Stack sx={{ width: 1, maxWidth: 520, mx: 'auto', p: 3 }}>
        <Alert severity="info">{t('ffax.auth.service.unconfigured')}</Alert>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {t('ffax.auth.service.connection_failed', { message: error.message })}
      </Alert>
    );
  }

  if (!authRequest) {
    return <PageLoader sx={{ height: '100vh' }} />;
  }

  return (
    <LoginForm
      handleLogin={handleLogin}
      signUpLink={paths.zitadelSignup}
    />
  );
};

export default Login;
