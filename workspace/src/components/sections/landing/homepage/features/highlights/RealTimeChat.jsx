import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useSettingsContext } from 'providers/SettingsProvider';
import Image from 'components/base/Image';
import { BentoCardHeader } from './BentoCard';

const RealTimeChat = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { assetsDir },
  } = useSettingsContext();
  return (
    <Stack
      sx={{
        height: { xs: 300 },
      }}
    >
      <BentoCardHeader
        title={translateUi('ui.sections.landing.homepage.features.real_time_team_chat_bd0a093b')}
        subtitle={translateUi(
          'ui.sections.landing.homepage.features.create_stunning_websites_e592584c',
        )}
        sx={{ px: { xs: 2, md: 3 }, pt: { xs: 2, md: 3 }, direction: '/* @noflip */ ltr' }}
      />
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: { xs: 1, lg: 'auto' } }}>
        <Image
          src={{
            light: `${assetsDir}/images/landing/examples/4.webp`,
            dark: `${assetsDir}/images/landing/examples/4-dark.webp`,
          }}
          sx={{ width: 1, height: 1, objectFit: 'contain' }}
        />
      </Box>
    </Stack>
  );
};
export default RealTimeChat;
