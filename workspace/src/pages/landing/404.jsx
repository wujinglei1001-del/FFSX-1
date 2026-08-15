import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import illustrationDark from 'assets/images/illustrations/14-dark.webp';
import illustration from 'assets/images/illustrations/14.webp';
import paths from 'routes/paths';
import Image from 'components/base/Image';

const Landing404 = () => {
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
        sx={{ width: 1, maxWidth: 734, objectFit: 'contain' }}
      />

      <div>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {translateUi('ui.pages.landing.404.page_not_found_f08f180b')}
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.pages.landing.404.no_worries_let_s_take_you_back_while_our_bear_is_sea_b73c3ba1',
          )}
        </Typography>

        <Button variant="contained" href={paths.landingHomepage}>
          {translateUi('ui.pages.landing.404.go_back_home_2de04546')}
        </Button>
      </div>
    </Stack>
  );
};
export default Landing404;
