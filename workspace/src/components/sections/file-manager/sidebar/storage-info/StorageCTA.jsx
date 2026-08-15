import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import illustrationDark from 'assets/images/illustrations/10-dark.webp';
import illustration from 'assets/images/illustrations/10.webp';
import Image from 'components/base/Image';

const StorageCTA = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Image
        src={{ dark: illustrationDark, light: illustration }}
        sx={{ objectFit: 'contain', width: 128, height: 128 }}
      />
      <Typography variant="subtitle2" sx={{ fontWeight: 500, textAlign: 'center' }}>
        {translateUi(
          'ui.sections.file_manager.sidebar.storage_info.want_to_increase_storage_capacity_d973e50c',
        )}
      </Typography>
      <Button variant="contained" color="primary" fullWidth>
        {translateUi('ui.sections.file_manager.sidebar.storage_info.upgrade_a6f47e00')}
      </Button>
    </Stack>
  );
};

export default StorageCTA;
