import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useAccounts } from 'providers/AccountsProvider';
import AccountTabPanelSection from 'components/sections/account/common/AccountTabPanelSection';
import ManageStorage from './ManageStorage';
import SavedtoStorage from './SavedtoStorage';

const StorageTabPanel = () => {
  const { t: translateUi } = useTranslation();
  const { storage } = useAccounts();
  const { backupSyncSettings, storageData } = storage;

  return (
    <Stack divider={<Divider />} sx={{ gap: 5 }}>
      <AccountTabPanelSection
        title={translateUi('ui.sections.account.storage.storagetabpanel.manage_storage_87e8f3e6')}
        subtitle={translateUi(
          'ui.sections.account.storage.storagetabpanel.effortlessly_manage_accurate_time_settings_and_adjus_f10065e4',
        )}
        icon="material-symbols:database-outline"
      >
        <ManageStorage storageData={storageData} />
      </AccountTabPanelSection>

      <AccountTabPanelSection
        title={translateUi('ui.sections.account.storage.storagetabpanel.saved_to_storage_a94fb266')}
        subtitle={translateUi(
          'ui.sections.account.storage.storagetabpanel.effortlessly_manage_accurate_time_settings_and_adjus_f10065e4',
        )}
        icon="material-symbols:backup-outline-rounded"
      >
        <SavedtoStorage backupSyncSettings={backupSyncSettings} storageData={storageData} />
      </AccountTabPanelSection>
    </Stack>
  );
};

export default StorageTabPanel;
