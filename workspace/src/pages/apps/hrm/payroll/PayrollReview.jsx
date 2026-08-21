import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import HeaderAction from 'components/sections/hrm/payroll/common/HeaderAction';
import PayrollPreviewMain from 'components/sections/hrm/payroll/payroll-review';
import paths from 'routes/paths';

const PayrollReview = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper>
      <PageHeader
        title={translateUi('ui.pages.apps.hrm.payroll.payroll_review_23700363')}
        breadcrumb={[
          {
            label: translateUi('ui.pages.apps.hrm.payroll.home_70f8bb9a'),
            url: paths.workbench,
          },
          { label: translateUi('ui.pages.apps.hrm.payroll.payroll_review_23700363'), active: true },
        ]}
        actionComponent={<HeaderAction />}
      />

      <PayrollPreviewMain />
    </Paper>
  );
};

export default PayrollReview;
