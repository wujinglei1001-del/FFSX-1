import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Stack } from '@mui/material';
import { customerFeedbackData } from 'data/crm/dashboard';
import useToggleChartLegends from 'hooks/useToggleChartLegends';
import i18n from 'locales/i18n';
import ChartLegend from 'components/common/ChartLegend';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import CustomerFeedbackChart from './CustomerFeedbackChart';

const chartLegends = [
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.customer_feedback.positive_06fe9ace');
    },
    color: 'chBlue.200',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.customer_feedback.negative_c70827c6');
    },
    color: 'chGrey.200',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.customer_feedback.75th_percentile_a39ab390');
    },
    color: 'chBlue.500',
  },
];

const CustomerFeedback = () => {
  const { t: translateUi } = useTranslation();
  const chartRef = useRef(null);
  const { legendState, handleLegendToggle } = useToggleChartLegends(chartRef);

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.crm.customer_feedback.customer_feedback_3d89d266',
        )}
        subTitle="Number of clients with response"
        actionComponent={<DashboardMenu />}
        sx={{ mb: 3 }}
      />

      <CustomerFeedbackChart
        data={customerFeedbackData}
        sx={{
          height: { xs: '215px !important', sm: '250px !important', md: '215px !important' },
          mb: 1,
        }}
        ref={chartRef}
      />

      <Stack
        direction="row"
        sx={{
          gap: 2,
          flexWrap: 'wrap',
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
    </Paper>
  );
};

export default CustomerFeedback;
