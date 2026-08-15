import { useTranslation } from 'react-i18next';
import { Paper, Stack } from '@mui/material';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import TimeSheetsTableContainer from 'components/sections/time-tracker/time-sheets';
import TimesheetsHeaderActions from 'components/sections/time-tracker/time-sheets/HeaderActions';

const TimeSheets = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ height: 1 }}>
      <PageHeader
        title={translateUi('ui.pages.apps.time_tracker.timesheets.timesheets_1b485b9e')}
        breadcrumb={[
          { label: translateUi('ui.pages.apps.time_tracker.timesheets.home_70f8bb9a'), url: '#!' },
          {
            label: translateUi('ui.pages.apps.time_tracker.timesheets.time_tracker_55712c7b'),
            url: '#!',
          },
          {
            label: translateUi('ui.pages.apps.time_tracker.timesheets.timesheets_1b485b9e'),
            active: true,
          },
        ]}
        actionComponent={<TimesheetsHeaderActions />}
      />

      <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
        <TimeSheetsTableContainer />
      </Paper>
    </Stack>
  );
};

export default TimeSheets;
