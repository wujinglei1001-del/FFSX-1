import { useEffect, useMemo, useRef } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Alert, Stack } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import paths from 'routes/paths';
import { useLoginUser } from 'services/swr/api-hooks/useAuthApi';
import PageLoader from 'components/loading/PageLoader';
import LoginForm from 'components/sections/authentications/default/LoginForm';

const Login = () => {
  const { sessionUser, signin, isConfigured, isLoading, error } = useAuth();
  const location = useLocation();
  const started = useRef(false);
  const returnTo = location.state?.from || paths.ecommerce;
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
    try {
      const result = await login({ loginName: email, password, authRequest });
      window.location.assign(result.callbackUrl);
    } catch (requestError) {
      throw new Error(requestError?.data?.error || '登录失败，请检查用户名和密码。', {
        cause: requestError,
      });
    }
  };

  if (sessionUser) {
    return <Navigate to={returnTo} replace />;
  }

  if (!isConfigured) {
    return (
      <Stack sx={{ width: 1, maxWidth: 520, mx: 'auto', p: 3 }}>
        <Alert severity="info">
          ZITADEL 尚未配置，请先填写域名、Web Client ID 和 FFAX Project ID。
        </Alert>
      </Stack>
    );
  }

  if (error) {
    return <Alert severity="error">无法连接 ZITADEL：{error.message}</Alert>;
  }

  if (!authRequest) {
    return <PageLoader sx={{ height: '100vh' }} />;
  }

  return <LoginForm provider="jwt" handleLogin={handleLogin} socialAuth={false} rememberDevice />;
};

export default Login;
