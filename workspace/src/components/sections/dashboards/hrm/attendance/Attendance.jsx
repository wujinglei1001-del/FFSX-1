import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import SectionHeader from 'components/common/SectionHeader';
import AttendanceCalendar from './AttendanceCalendar';
import AttendanceChart from './AttendanceChart';
import HeaderActions from './HeaderActions';

const Attendance = ({ attendance }) => {
  const { t: translateUi } = useTranslation();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const calendarRef = useRef(null);

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', p: { xs: 3, md: 5 }, height: 1 }}>
      <SectionHeader
        direction={{ xs: 'column', sm: 'row' }}
        title={translateUi('ui.sections.dashboards.hrm.attendance.attendance_sheet_2159ae62')}
        subTitle="Keep track of attendance"
        actionComponent={<HeaderActions calendarRef={calendarRef} currentDate={currentDate} />}
        sx={{ gap: { xs: 3, sm: 2, lg: 3, xl: 2 } }}
      />

      <Stack
        direction={{ xs: 'column', sm: 'row', lg: 'column', xl: 'row' }}
        sx={{ gap: { xs: 3, xl: 5 }, flexGrow: 1 }}
      >
        <AttendanceChart data={attendance[0]} sx={{ flex: 1, minHeight: 275, minWidth: 240 }} />
        <AttendanceCalendar
          ref={calendarRef}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          attendance={attendance[0]}
          sx={{ flex: { xs: 1, xl: 2 } }}
        />
      </Stack>
    </Paper>
  );
};

export default Attendance;
