import { useTranslation } from 'react-i18next';
import { Paper } from '@mui/material';
import SectionHeader from 'components/common/SectionHeader';
import HoursCompletedChart from './HoursCompletedChart';

const HoursCompleted = ({ projectHours }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.project.hours_completed.hours_completed_by_projects_0434a8dc',
        )}
        subTitle="Status of completion for all tasks"
      />
      <HoursCompletedChart data={projectHours} sx={{ flex: 1, width: 1, minHeight: 360 }} />
    </Paper>
  );
};

export default HoursCompleted;
