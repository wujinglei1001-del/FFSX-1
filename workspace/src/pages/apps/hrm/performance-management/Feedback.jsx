import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import paths from 'routes/paths';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import HRMFeedbackMain from 'components/sections/hrm/performance-management/feedback';

const Feedback = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box sx={{ height: '100%' }}>
      <PageHeader
        title={translateUi('ui.pages.apps.hrm.performance_management.feedback_c8d7677e')}
        breadcrumb={[
          {
            label: translateUi('ui.pages.apps.hrm.performance_management.home_70f8bb9a'),
            url: paths.workbench,
          },
          {
            label: translateUi('ui.pages.apps.hrm.performance_management.feedback_c8d7677e'),
            active: true,
          },
        ]}
        actionComponent={
          <DashboardSelectMenu
            size="medium"
            defaultValue={6}
            options={[
              {
                value: 1,
                label: translateUi(
                  'ui.pages.apps.hrm.performance_management.sort_by_last_month_d24d3a53',
                ),
              },
              {
                value: 6,
                label: translateUi(
                  'ui.pages.apps.hrm.performance_management.sort_by_last_6_month_8f8fb3b3',
                ),
              },
              {
                value: 12,
                label: translateUi(
                  'ui.pages.apps.hrm.performance_management.sort_by_last_12_month_094e48b7',
                ),
              },
            ]}
            sx={{ maxWidth: 234, width: 1 }}
          />
        }
        paperProps={{
          sx: { outline: 0 },
        }}
      />

      <HRMFeedbackMain />
    </Box>
  );
};

export default Feedback;
