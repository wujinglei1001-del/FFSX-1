import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import i18n from 'locales/i18n';
import paths from 'routes/paths';
import Logo from 'components/common/Logo';
import NavList from './NavList';
import NewsLetter from './NewsLetter';
import SocialIcons from './SocialIcons';

const footerLinks = [
  {
    get title() {
      return i18n.t('ui.layouts.landing_layout.footer.navsection.aurora_eeee9b76');
    },
    items: [
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.about_us_c887b9d3');
        },
        href: paths.landingAbout,
      },
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.careers_68d70e59');
        },
        href: '#!',
      },
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.blog_0b9d2b23');
        },
        href: '#!',
      },
    ],
  },
  {
    get title() {
      return i18n.t('ui.layouts.landing_layout.footer.navsection.support_f32d5a3b');
    },
    items: [
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.help_center_11015825');
        },
        href: '#!',
      },
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.contact_us_9ad0ccff');
        },
        href: paths.landingContact,
      },
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.pricing_a0d9bbad');
        },
        href: '#!',
      },
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.faqs_ab9dcd4a');
        },
        href: paths.landingFaq,
      },
    ],
  },
  {
    get title() {
      return i18n.t('ui.layouts.landing_layout.footer.navsection.legal_902c91d9');
    },
    items: [
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.privacy_cf01481f');
        },
        href: '#!',
      },
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.cookie_e4f81994');
        },
        href: '#!',
      },
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.terms_a55a275a');
        },
        href: '#!',
      },
      {
        get label() {
          return i18n.t('ui.layouts.landing_layout.footer.navsection.security_f25ce1b8');
        },
        href: '#!',
      },
    ],
  },
];
const NavSection = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1448, px: { xs: 3, md: 5 } }}>
      <Stack divider={<Divider flexItem />}>
        <Grid
          container
          rowSpacing={5}
          sx={{
            py: 5,
          }}
        >
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Logo />

            <Typography
              variant="body2"
              sx={{ maxWidth: { xs: 400, xl: 270 }, mt: 3, color: 'text.secondary' }}
            >
              {translateUi(
                'ui.layouts.landing_layout.footer.navsection.aurora_is_a_complete_platform_with_a_user_friendly_i_988b2cd0',
              )}
            </Typography>
          </Grid>

          <Grid container size={{ xs: 12, md: 7, lg: 4 }}>
            {footerLinks.map((item) => (
              <Grid key={item.title} size={{ xs: 4 }}>
                <NavList title={item.title} items={item.items} />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} size={{ xs: 12, sm: 7, md: 5, lg: 4 }}>
            <Grid size={{ xs: 12 }}>
              <NewsLetter />
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ justifySelf: 'flex-end' }}>
              <SocialIcons />
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ my: 2 }}>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            {translateUi(
              'ui.layouts.landing_layout.footer.navsection.aurora_ltd_2025_all_rights_reserved_8fc42a94',
            )}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};
export default NavSection;
