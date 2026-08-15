import { useTranslation } from 'react-i18next';
import { Box, Paper, Stack } from '@mui/material';
import SectionHeader from 'components/common/SectionHeader';
import MeetingCard from 'components/sections/dashboards/project/schedule-meeting/MeetingCard';

const ScheduleMeeting = ({ upcomingMeetings }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 1,
        py: { xs: 3, md: 5 },
        px: { xs: 3, md: 4 },
      }}
    >
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.project.schedule_meeting.scheduled_meetings_f55061cf',
        )}
        subTitle="Track progress for scheduled meetings"
        sx={{ mb: 4 }}
      />
      <Box
        sx={{
          flexGrow: 1,
          flexBasis: { sm: 0 },
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Stack sx={{ gap: 1 }}>
          {upcomingMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default ScheduleMeeting;
