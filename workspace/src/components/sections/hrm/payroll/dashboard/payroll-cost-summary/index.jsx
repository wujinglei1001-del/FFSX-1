import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { costSummaryData } from 'data/hrm/payroll/dashboard';
import useToggleChartLegends from 'hooks/useToggleChartLegends';
import i18n from 'locales/i18n';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import CostSummaryChart from './CostSummaryChart';

const chartLegends = [
  {
    get label() {
      return i18n.t('ui.sections.hrm.payroll.dashboard.net_pay_a75db049');
    },
    color: 'chBlue.200',
  },
  {
    get label() {
      return i18n.t('ui.sections.hrm.payroll.dashboard.tax_9be70f66');
    },
    color: 'chLightBlue.200',
  },
  {
    get label() {
      return i18n.t('ui.sections.hrm.payroll.dashboard.extra_pay_cd343398');
    },
    color: 'chLightBlue.100',
  },
  {
    get label() {
      return i18n.t('ui.sections.hrm.payroll.dashboard.oth_deduction_5357cc27');
    },
    color: 'chOrange.100',
  },
];

const PayrollCostSummary = () => {
  const { t: translateUi } = useTranslation();
  const [data, setData] = useState(costSummaryData.previous_year);
  const chartRef = useRef(null);
  const { legendState, handleLegendToggle } = useToggleChartLegends(chartRef);

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <SectionHeader
        title={translateUi('ui.sections.hrm.payroll.dashboard.payroll_cost_summary_178e1fd9')}
        subTitle="Analayze payroll components at a glance"
        actionComponent={
          <DashboardSelectMenu
            defaultValue="previous_year"
            size="medium"
            options={[
              {
                label: translateUi('ui.sections.hrm.payroll.dashboard.previous_year_d338c159'),
                value: 'previous_year',
              },
              {
                label: translateUi('ui.sections.hrm.payroll.dashboard.this_year_77528c94'),
                value: 'this_year',
              },
            ]}
            onChange={(value) => setData(costSummaryData[value])}
          />
        }
      />
      <Stack
        sx={{
          gap: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: 2,
            alignItems: 'center',
            justifyContent: { xl: 'flex-end' },
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 700, lineHeight: 1.5 }}
          >
            {translateUi('ui.sections.hrm.payroll.dashboard.reasons_91293347')}
          </Typography>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
            {chartLegends.map(({ label, color }) => (
              <ButtonBase
                key={label}
                disableRipple
                onClick={() => handleLegendToggle(label)}
                sx={{
                  gap: 0.75,
                  alignItems: 'center',
                  opacity: legendState[label] ? 0.5 : 1,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: color,
                    borderRadius: 1,
                  }}
                />
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    color: 'text.secondary',
                    textOverflow: 'ellipsis',
                    fontWeight: 500,
                    maxWidth: 1,
                  }}
                >
                  {label}
                </Typography>
              </ButtonBase>
            ))}
          </Stack>
        </Stack>

        <Box
          sx={{
            overflowX: 'auto',
          }}
        >
          <CostSummaryChart
            ref={chartRef}
            data={data}
            sx={{ height: '100% !important', minHeight: { xs: 365 }, width: 1 }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default PayrollCostSummary;
