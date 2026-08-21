import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { Alert, Stack } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import paths from 'routes/paths';
import { useVerifyEmail } from 'services/swr/api-hooks/useAuthApi';
import PageLoader from 'components/loading/PageLoader';
import EmailVerificationDialog from 'components/sections/authentications/zitadel/EmailVerificationDialog';
import SignupForm from 'components/sections/authentications/zitadel/SignupForm';

const disabledSubmit = async () => undefined;

const VerifyEmail = () => {
  const { t } = useTranslation();
  const { isConfigured, isLoading, error: authError } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { trigger: verifyEmail, isMutating } = useVerifyEmail();
  const [verificationError, setVerificationError] = useState('');
  const verification = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      userId: searchParams.get('userId') || searchParams.get('userID') || '',
      code: searchParams.get('code') || '',
    };
  }, [location.search]);

  const returnToLogin = () => navigate(paths.zitadelLogin, { replace: true });

  const handleConfirm = async () => {
    if (!verification.userId || !verification.code) {
      setVerificationError(t('ffax.auth.email.invalid_link'));
      return;
    }

    setVerificationError('');
    try {
      await verifyEmail(verification);
      returnToLogin();
    } catch (requestError) {
      const errorCode = requestError?.data?.error;
      setVerificationError(
        errorCode
          ? t(`ffax.auth.errors.${errorCode}`, {
              defaultValue: t('ffax.auth.email.verify_failed'),
            })
          : t('ffax.auth.email.verify_failed'),
      );
    }
  };

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

  if (authError) {
    return (
      <Alert severity="error">
        {t('ffax.auth.service.connection_failed', { message: authError.message })}
      </Alert>
    );
  }

  return (
    <>
      <SignupForm handleSignup={disabledSubmit} loginLink={paths.zitadelLogin} disabled />
      <EmailVerificationDialog
        open
        mode="confirm"
        loading={isMutating}
        error={verificationError}
        onClose={returnToLogin}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default VerifyEmail;
