import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import TimeTrackerHeader from 'components/sections/time-tracker/common/time-tracker-header';
import TimeTrackerReportMain from 'components/sections/time-tracker/report';
import paths from 'routes/paths';

const Report = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ height: 1 }}>
      <TimeTrackerHeader
        title={translateUi('ui.pages.apps.time_tracker.report.report_ee45c303')}
        breadcrumb={[
          {
            label: translateUi('ui.pages.apps.time_tracker.report.home_70f8bb9a'),
            url: paths.workbench,
          },
          {
            label: translateUi('ui.pages.apps.time_tracker.report.time_tracker_55712c7b'),
            url: paths.timeTracker,
          },
          { label: translateUi('ui.pages.apps.time_tracker.report.report_ee45c303'), active: true },
        ]}
        disableSearchbar
      />
      <TimeTrackerReportMain />
    </Stack>
  );
};

export default Report;
