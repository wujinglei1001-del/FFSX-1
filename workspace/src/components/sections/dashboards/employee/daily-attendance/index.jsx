import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import SectionWrapper from 'components/sections/dashboards/hiring/common/SectionWrapper';
import AttendanceCounter from './AttendanceCounter';

const DailyAttendance = () => {
  const { t: translateUi } = useTranslation();
  return (
    <SectionWrapper>
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.employee.daily_attendance.daily_attendance_24aeb891',
        )}
        subTitle={`Today's attendance, ${dayjs().format('MMM DD')}.`}
        actionComponent={<DashboardMenu />}
      />
      <AttendanceCounter />
    </SectionWrapper>
  );
};

export default DailyAttendance;
