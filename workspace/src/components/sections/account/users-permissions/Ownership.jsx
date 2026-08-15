import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import IconifyIcon from 'components/base/IconifyIcon';
import StatusAvatar from 'components/base/StatusAvatar';

const Ownership = ({ name, email, avatar, lastLoginAt }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ gap: 2, alignItems: 'flex-start' }}>
      <div>
        <Stack sx={{ gap: 1, mb: 1, alignItems: 'flex-start' }}>
          <StatusAvatar
            alt={translateUi(
              'ui.sections.account.users_permissions.ownership.tsamina_mina_f6bd64fe',
            )}
            status="online"
            src={avatar}
            sx={{ width: 64, height: 64 }}
          />
          <div>
            <Typography variant="h6" sx={{ fontWeight: 500, lineHeight: '31.5px' }}>
              {name}
            </Typography>
            <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
              {email}
            </Typography>
          </div>
        </Stack>
        <Typography
          variant="body2"
          color="info"
          sx={{ fontWeight: 500, display: 'flex', gap: 1, alignItems: 'center' }}
        >
          <IconifyIcon icon="material-symbols:info-outline" sx={{ fontSize: 24 }} />
          {translateUi('ui.sections.account.users_permissions.ownership.last_login_was_34954e8a')}
          {dayjs(lastLoginAt).format('dddd, DD MMMM YYYY, h:mm A')} GMT
        </Typography>
      </div>
      <Button
        variant="soft"
        color="neutral"
        endIcon={
          <IconifyIcon icon="material-symbols:chevron-right-rounded" sx={{ fontSize: 20 }} />
        }
      >
        {translateUi('ui.sections.account.users_permissions.ownership.change_ownership_61722732')}
      </Button>
    </Stack>
  );
};

export default Ownership;
