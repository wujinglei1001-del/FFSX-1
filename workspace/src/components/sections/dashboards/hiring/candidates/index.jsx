import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { candidatesData as data } from 'data/hiring/dashboard';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import SectionWrapper from '../common/SectionWrapper';
import CandidatesChart from './CandidatesChart';

const Candidates = () => {
  const { t: translateUi } = useTranslation();
  const chartRef = useRef(null);

  return (
    <SectionWrapper>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.hiring.candidates.candidates_b5bf8067')}
        subTitle="Summary of candidate engagement"
        direction={{ xs: 'column', sm: 'row' }}
        actionComponent={
          <DashboardSelectMenu
            size="medium"
            defaultValue={30}
            sx={{ width: { xs: '50%', sm: 150 } }}
            options={[
              {
                value: 7,
                label: translateUi('ui.sections.dashboards.hiring.candidates.last_day_d85ff84f'),
              },
              {
                value: 15,
                label: translateUi('ui.sections.dashboards.hiring.candidates.last_6_days_300823a2'),
              },
              {
                value: 30,
                label: translateUi(
                  'ui.sections.dashboards.hiring.candidates.last_30_days_6118867f',
                ),
              },
            ]}
          />
        }
      />
      <CandidatesChart ref={chartRef} data={data} sx={{ height: '240px !important' }} />
    </SectionWrapper>
  );
};

export default Candidates;
