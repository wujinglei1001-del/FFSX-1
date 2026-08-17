import { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Alert, Stack } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import paths from 'routes/paths';
import PageLoader from 'components/loading/PageLoader';

const Login = () => {
  const { sessionUser, signin, isConfigured, isLoading, error } = useAuth();
  const location = useLocation();
  const started = useRef(false);
  const returnTo = location.state?.from || paths.ecommerce;

  useEffect(() => {
    if (!isConfigured || isLoading || sessionUser || started.current) return;

    started.current = true;
    signin(returnTo);
  }, [isConfigured, isLoading, returnTo, sessionUser, signin]);

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

  return <PageLoader sx={{ height: '100vh' }} />;
};

export default Login;
