import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import TimeTrackerAppsSitesMain from 'components/sections/time-tracker/apps-sites';
import TimeTrackerHeader from 'components/sections/time-tracker/common/time-tracker-header';

const AppsSites = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ height: 1 }}>
      <TimeTrackerHeader
        title={translateUi('ui.pages.apps.time_tracker.appssites.apps_sites_f81aa92f')}
        breadcrumb={[
          { label: translateUi('ui.pages.apps.time_tracker.appssites.home_70f8bb9a'), url: '#!' },
          {
            label: translateUi('ui.pages.apps.time_tracker.appssites.time_tracker_55712c7b'),
            url: '#!',
          },
          {
            label: translateUi('ui.pages.apps.time_tracker.appssites.apps_sites_f81aa92f'),
            active: true,
          },
        ]}
      />
      <TimeTrackerAppsSitesMain />
    </Stack>
  );
};

export default AppsSites;
