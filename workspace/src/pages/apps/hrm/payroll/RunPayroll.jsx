import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import paths from 'routes/paths';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import HeaderAction from 'components/sections/hrm/payroll/common/HeaderAction';
import EarningsDeductionsMain from 'components/sections/hrm/payroll/earnings';

const RunPayroll = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper component={Grid} container>
      <Grid size={12}>
        <PageHeader
          title={translateUi('ui.pages.apps.hrm.payroll.run_payroll_e6657ad6')}
          breadcrumb={[
            {
              label: translateUi('ui.pages.apps.hrm.payroll.home_70f8bb9a'),
              url: paths.workbench,
            },
            { label: translateUi('ui.pages.apps.hrm.payroll.run_payroll_e6657ad6'), active: true },
          ]}
          actionComponent={<HeaderAction />}
        />
      </Grid>

      <Grid size={12}>
        <EarningsDeductionsMain />
      </Grid>
    </Paper>
  );
};

export default RunPayroll;
