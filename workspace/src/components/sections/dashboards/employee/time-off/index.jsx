import { useTranslation } from 'react-i18next';
import { timeOffData } from 'data/member/dashboard';
import { Fragment } from 'react/jsx-runtime';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import SectionWrapper from 'components/sections/dashboards/hiring/common/SectionWrapper';
import ApplyLeaveDialog from './ApplyLeaveDialog';
import LeavesRemaining from './LeavesRemaining';

const TimeOff = () => {
  const { t: translateUi } = useTranslation();
  return (
    <SectionWrapper>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.employee.time_off.time_off_b98b0526')}
        subTitle="Apply for leave & view available days."
        actionComponent={<DashboardMenu />}
      />
      <Fragment>
        <LeavesRemaining leaves={timeOffData} />
        <ApplyLeaveDialog />
      </Fragment>
    </SectionWrapper>
  );
};

export default TimeOff;
