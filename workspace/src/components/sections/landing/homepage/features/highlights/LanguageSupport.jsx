import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';
import Image from 'components/base/Image';
import { BentoCardHeader } from './BentoCard';

const LanguageSupport = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { assetsDir },
  } = useSettingsContext();
  return (
    <Stack
      sx={{
        justifyContent: 'space-between',
        height: 1,
      }}
    >
      <Image
        src={`${assetsDir}/images/landing/examples/1.webp`}
        sx={{
          objectFit: 'cover',
          width: 1,
        }}
      />
      <BentoCardHeader
        title={translateUi('ui.sections.landing.homepage.features.10_supported_languages_82930d0d')}
        subtitle={translateUi(
          'ui.sections.landing.homepage.features.create_stunning_professional_quality_websites_2238d28a',
        )}
        sx={{ textAlign: 'center', p: { xs: 2, md: 3 }, pt: 0, mt: -2 }}
      />
    </Stack>
  );
};
export default LanguageSupport;
