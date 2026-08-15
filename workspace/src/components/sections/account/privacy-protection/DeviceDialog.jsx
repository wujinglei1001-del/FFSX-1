import { useTranslation } from 'react-i18next';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  dialogClasses,
} from '@mui/material';
import dayjs from 'dayjs';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';

const DeviceDialog = (props) => {
  const { t: translateUi } = useTranslation();
  const { open, handleDialogClose, loggedInDevice, sx } = props;

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      sx={{
        [`& .${dialogClasses.paper}`]: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          maxWidth: 532,
          width: 1,
          borderRadius: 6,
          overflow: 'visible',
          ...sx,
        },
      }}
    >
      <DialogContent sx={{ p: 3, pr: 0, display: 'flex', gap: 2 }}>
        <Image
          src={loggedInDevice.icon}
          width={40}
          height={40}
          alt={translateUi('common.accessibility.logged_device_icon')}
        />
        <Stack sx={{ gap: 3, flexGrow: 1 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ gap: 2, justifyContent: 'space-between' }}
          >
            <Stack sx={{ gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {loggedInDevice.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 400, color: 'text.secondary' }}>
                {loggedInDevice.location}
              </Typography>
            </Stack>
            {loggedInDevice.currentlyLoggedIn && (
              <Chip
                label={translateUi(
                  'ui.sections.account.privacy_protection.devicedialog.currently_logged_in_05e7f417',
                )}
                color="info"
              />
            )}
          </Stack>
          <Stack sx={{ gap: 1 }}>
            {loggedInDevice.currentlyLoggedIn ? (
              <Typography variant="subtitle2" sx={{ fontWeight: 400, color: 'text.secondary' }}>
                {translateUi(
                  'ui.sections.account.privacy_protection.devicedialog.first_logged_in_at_74796b75',
                )}
                {dayjs(loggedInDevice.firstLoggedTime).format('MMM DD, h:mm a')}
              </Typography>
            ) : (
              <Typography variant="subtitle2">
                {translateUi(
                  'ui.sections.account.privacy_protection.devicedialog.last_logged_in_at_04771018',
                )}
                {dayjs(loggedInDevice.lastLoggedTime).format('MMM DD, h:mm a')}
              </Typography>
            )}
            {loggedInDevice.currentlyLoggedIn ? (
              <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                {translateUi(
                  'ui.sections.account.privacy_protection.devicedialog.recent_activity_in_bangladesh_in_the_last_21f5b4a0',
                )}{' '}
                {dayjs(loggedInDevice.lastLoggedTime).fromNow(true)}
              </Typography>
            ) : (
              <Stack direction="row">
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 400,
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {translateUi(
                    'ui.sections.account.privacy_protection.devicedialog.don_t_recognize_the_device_8811d526',
                  )}{' '}
                </Typography>
                <Button color="error" size="small" onClick={handleDialogClose}>
                  {translateUi(
                    'ui.sections.account.privacy_protection.devicedialog.click_here_to_log_out_93f84100',
                  )}
                </Button>
              </Stack>
            )}
          </Stack>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 400, color: 'text.secondary' }}>
              {translateUi(
                'ui.sections.account.privacy_protection.devicedialog.browsers_apps_and_services_e72e4fac',
              )}
            </Typography>
            <Stack sx={{ gap: 0.5 }}>
              {loggedInDevice.browsersAppsServices?.map((service, _index) => (
                <Typography
                  key={service.name}
                  variant="caption"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Image src={service.icon} width={16} height={16} />
                  <span>{service.name}</span>
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ pt: 2, pl: 0, pr: 3 }}>
        <IconButton onClick={handleDialogClose} size="large" sx={{ p: 1, mt: '1px' }}>
          <IconifyIcon icon="material-symbols:close" fontSize={20} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceDialog;
