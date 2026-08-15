import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Stack, Typography } from '@mui/material';
import { crmGeneratedRevenueData } from 'data/crm/dashboard';
import useToggleChartLegends from 'hooks/useToggleChartLegends';
import i18n from 'locales/i18n';
import ChartLegend from 'components/common/ChartLegend';
import DashboardMenu from 'components/common/DashboardMenu';
import CRMGeneratedRevenueChart from './CRMGeneratedRevenueChart';

const chartLegends = [
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.generated_revenue.25th_a1a42408');
    },
    color: 'chGrey.200',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.generated_revenue.50th_e72f00ee');
    },
    color: 'chGreen.400',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.generated_revenue.75th_52c688e9');
    },
    color: 'chBlue.500',
  },
];

const CRMGeneratedRevenue = () => {
  const { t: translateUi } = useTranslation();
  const chartRef = useRef(null);
  const { legendState, handleLegendToggle } = useToggleChartLegends(chartRef);

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <Stack
        sx={{
          rowGap: 4,
          height: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            columnGap: { xs: 5, lg: 2, xl: 5 },
            rowGap: 3,
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
              }}
            >
              {translateUi(
                'ui.sections.dashboards.crm.generated_revenue.revenue_generated_d7891231',
              )}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              {translateUi(
                'ui.sections.dashboards.crm.generated_revenue.amount_of_revenue_in_this_month_c90cfc9a',
              )}
            </Typography>
          </div>

          <Stack
            direction="row"
            sx={{
              flex: 1,
              flexBasis: { xs: '100%', sm: 0 },
              order: { xs: 1, sm: 0 },
              alignSelf: 'flex-end',
              gap: 2,
            }}
          >
            {chartLegends.map((legend) => (
              <ChartLegend
                key={legend.label}
                label={legend.label}
                color={legend.color}
                isActive={legendState[legend.label]}
                handleClick={() => handleLegendToggle(legend.label)}
              />
            ))}
          </Stack>

          <DashboardMenu />
        </Stack>

        <CRMGeneratedRevenueChart
          data={crmGeneratedRevenueData}
          sx={{ minHeight: { xs: 300, xl: 'unset' }, flex: 1 }}
          ref={chartRef}
        />
      </Stack>
    </Paper>
  );
};

export default CRMGeneratedRevenue;
