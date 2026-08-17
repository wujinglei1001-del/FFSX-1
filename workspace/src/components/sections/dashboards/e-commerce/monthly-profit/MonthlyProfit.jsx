import { useTranslation } from 'react-i18next';
import { Paper, Stack } from '@mui/material';
import { monthlyProfitChartData } from 'data/e-commerce/dashboard';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import EcomStatSection from 'components/sections/common/EcomStatSection';
import MonthlyProfitChart from './MonthlyProfitChart';

const MonthlyProfit = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, flex: 1, height: 1 }}>
      <Stack
        sx={{
          rowGap: 2,
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <SectionHeader
          title={translateUi(
            'ui.sections.dashboards.e_commerce.monthly_profit.monthly_earnings_fed45ea1',
          )}
          subTitle="累计利润"
          actionComponent={<DashboardMenu />}
          sx={{ mb: 0 }}
        />
        <EcomStatSection
          amount={25049}
          increment={4.33}
          chart={
            <MonthlyProfitChart
              data={monthlyProfitChartData}
              sx={{ height: '100% !important', width: 1, maxWidth: '45%', overflow: 'visible' }}
            />
          }
        />
      </Stack>
    </Paper>
  );
};

export default MonthlyProfit;
