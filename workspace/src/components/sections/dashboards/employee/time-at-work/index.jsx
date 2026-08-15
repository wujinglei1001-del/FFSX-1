import { useTranslation } from 'react-i18next';
import { timeAtWorkData } from 'data/member/dashboard';
import { Fragment } from 'react/jsx-runtime';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import SectionWrapper from 'components/sections/dashboards/hiring/common/SectionWrapper';
import TimeAtWorkKPI from './TimeAtWorkKPI';
import WeeklyFrequency from './WeeklyFrequency';

const TimeAtWork = () => {
  const { t: translateUi } = useTranslation();
  return (
    <SectionWrapper sx={{ display: 'flex', flexDirection: 'column' }}>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.employee.time_at_work.time_at_work_4073233d')}
        subTitle="Attendance Summary of this week"
        actionComponent={<DashboardMenu />}
      />
      <Fragment>
        <TimeAtWorkKPI />
        <WeeklyFrequency days={timeAtWorkData} />
      </Fragment>
    </SectionWrapper>
  );
};

export default TimeAtWork;
