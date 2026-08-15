import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { attendanceData } from 'data/member/dashboard';
import dayjs from 'dayjs';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import SectionWrapper from 'components/sections/dashboards/hiring/common/SectionWrapper';
import AttendanceCalendar from './AttendanceCalendar';
import CalendarLegend from './CalendarLegend';

const Attendance = () => {
  const { t: translateUi } = useTranslation();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const calendarRef = useRef(null);

  return (
    <SectionWrapper>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.employee.attendance.attendance_b689313f')}
        subTitle="Monthly attendance summary"
        actionComponent={<DashboardMenu />}
      />
      <Fragment>
        <AttendanceCalendar
          ref={calendarRef}
          data={attendanceData}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <CalendarLegend />
      </Fragment>
    </SectionWrapper>
  );
};

export default Attendance;
