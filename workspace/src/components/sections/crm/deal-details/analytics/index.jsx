import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AnalyticsChart from './AnalyticsChart';
import AnalyticsDetails from './AnalyticsDetails';

const Analytics = ({ analyticsData }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      sx={{ display: 'flex', flexDirection: 'column', height: 1, p: { xs: 3, md: 5 }, gap: 3 }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.crm.deal_details.analytics.analytics_25bc9629')}
        </Typography>
      </Stack>
      <Stack
        sx={{
          gap: 2.5,
        }}
      >
        <AnalyticsChart
          data={analyticsData}
          sx={{ mx: 'auto', height: '144px !important', width: 224 }}
        />
        <AnalyticsDetails data={analyticsData} />
      </Stack>
    </Paper>
  );
};

export default Analytics;
