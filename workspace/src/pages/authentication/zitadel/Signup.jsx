import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import { Alert, Stack } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import paths, { workbenchEntryPath } from 'routes/paths';
import { useRegisterUser } from 'services/swr/api-hooks/useAuthApi';
import PageLoader from 'components/loading/PageLoader';
import EmailVerificationDialog from 'components/sections/authentications/zitadel/EmailVerificationDialog';
import SignupForm from 'components/sections/authentications/zitadel/SignupForm';

const Signup = () => {
  const { t } = useTranslation();
  const { sessionUser, isConfigured, isLoading, error } = useAuth();
  const { trigger: registerUser } = useRegisterUser();
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  const handleSignup = async (formData) => {
    try {
      await registerUser(formData);
      setIsEmailDialogOpen(true);
    } catch (requestError) {
      const errorCode = requestError?.data?.error;
      throw new Error(
        errorCode
          ? t(`ffax.auth.errors.${errorCode}`, { defaultValue: t('ffax.auth.signup.failed') })
          : t('ffax.auth.signup.failed'),
        { cause: requestError },
      );
    }
  };

  if (sessionUser) {
    return <Navigate to={workbenchEntryPath} replace />;
  }

  if (!isConfigured) {
    return (
      <Stack sx={{ width: 1, maxWidth: 520, mx: 'auto', p: 3 }}>
        <Alert severity="info">{t('ffax.auth.service.unconfigured')}</Alert>
      </Stack>
    );
  }

  if (isLoading) {
    return <PageLoader sx={{ height: '100vh' }} />;
  }

  if (error) {
    return (
      <Alert severity="error">
        {t('ffax.auth.service.connection_failed', { message: error.message })}
      </Alert>
    );
  }

  return (
    <>
      <SignupForm handleSignup={handleSignup} loginLink={paths.zitadelLogin} />
      <EmailVerificationDialog
        open={isEmailDialogOpen}
        mode="pending"
        onClose={() => setIsEmailDialogOpen(false)}
      />
    </>
  );
};

export default Signup;
