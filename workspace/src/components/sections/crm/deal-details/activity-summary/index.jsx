import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import ActivityTimeline from './ActivityTimeline';
import Summary from './Summary';

const ActivitySummary = ({ activitySummary }) => {
  const { t: translateUi } = useTranslation();
  const { summary, timeline } = activitySummary;

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', p: { xs: 3, md: 5 }, gap: 3 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.crm.deal_details.activity_summary.activity_summary_e07519fd')}
        </Typography>
        <Button
          variant="soft"
          color="neutral"
          size="small"
          startIcon={<IconifyIcon icon="material-symbols:edit-outline-rounded" />}
        >
          {translateUi('ui.sections.crm.deal_details.activity_summary.modify_9fe408e1')}
        </Button>
      </Stack>
      <Stack
        sx={{
          gap: 3,
        }}
      >
        <Summary summary={summary} />
        <ActivityTimeline timeline={timeline} />
      </Stack>
    </Paper>
  );
};

export default ActivitySummary;
