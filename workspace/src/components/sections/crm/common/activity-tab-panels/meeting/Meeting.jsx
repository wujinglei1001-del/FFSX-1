import { useTranslation } from 'react-i18next';
import Avatar, { avatarClasses } from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

const Meeting = ({ date, meeting, isToday }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      direction="row"
      sx={{
        gap: 2,
        alignItems: 'flex-start',
        bgcolor: 'background.elevation1',
        p: 2,
        borderRadius: 6,
      }}
    >
      <Box sx={{ borderRadius: 2, minWidth: 65, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', textAlign: 'center', color: 'common.white', py: 0.25 }}>
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {dayjs(date).format('MMM')}
          </Typography>
        </Box>
        <Stack sx={{ alignItems: 'center', bgcolor: 'background.default', pt: 0.5, pb: 1 }}>
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            {dayjs(date).format('D')}
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {dayjs(date).format('ddd')}
          </Typography>
        </Stack>
      </Box>
      <Stack
        sx={{
          gap: { xs: 2, sm: 0 },
          flexGrow: 1,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            gap: 1,
            py: { sm: 2 },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Stack
            sx={{
              gap: 1,
            }}
          >
            <Typography variant="subtitle1">
              {translateUi('ui.sections.crm.common.activity_tab_panels.meeting_at_bd56a7fb')}{' '}
              <Box component="span" sx={{ fontWeight: 500 }}>
                {dayjs(meeting.scheduledDate).format('h:mm a')}
              </Box>{' '}
              {translateUi('common.with')}{' '}
              <Box component="span" sx={{ fontWeight: 500 }}>
                {meeting.participant}
              </Box>
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: '18px' }}>
              {translateUi('ui.sections.crm.common.activity_tab_panels.scheduled_by_d8d0d1b3')}{' '}
              <Box component="span" sx={{ fontWeight: 700 }}>
                {meeting.scheduledBy}
              </Box>{' '}
              {translateUi('common.at')}{' '}
              {dayjs(meeting.scheduledDate).format('DD MMM, YYYY h:mm a')}
            </Typography>
          </Stack>
          <AvatarGroup
            max={4}
            sx={{
              mx: { sm: 1 },
              [`& .${avatarClasses.root}`]: { width: 32, height: 32, fontSize: 14 },
            }}
          >
            {meeting.guests.map((guest) => (
              <Tooltip key={guest.id} title={guest.name}>
                <Avatar src={guest.avatar} />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Stack>
        {isToday && (
          <Button variant="soft" href="#!" sx={{ alignSelf: 'flex-start' }}>
            {translateUi('ui.sections.crm.common.activity_tab_panels.join_now_e1312e12')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Meeting;
