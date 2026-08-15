import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useSettingsContext } from 'providers/SettingsProvider';
import Image from 'components/base/Image';
import { BentoCardHeader } from './BentoCard';

const MobileFriendly = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { assetsDir },
  } = useSettingsContext();
  return (
    <Stack
      sx={{
        gap: { xs: 4, md: 4 },
        height: 1,
        bgcolor: 'primary.lighter',
        px: { xs: 2, md: 3 },
      }}
    >
      <BentoCardHeader
        title={translateUi('ui.sections.landing.homepage.features.mobile_friendly_45c95981')}
        subtitle={translateUi(
          'ui.sections.landing.homepage.features.adapt_seamlessly_to_any_device_df44ca65',
        )}
        sx={{ pt: { xs: 2, md: 3 } }}
      />
      <Box
        sx={{
          flex: 1,
          alignContent: 'flex-end',
        }}
      >
        <Image
          src={{
            light: `${assetsDir}/images/landing/examples/2.webp`,
            dark: `${assetsDir}/images/landing/examples/2-dark.webp`,
          }}
          sx={{ width: 1, height: 'auto', objectFit: 'contain', display: 'block' }}
        />
      </Box>
    </Stack>
  );
};
export default MobileFriendly;
