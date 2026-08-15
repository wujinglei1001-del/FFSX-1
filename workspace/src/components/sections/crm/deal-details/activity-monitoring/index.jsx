import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ActivityTabs from '../../common/ActivityTabs';

const ActivityMonitoring = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: { xs: 3, md: 5 },
        px: { xs: 3, md: 5 },
        pb: 12,
        height: 1,
      }}
    >
      <Typography variant="h5" sx={{ mb: 4 }}>
        {translateUi(
          'ui.sections.crm.deal_details.activity_monitoring.activity_monitoring_ca92d7c3',
        )}
      </Typography>
      <ActivityTabs />
    </Paper>
  );
};

export default ActivityMonitoring;
