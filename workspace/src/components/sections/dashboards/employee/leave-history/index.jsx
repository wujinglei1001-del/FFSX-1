import { useTranslation } from 'react-i18next';
import { leaveHistoryDara } from 'data/member/dashboard';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import SectionWrapper from 'components/sections/dashboards/hiring/common/SectionWrapper';
import LeaveHistoryList from './LeaveHistoryList';

const LeaveHistory = () => {
  const { t: translateUi } = useTranslation();
  return (
    <SectionWrapper>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.employee.leave_history.leave_history_dc67c9b1')}
        subTitle="Here’s a record of all your past leave."
        actionComponent={<DashboardMenu />}
      />

      <LeaveHistoryList leaves={leaveHistoryDara} />
    </SectionWrapper>
  );
};

export default LeaveHistory;
