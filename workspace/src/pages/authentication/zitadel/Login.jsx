import { useEffect, useMemo, useRef } from 'react';
import { Navigate, useLocation } from 'react-router';
import { REMEMBER_DEVICE_KEY } from 'config/zitadel';
import { useAuth } from 'providers/AuthProvider';
import { workbenchEntryPath } from 'routes/paths';
import { useLoginUser } from 'services/swr/api-hooks/useAuthApi';
import PageLoader from 'components/loading/PageLoader';
import LoginForm from 'components/sections/authentications/default/LoginForm';

const Login = () => {
  const { sessionUser, signin, isConfigured, isLoading } = useAuth();
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

  const handleLogin = async ({ email, password }) => {
    localStorage.removeItem(REMEMBER_DEVICE_KEY);
    try {
      const result = await login({
        loginName: email,
        password,
        authRequest,
        rememberDevice: false,
      });
      window.location.assign(result.callbackUrl);
    } catch (requestError) {
      const errorCode = requestError?.data?.error;
      throw new Error(errorCode || 'Unable to sign in.', { cause: requestError });
    }
  };

  if (sessionUser) return <Navigate to={returnTo} replace />;
  if (!isConfigured || isLoading || !authRequest) return <PageLoader sx={{ height: '100vh' }} />;

  return <LoginForm handleLogin={handleLogin} />;
};

export default Login;
