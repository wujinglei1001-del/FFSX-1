import { useTranslation } from 'react-i18next';
import { Paper } from '@mui/material';
import { storages } from 'data/e-commerce/dashboard';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import StorageBar from './StorageBar';

const StorageUsage = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.e_commerce.storage_usage.storage_usage_e7f5956b',
        )}
        subTitle=" Product categories occupying warehouse space"
        actionComponent={<DashboardMenu />}
      />
      <StorageBar storages={storages} />
    </Paper>
  );
};

export default StorageUsage;
