import { useTranslation } from 'react-i18next';
import { Paper, Stack } from '@mui/material';
import { visitorRevenueChartData } from 'data/e-commerce/dashboard';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import EcomStatSection from 'components/sections/common/EcomStatSection';
import VisitorRevenueChart from './VisitorRevenueChart';

const VisitorRevenue = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, flex: 1, height: 1 }}>
      <Stack
        sx={{
          rowGap: 2,
          height: 1,
          justifyContent: 'space-between',
        }}
      >
        <SectionHeader
          title={translateUi(
            'ui.sections.dashboards.e_commerce.visitor_revenue.visitor_value_90c28192',
          )}
          subTitle="平均每次访问收入"
          actionComponent={<DashboardMenu />}
          sx={{ mb: 0 }}
        />

        <EcomStatSection
          amount={63.02}
          increment={-1.03}
          chart={
            <VisitorRevenueChart
              data={visitorRevenueChartData}
              sx={{ height: '100% !important', width: 1, maxWidth: '45%', overflow: 'visible' }}
            />
          }
        />
      </Stack>
    </Paper>
  );
};

export default VisitorRevenue;
