import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import i18n from 'locales/i18n';
import paths, { publicAuthPaths, rootPaths, workbenchEntryPath } from 'routes/paths';
import Logo from 'components/common/Logo';
import NavList from './NavList';
import NewsLetter from './NewsLetter';
import SocialIcons from './SocialIcons';

const footerLinks = [
  {
    get title() {
      return i18n.t('ffax.public.footer.brand');
    },
    items: [
      {
        get label() {
          return i18n.t('ffax.public.navigation.about');
        },
        href: paths.landingAbout,
      },
      {
        get label() {
          return i18n.t('ffax.public.navigation.workbench');
        },
        href: workbenchEntryPath,
      },
      {
        get label() {
          return i18n.t('ffax.public.navigation.subscriptions');
        },
        href: paths.landingSubscriptions,
      },
    ],
  },
  {
    get title() {
      return i18n.t('ffax.public.footer.support');
    },
    items: [
      {
        get label() {
          return i18n.t('ffax.public.footer.help_center');
        },
        href: paths.landingFaq,
      },
      {
        get label() {
          return i18n.t('ffax.public.navigation.contact');
        },
        href: paths.landingContact,
      },
      {
        get label() {
          return i18n.t('ffax.public.navigation.subscriptions');
        },
        href: paths.landingSubscriptions,
      },
      {
        get label() {
          return i18n.t('ffax.public.navigation.faq');
        },
        href: paths.landingFaq,
      },
    ],
  },
  {
    get title() {
      return i18n.t('ffax.public.footer.access');
    },
    items: [
      {
        get label() {
          return i18n.t('ffax.public.navigation.login');
        },
        href: publicAuthPaths.login,
      },
      {
        get label() {
          return i18n.t('ffax.public.footer.create_account');
        },
        href: publicAuthPaths.signup,
      },
      {
        get label() {
          return i18n.t('ffax.public.navigation.faq');
        },
        href: paths.landingFaq,
      },
      {
        get label() {
          return i18n.t('ffax.public.navigation.contact');
        },
        href: paths.landingContact,
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
            <Logo href={rootPaths.root} />

            <Typography
              variant="body2"
              sx={{ maxWidth: { xs: 400, xl: 270 }, mt: 3, color: 'text.secondary' }}
            >
              {translateUi('ffax.public.footer.description')}
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
            {translateUi('ffax.public.footer.rights')}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};
export default NavSection;
