import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import TimeTrackerHeader from 'components/sections/time-tracker/common/time-tracker-header';
import TimeTrackerScreenshotsMain from 'components/sections/time-tracker/screenshots';

const Screenshots = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ height: 1 }}>
      <TimeTrackerHeader
        title={translateUi('ui.pages.apps.time_tracker.screenshots.screenshots_597b6356')}
        breadcrumb={[
          { label: translateUi('ui.pages.apps.time_tracker.screenshots.home_70f8bb9a'), url: '#!' },
          {
            label: translateUi('ui.pages.apps.time_tracker.screenshots.time_tracker_55712c7b'),
            url: '#!',
          },
          {
            label: translateUi('ui.pages.apps.time_tracker.screenshots.screenshots_597b6356'),
            active: true,
          },
        ]}
      />
      <TimeTrackerScreenshotsMain />
    </Stack>
  );
};

export default Screenshots;
