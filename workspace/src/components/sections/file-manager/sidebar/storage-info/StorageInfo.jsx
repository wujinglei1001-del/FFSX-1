import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { fileStorageData } from 'data/file-manager';
import StorageBar from './StorageBar';
import StorageCTA from './StorageCTA';
import StorageSegmentList from './StorageSegmentList';

const StorageInfo = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        gap: 2,
        p: 3,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
        }}
      >
        {translateUi('ui.sections.file_manager.sidebar.storage_info.your_storage_1808738e')}
      </Typography>
      <StorageBar data={fileStorageData} />
      <StorageSegmentList data={fileStorageData} />
      <StorageCTA />
    </Stack>
  );
};

export default StorageInfo;
