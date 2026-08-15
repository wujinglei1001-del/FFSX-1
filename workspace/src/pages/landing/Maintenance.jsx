import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import illustrationDark from 'assets/images/illustrations/15-dark.webp';
import illustration from 'assets/images/illustrations/15.webp';
import paths from 'routes/paths';
import Image from 'components/base/Image';

const LandingMaintenance = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        px: { xs: 3, md: 5 },
        py: 18,
        gap: 5,
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Image
        src={{
          light: illustration,
          dark: illustrationDark,
        }}
        alt=""
        sx={{ width: 1, maxWidth: 440, objectFit: 'contain' }}
      />

      <div>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {translateUi('ui.pages.landing.maintenance.site_is_temporarily_unavailable_now_1bc01cfe')}
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.pages.landing.maintenance.we_re_working_hard_to_enhance_this_page_2d7edba9',
          )}
        </Typography>

        <Button variant="contained" href={paths.landingHomepage}>
          {translateUi('ui.pages.landing.maintenance.go_back_home_2de04546')}
        </Button>
      </div>
    </Stack>
  );
};
export default LandingMaintenance;
