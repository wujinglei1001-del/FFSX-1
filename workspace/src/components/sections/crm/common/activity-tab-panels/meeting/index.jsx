import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import SimpleBar from 'components/base/SimpleBar';
import MeetingList from './MeetingList';

dayjs.extend(isToday);

const MeetingTabPanel = ({ meetingData }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Container maxWidth={false} sx={{ maxWidth: 800, px: { xs: 0 } }}>
      <SimpleBar sx={{ maxHeight: 504 }}>
        <Stack
          divider={<Divider sx={{ borderColor: 'dividerLight' }} />}
          sx={{
            gap: 4,
          }}
        >
          {meetingData.map((data) => (
            <MeetingList key={data.id} meetingList={data} />
          ))}
        </Stack>
      </SimpleBar>
      <Button sx={{ mt: 3 }}>
        {translateUi('ui.sections.crm.common.activity_tab_panels.load_more_notifications_160c9a66')}
      </Button>
    </Container>
  );
};

export default MeetingTabPanel;
