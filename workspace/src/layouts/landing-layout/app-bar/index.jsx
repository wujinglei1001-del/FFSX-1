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
import paths, { authPaths } from 'routes/paths';
import Logo from 'components/common/Logo';
import Sidenav from './nav/Sidenav';
import Topnav from './nav/Topnav';

const loginHref = import.meta.env.PROD ? `/workbench${authPaths.login}` : authPaths.login;

const menus = [
  {
    get label() {
      return i18n.t('ui.layouts.landing_layout.app_bar.home_70f8bb9a');
    },
    href: paths.landingHomepage,
  },
  {
    get label() {
      return i18n.t('ui.layouts.landing_layout.app_bar.about_us_c887b9d3');
    },
    href: paths.landingAbout,
  },
  {
    get label() {
      return i18n.t('ui.layouts.landing_layout.app_bar.contact_b37456c4');
    },
    href: paths.landingContact,
  },
];
gsap.registerPlugin(ScrollTrigger);
const LandingAppBar = (props) => {
  const { t: translateUi } = useTranslation();
  const appBarRef = useRef(null);
  const popoverAnchorRef = useRef(null);
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
          <Logo showName={upMd} />
          {upSm ? (
            <SearchBox
              sx={{
                width: 1,
                maxWidth: 364,
              }}
            />
          ) : (
            <SearchBoxButton />
          )}
        </Stack>
        <Stack
          direction="row"
          ref={popoverAnchorRef}
          sx={{
            gap: 1,
          }}
        >
          {upLg && <Topnav menus={menus} anchorRef={popoverAnchorRef} />}
          <ThemeToggler />
          <Button component="a" variant="contained" href={loginHref} sx={{ minWidth: 120 }}>
            {translateUi('ui.layouts.landing_layout.app_bar.log_in_d527bf3d')}
          </Button>
          {!upLg && <Sidenav menus={menus} />}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default LandingAppBar;
