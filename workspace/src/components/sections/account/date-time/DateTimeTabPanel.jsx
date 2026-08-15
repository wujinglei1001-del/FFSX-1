import { useTranslation } from 'react-i18next';
import { Divider, Stack } from '@mui/material';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import DateAndTime from './DateAndTime';
import Timezone from './Timezone';

const DateTimeTabPanel = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack divider={<Divider />} sx={{ gap: 5 }}>
      <AccountTabPanelSection
        title={translateUi(
          'ui.sections.account.date_time.datetimetabpanel.precision_time_58e6aa3c',
        )}
        subtitle={translateUi(
          'ui.sections.account.date_time.datetimetabpanel.effortlessly_manage_accurate_time_settings_and_adjus_f10065e4',
        )}
        icon="material-symbols:timer-outline-rounded"
      >
        <DateAndTime />
      </AccountTabPanelSection>
      <AccountTabPanelSection
        title={translateUi(
          'ui.sections.account.date_time.datetimetabpanel.location_based_time_sync_43a9f902',
        )}
        subtitle={translateUi(
          'ui.sections.account.date_time.datetimetabpanel.automatically_adjust_time_zones_using_your_current_l_74ced4b5',
        )}
        icon="material-symbols:location-on-outline-rounded"
      >
        <Timezone />
      </AccountTabPanelSection>
    </Stack>
  );
};

export default DateTimeTabPanel;
