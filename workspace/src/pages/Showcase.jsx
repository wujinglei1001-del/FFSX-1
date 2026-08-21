import { Suspense, useMemo } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { publicShowcaseAssets } from 'data/ffax-public';
import { useSettingsContext } from 'providers/SettingsProvider';
import RTLMode from 'theme/RTLMode';
import { createTheme } from 'theme/theme';
import PageLoader from 'components/loading/PageLoader';
import Team from 'components/sections/landing/about-us/Team';
import { usePreloadAssets } from 'components/sections/showcase/common';
import ShowcaseHero from 'components/sections/showcase/hero';
import ShowcaseLayout from 'components/sections/showcase/layout';

const ltrCache = createCache({
  key: 'ffaxltr',
});

const ShowcaseThemeProvider = ({ children }) => {
  const {
    config: { textDirection, locale },
  } = useSettingsContext();

  const showcaseTheme = useMemo(
    () =>
      createTheme({
        direction: textDirection,
        locale,
        preset: 'default-dark',
        cssVarPrefix: 'ffax-showcase',
      }),
    [textDirection, locale],
  );

  return (
    <MuiThemeProvider
      disableTransitionOnChange
      theme={showcaseTheme}
      modeStorageKey="ffax-mode-showcase"
    >
      <CssBaseline enableColorScheme />
      <RTLMode>{children}</RTLMode>
    </MuiThemeProvider>
  );
};

const ShowcaseWrapper = ({ children }) => (
  <CacheProvider value={ltrCache}>
    <div dir="ltr" data-ffax-color-scheme="dark">
      <ShowcaseThemeProvider>{children}</ShowcaseThemeProvider>
    </div>
  </CacheProvider>
);

const ShowcaseContent = () => (
  <ShowcaseLayout>
    <ShowcaseHero />
    <Team />
  </ShowcaseLayout>
);

const Showcase = () => {
  usePreloadAssets([publicShowcaseAssets.hero.video, publicShowcaseAssets.hero.planet]);

  return (
    <ShowcaseWrapper>
      <Suspense
        fallback={
          <PageLoader sx={{ minHeight: '100vh', bgcolor: ({ vars }) => vars.palette.grey[950] }} />
        }
      >
        <ShowcaseContent />
      </Suspense>
    </ShowcaseWrapper>
  );
};

export default Showcase;
