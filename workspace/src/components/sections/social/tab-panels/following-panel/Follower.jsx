import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { formatNumber } from 'lib/utils';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';

const Follower = ({ user, handleFollowStatus }) => {
  const { t: translateUi } = useTranslation();
  const { down } = useBreakpoints();
  const downSm = down('sm');

  return (
    <Stack key={user.id} direction="row" sx={{ gap: 2, width: 1 }}>
      <Avatar
        src={user.avatar}
        alt={translateUi('common.accessibility.profile_avatar')}
        sx={{ width: 48, height: 48 }}
      />
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'flex-start', flexGrow: 1 }}
      >
        <Stack sx={{ justifyContent: 'space-between', height: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Stack direction="row" sx={{ gap: { xs: 1, sm: 2 } }}>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: 'body2.fontSize', sm: 'unset' }, fontWeight: 700 }}
            >
              {user.following}
              <Typography
                component="span"
                variant="body1"
                sx={{
                  fontSize: { xs: 'body2.fontSize', sm: 'unset' },
                  color: 'text.secondary',
                  fontWeight: 400,
                  ml: 0.5,
                }}
              >
                {translateUi('ui.sections.social.tab_panels.following_panel.following_90eeb100')}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: 'body2.fontSize', sm: 'unset' }, fontWeight: 700 }}
            >
              {formatNumber(user.followers)}
              <Typography
                component="span"
                variant="body1"
                sx={{
                  fontSize: { xs: 'body2.fontSize', sm: 'unset' },
                  color: 'text.secondary',
                  fontWeight: 400,
                  ml: 0.5,
                }}
              >
                {translateUi('ui.sections.social.tab_panels.following_panel.followers_78eaabf4')}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant={user.followingStatus === true ? 'soft' : 'contained'}
          color="neutral"
          shape={downSm ? 'square' : undefined}
          onClick={() => handleFollowStatus(user.id)}
          sx={{ gap: 0.5 }}
        >
          <IconifyIcon
            icon={
              user.followingStatus
                ? 'material-symbols:person-check-outline-rounded'
                : 'material-symbols:person-add-outline-rounded'
            }
            sx={{ fontSize: 20, display: { xs: 'block', sm: 'none' } }}
          />
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user.followingStatus ? 'Following' : 'Follow'}
          </Box>
        </Button>
      </Stack>
    </Stack>
  );
};

export default Follower;
