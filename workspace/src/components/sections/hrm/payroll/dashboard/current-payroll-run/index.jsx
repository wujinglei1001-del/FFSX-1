import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import PayrollCard from './PayrollCard';

const CurrentPayrollRun = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: { xs: 3, md: 5 }, height: 1 }}
    >
      <SectionHeader
        title={translateUi('ui.sections.hrm.payroll.dashboard.current_payroll_run_4e2d56f7')}
        subTitle="New payroll setup ready for processing"
        actionComponent={<DashboardMenu size="medium" />}
        sx={{ mb: 0 }}
      />
      <PayrollCard />
    </Paper>
  );
};

export default CurrentPayrollRun;
