import { Alert, Stack } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import PageLoader from 'components/loading/PageLoader';

const ZitadelCallback = () => {
  const { error } = useAuth();

  if (error) {
    return (
      <Stack sx={{ width: 1, maxWidth: 520, mx: 'auto', p: 3 }}>
        <Alert severity="error">ZITADEL 登录回调失败：{error.message}</Alert>
      </Stack>
    );
  }

  return <PageLoader sx={{ height: '100vh' }} />;
};

export default ZitadelCallback;
