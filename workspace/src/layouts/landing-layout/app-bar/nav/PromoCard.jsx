import { useTranslation } from 'react-i18next';
import { Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import illustrationDark from 'assets/images/illustrations/16-dark.webp';
import illustration from 'assets/images/illustrations/16.webp';
import { useThemeMode } from 'hooks/useThemeMode';
import { cssVarRgba } from 'lib/utils';
import paths from 'routes/paths';
import Image from 'components/base/Image';

const PromoCard = () => {
  const { t: translateUi } = useTranslation();
  const { isDark } = useThemeMode();

  return (
    <Paper
      sx={{
        outline: 'none',
        height: 1,
        width: 1,
        borderRadius: 2,
        p: 2,
        background: (theme) => `linear-gradient(242.63deg,
             ${cssVarRgba(isDark ? theme.vars.palette.background.elevation2Channel : theme.vars.palette.background.elevation1Channel, 1)} 45.75%,
             ${cssVarRgba(theme.vars.palette.chGreen['50Channel'], 1)} 94.14%,
             ${cssVarRgba(theme.vars.palette.chGreen['100Channel'], 1)} 140.25%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stack
        sx={{
          height: 1,
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'success.main',
            lineHeight: 1.2,
            fontWeight: 500,
            mb: 1,
          }}
        >
          {translateUi(
            'ui.layouts.landing_layout.app_bar.nav.try_our_app_for_a_simpler_organized_workflow_0acaf354',
          )}{' '}
        </Typography>

        <Image
          src={{ light: illustration, dark: illustrationDark }}
          sx={{
            display: 'block',
            height: 160,
            objectFit: 'contain',
            flexShrink: 0,
            mb: 2,
          }}
        />

        <Button variant="contained" color="success" href={paths.landingContact}>
          {translateUi('ui.layouts.landing_layout.app_bar.nav.book_a_demo_5de232f9')}
        </Button>
      </Stack>
    </Paper>
  );
};

export default PromoCard;
