import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import paths from 'routes/paths';
import RevealItems from 'components/sections/landing/common/RevealItems';
import RevealText from 'components/sections/landing/common/RevealText';

const CTA = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        gap: 5,
        alignItems: 'center',
        maxWidth: 600,
        mx: 'auto',
        pt: 15,
        pb: 10,
        px: { xs: 3, md: 5 },
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <RevealText>
          <Typography
            variant="h2"
            sx={{ typography: { xs: 'h3', sm: 'h2' }, color: 'primary.dark', mb: 1 }}
          >
            {translateUi('ui.layouts.landing_layout.footer.cta.start_with_us_today_09280e48')}
          </Typography>
        </RevealText>

        <RevealText>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translateUi(
              'ui.layouts.landing_layout.footer.cta.our_platform_s_design_and_architecture_are_crafted_t_d076c5a7',
            )}
          </Typography>
        </RevealText>
      </Box>
      <RevealItems component={Stack} direction="row" delay={0.1} y={0} sx={{ gap: 1 }}>
        <Button component={Link} href={paths.showcase} variant="contained" underline="none">
          进入地球村
        </Button>
        <Button component={Link} href={paths.landingSubscriptions} color="neutral" underline="none">
          选择服务
        </Button>
      </RevealItems>
    </Stack>
  );
};
export default CTA;
