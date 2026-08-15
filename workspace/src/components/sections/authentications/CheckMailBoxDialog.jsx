import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
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
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';

const CheckMailBoxDialog = ({ open, handleClose, email, time, handleSendAgain }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          aria-label={translateUi('ui.sections.authentications.checkmailboxdialog.close_da38860c')}
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 32,
            top: 24,
          }}
        >
          <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
        </IconButton>
        {import.meta.env.VITE_BUILD_MODE === 'production' && (
          <Alert
            severity="info"
            icon={<IconifyIcon icon="material-symbols:info-outline-rounded" />}
            sx={{ mb: 6, mt: 5 }}
          >
            <Typography>
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                }}
              >
                {translateUi('ui.sections.authentications.checkmailboxdialog.note_83423c19')}
              </Box>{' '}
              {translateUi(
                'ui.sections.authentications.checkmailboxdialog.this_is_a_demo_feature_3c8f25c2',
              )}
            </Typography>
          </Alert>
        )}
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Image
            src={{ light: illustration, dark: illustrationDark }}
            alt=""
            width={320}
            height={240}
          />
        </Stack>
        <DialogTitle sx={{ typography: 'h5', fontWeight: 500 }}>
          {translateUi(
            'ui.sections.authentications.checkmailboxdialog.check_your_mailbox_3f907a2d',
          )}
        </DialogTitle>
        <DialogContentText sx={{ typography: 'body1', color: 'text.primary' }}>
          {translateUi(
            'ui.sections.authentications.checkmailboxdialog.an_email_containing_a_password_reset_link_has_been_s_8563af72',
          )}{' '}
          <Box component="span" sx={{ fontWeight: 500 }}>
            {email}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 5, pt: 0 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 500,
            color: 'text.secondary',
          }}
        >
          {translateUi(
            'ui.sections.authentications.checkmailboxdialog.didn_t_receive_the_code_cfd8b982',
          )}{' '}
          <Link href="#!" onClick={handleSendAgain} sx={[time > 0 && { pointerEvents: 'none' }]}>
            {translateUi('ui.sections.authentications.checkmailboxdialog.send_again_9fafcfcc')}
            {time > 0 ? ` in ${time} s` : ''}
          </Link>
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export default CheckMailBoxDialog;
