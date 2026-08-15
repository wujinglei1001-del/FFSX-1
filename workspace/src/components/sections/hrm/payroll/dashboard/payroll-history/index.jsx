import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { payrollHistoryData } from 'data/hrm/payroll/dashboard';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import PayrollHistoryCard from './PayrollHistoryCard';

const PayrollHistory = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <SectionHeader
        title={translateUi('ui.sections.hrm.payroll.dashboard.payroll_history_b278e655')}
        subTitle="Keep track of past payroll activity"
        actionComponent={<DashboardMenu size="medium" />}
      />
      <Grid
        container
        spacing={1}
        sx={{ overflowY: 'auto', maxHeight: { xs: 1, md: 315, lg: 399 } }}
      >
        {payrollHistoryData.map((payroll) => (
          <Grid key={payroll.id} size={{ xs: 12, lg: 6, xl: 12 }}>
            <PayrollHistoryCard {...payroll} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PayrollHistory;
