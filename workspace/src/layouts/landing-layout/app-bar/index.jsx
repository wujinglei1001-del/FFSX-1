import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThemeToggler from 'layouts/main-layout/common/ThemeToggler';
import SearchBox, { SearchBoxButton } from 'layouts/main-layout/common/search-box/SearchBox';
import i18n from 'locales/i18n';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths, { publicAuthPaths, rootPaths } from 'routes/paths';
import publicSitemap from 'routes/public-sitemap';
import Logo from 'components/common/Logo';
import Sidenav from './nav/Sidenav';
import Topnav from './nav/Topnav';

const menus = [
  {
    get label() {
      return i18n.t('ffax.public.navigation.home');
    },
    href: rootPaths.root,
  },
  {
    get label() {
      return i18n.t('ffax.public.navigation.about');
    },
    href: paths.landingAbout,
  },
  {
    get label() {
      return i18n.t('ffax.public.navigation.contact');
    },
    href: paths.landingContact,
  },
  {
    get label() {
      return i18n.t('ffax.public.navigation.faq');
    },
    href: paths.landingFaq,
  },
  {
    get label() {
      return i18n.t('ffax.public.navigation.subscriptions');
    },
    href: paths.landingSubscriptions,
  },
];
gsap.registerPlugin(ScrollTrigger);
const LandingAppBar = (props) => {
  const { t: translateUi } = useTranslation();
  const appBarRef = useRef(null);
  const { up } = useBreakpoints();
  const upSm = up('sm');
  const upMd = up('md');
  const upLg = up('lg');
  useGSAP(() => {
    if (!appBarRef.current) return;
    gsap.fromTo(
      appBarRef.current,
      {
        '--bg-opacity': 0,
      },
      {
        '--bg-opacity': 1,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '200px top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  }, []);
  return (
    <AppBar
      ref={appBarRef}
      sx={{
        outline: 0,
        bgcolor: 'transparent',
        transition: 'none',
        '--bg-opacity': 0,
        background: ({ vars }) =>
          `rgba(${vars.palette.background.paperChannel} / var(--bg-opacity))`,
      }}
      {...props}
    >
      <Toolbar
        sx={{
          px: { xs: 3, md: 5 },
          maxWidth: 1448,
          mx: 'auto',
          minHeight: 56,
          width: 1,
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: { xs: 1, sm: 2 },
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Logo showName={upMd} href={rootPaths.root} />
          {upSm ? (
            <SearchBox
              navigation={publicSitemap}
              sx={{
                width: 1,
                maxWidth: 364,
              }}
            />
          ) : (
            <SearchBoxButton navigation={publicSitemap} />
          )}
        </Stack>
        <Stack
          direction="row"
          sx={{
            gap: 1,
          }}
        >
          {upLg && <Topnav menus={menus} />}
          <ThemeToggler />
          <Button variant="contained" href={publicAuthPaths.login} sx={{ minWidth: 120 }}>
            {translateUi('ffax.public.navigation.login')}
          </Button>
          {!upLg && <Sidenav menus={menus} />}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default LandingAppBar;
