import { useTranslation } from 'react-i18next';
import { Alert, Box, Typography } from '@mui/material';
import { defaultJwtAuthCredentials } from 'config';
import IconifyIcon from 'components/base/IconifyIcon';

const DefaultCredentialAlert = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Alert
      severity="info"
      sx={{ mb: 4 }}
      icon={<IconifyIcon icon="material-symbols:info-outline-rounded" />}
    >
      <Typography variant="body2">
        {translateUi(
          'ui.sections.authentications.common.defaultcredentialalert.use_email_7b6c2b3e',
        )}{' '}
        <Box
          component="span"
          sx={{
            fontWeight: 700,
          }}
        >
          {defaultJwtAuthCredentials.email}
        </Box>
      </Typography>
      <Typography variant="body2">
        {translateUi('ui.sections.authentications.common.defaultcredentialalert.password_8032804d')}{' '}
        <Box
          component="span"
          sx={{
            fontWeight: 700,
          }}
        >
          {defaultJwtAuthCredentials.password}
        </Box>
      </Typography>
    </Alert>
  );
};

export default DefaultCredentialAlert;
