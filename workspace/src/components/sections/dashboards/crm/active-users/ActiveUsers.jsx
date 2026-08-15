import { useTranslation } from 'react-i18next';
import { Box, Paper } from '@mui/material';
import { activeUsersData } from 'data/crm/dashboard';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import ActiveUsersChart from './ActiveUsersChart';

const ActiveUsers = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      sx={{
        height: 1,
        overflow: 'hidden',
        p: { xs: 3, md: 5 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SectionHeader
        title={translateUi('ui.sections.dashboards.crm.active_users.monthly_active_users_4f992a68')}
        subTitle="Product categories occupying warehouse space"
        sx={{ mb: { xs: 2, md: 4 } }}
        actionComponent={
          <DashboardSelectMenu
            options={[
              {
                value: 15,
                label: translateUi('ui.sections.dashboards.crm.active_users.last_15_days_bf13fe6b'),
              },
              {
                value: 7,
                label: translateUi('ui.sections.dashboards.crm.active_users.last_7_days_df833fe8'),
              },
              {
                value: 30,
                label: translateUi('ui.sections.dashboards.crm.active_users.last_30_days_6b329852'),
              },
            ]}
            defaultValue={15}
            sx={{ minWidth: 0 }}
          />
        }
      />

      <Box
        sx={{
          overflowX: 'auto',
        }}
      >
        <ActiveUsersChart data={activeUsersData} sx={{ minHeight: 380, minWidth: 800, width: 1 }} />
      </Box>
    </Paper>
  );
};

export default ActiveUsers;
