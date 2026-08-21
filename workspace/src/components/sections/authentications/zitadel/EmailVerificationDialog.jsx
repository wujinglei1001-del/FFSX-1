import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
  paperClasses,
} from '@mui/material';
import illustrationDark from 'assets/images/illustrations/3-dark.webp';
import illustration from 'assets/images/illustrations/3.webp';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';

const EmailVerificationDialog = ({
  open,
  mode = 'pending',
  loading = false,
  error = '',
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const isConfirm = mode === 'confirm';

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      sx={{
        [`& .${paperClasses.root}`]: {
          borderRadius: 4,
          maxWidth: 515,
        },
      }}
    >
      <DialogContent sx={{ textAlign: 'center', p: 5 }}>
        <IconButton
          aria-label={t('ffax.auth.email.close')}
          onClick={onClose}
          disabled={loading}
          sx={{
            position: 'absolute',
            right: 32,
            top: 24,
          }}
        >
          <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
        </IconButton>

        <Stack direction="row" sx={{ justifyContent: 'center', mb: 3 }}>
          <Image
            src={{ light: illustration, dark: illustrationDark }}
            alt=""
            width={320}
            height={240}
          />
        </Stack>

        <DialogTitle sx={{ typography: 'h5', fontWeight: 500 }}>
          {t(isConfirm ? 'ffax.auth.email.confirm_title' : 'ffax.auth.email.pending_title')}
        </DialogTitle>
        <DialogContentText sx={{ typography: 'body1', color: 'text.primary' }}>
          {t(isConfirm ? 'ffax.auth.email.confirm_message' : 'ffax.auth.email.pending_message')}
        </DialogContentText>

        {error && (
          <Alert severity="error" sx={{ mt: 3, textAlign: 'left' }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', p: 5, pt: 0 }}>
        <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
          {t(isConfirm ? 'ffax.auth.email.ready' : 'ffax.auth.email.completed')}{' '}
          {isConfirm ? (
            <Link
              component="button"
              type="button"
              onClick={onConfirm}
              disabled={loading}
              sx={{ font: 'inherit' }}
            >
              {t(loading ? 'ffax.auth.email.verifying' : 'ffax.auth.email.confirm_action')}
            </Link>
          ) : (
            <Link component={RouterLink} to={paths.zitadelLogin}>
              {t('ffax.auth.email.return_login')}
            </Link>
          )}
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export default EmailVerificationDialog;
