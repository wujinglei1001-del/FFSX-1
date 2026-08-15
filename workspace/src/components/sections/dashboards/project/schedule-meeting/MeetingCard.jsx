import { useTranslation } from 'react-i18next';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
  avatarClasses,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const MeetingCard = ({ meeting }) => {
  const { t: translateUi } = useTranslation();
  const { id, title, date, time, status, attendants, joinMeetLink } = meeting;

  return (
    <Box
      key={id}
      sx={(theme) => ({
        bgcolor: 'background.elevation1',
        borderRadius: 2,
        p: 3,
        ...(status.active && {
          bgcolor: `${theme.vars.palette.chOrange[100]} !important`,
        }),
      })}
    >
      <Stack direction="row" sx={{ gap: 1, mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1, lineClamp: 2 }}>
          {title}
        </Typography>

        <Chip
          variant={status.active ? 'filled' : 'soft'}
          color={status.active ? 'warning' : 'neutral'}
          label={status.label}
        />
      </Stack>
      <Stack
        direction="row"
        sx={{ gap: 1, mb: 3, color: status.active ? 'warning.darker' : 'text.secondary' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {date}
        </Typography>
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            height: 12,
            alignSelf: 'center',
            ...(status.active && {
              borderColor: 'warning.light',
            }),
          }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {time}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <AvatarGroup
          max={5}
          sx={{
            [`& .${avatarClasses.root}`]: {
              width: 24,
              height: 24,
              fontSize: '0.6rem',
              fontWeight: 600,
              borderWidth: 1,
              '&:first-of-type': {
                backgroundColor: 'primary.main',
              },
            },
          }}
        >
          {attendants.map((attendant) => (
            <Tooltip key={attendant.name} title={attendant.name}>
              <Avatar src={attendant.avatar} alt={attendant.name} />
            </Tooltip>
          ))}
        </AvatarGroup>
        {joinMeetLink ? (
          <Button
            variant={status.active ? 'contained' : 'soft'}
            startIcon={
              <IconifyIcon icon="material-symbols:videocam-outline" height={20} width={20} />
            }
            href={joinMeetLink}
          >
            {translateUi('ui.sections.dashboards.project.schedule_meeting.join_e0d73143')}
          </Button>
        ) : (
          <Button
            variant="soft"
            startIcon={<IconifyIcon icon="material-symbols:alarm-outline" height={20} width={20} />}
          >
            {translateUi('ui.sections.dashboards.project.schedule_meeting.notify_me_c3f30bf0')}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default MeetingCard;
