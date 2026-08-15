import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { meetingsData as data } from 'data/hiring/dashboard';
import SectionHeader from 'components/common/SectionHeader';
import SectionWrapper from '../common/SectionWrapper';
import MeetingCard from './MeetingCard';
import MeetingDatePicker from './MeetingDatePicker';

const Meetings = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack component={SectionWrapper}>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.hiring.meetings.meetings_b23a1938')}
        subTitle="All your events at a glance"
        actionComponent={
          <>
            <MeetingDatePicker />
          </>
        }
      />
      <Box sx={{ flexGrow: 1, height: 1, overflowY: 'auto', flexBasis: { sm: 0 } }}>
        <Stack
          sx={{
            gap: 1,
          }}
        >
          {data.map((item, index) => (
            <MeetingCard key={index} item={item} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
export default Meetings;
