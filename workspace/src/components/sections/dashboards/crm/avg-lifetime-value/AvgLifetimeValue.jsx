import { useTranslation } from 'react-i18next';
import { Paper } from '@mui/material';
import { avgLifetimeValueData } from 'data/crm/dashboard';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import AvgLifetimeValueChart from './AvgLifetimeValueChart';

const AvgLifetimeValue = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper background={1} sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.crm.avg_lifetime_value.avg_life_time_value_5270dc97',
        )}
        subTitle="CAC and LTV last year"
        actionComponent={<DashboardMenu />}
        sx={{ px: { xs: 3, md: 5 }, pt: { xs: 3, md: 5 } }}
      />

      <AvgLifetimeValueChart
        data={avgLifetimeValueData}
        sx={{
          flex: 1,
          minHeight: 420,
        }}
      />
    </Paper>
  );
};

export default AvgLifetimeValue;
