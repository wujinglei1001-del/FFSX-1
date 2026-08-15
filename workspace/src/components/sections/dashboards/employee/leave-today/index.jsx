import { useTranslation } from 'react-i18next';
import { leaveTodayData } from 'data/member/dashboard';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import SectionWrapper from 'components/sections/dashboards/hiring/common/SectionWrapper';
import OnLeaveList from './OnLeaveList';

const LeaveToday = () => {
  const { t: translateUi } = useTranslation();
  return (
    <SectionWrapper>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.employee.leave_today.leave_today_e2e268ee')}
        subTitle="Check who else is on leave today."
        actionComponent={<DashboardMenu />}
      />
      <OnLeaveList users={leaveTodayData} />
    </SectionWrapper>
  );
};

export default LeaveToday;
