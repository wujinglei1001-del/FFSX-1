import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { REFRESH } from 'reducers/SettingsReducer';
import RTLMode from 'theme/RTLMode';
import { createTheme } from 'theme/theme';
import { useSettingsContext } from './SettingsProvider';

const ThemeProvider = ({ children, defaultMode = 'light', modeStorageKey = 'aurora-mode' }) => {
  const {
    config: { textDirection, locale, themePreset, primaryColor, fontFamily, fontSize },
    configDispatch,
  } = useSettingsContext();

  const skipPaletteRefreshOnMountRef = useRef(true);

  const customTheme = useMemo(() => {
    return createTheme({
      direction: textDirection,
      locale,
      preset: themePreset,
      primaryColor,
      fontFamily,
      fontSize,
    });
  }, [textDirection, locale, themePreset, primaryColor, fontFamily, fontSize]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (themePreset) {
      root.setAttribute('data-aurora-preset', themePreset);
    } else {
      root.removeAttribute('data-aurora-preset');
    }
    if (skipPaletteRefreshOnMountRef.current) {
      skipPaletteRefreshOnMountRef.current = false;
    } else {
      configDispatch({ type: REFRESH });
    }
  }, [themePreset, primaryColor, configDispatch]);

  useEffect(() => {
    const observer = new MutationObserver(() => configDispatch({ type: REFRESH }));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-aurora-color-scheme'],
    });
    return () => observer.disconnect();
  }, [configDispatch]);

  return (
    <MuiThemeProvider
      disableTransitionOnChange
      theme={customTheme}
      defaultMode={defaultMode}
      modeStorageKey={modeStorageKey}
    >
      <CssBaseline enableColorScheme />
      <RTLMode>{children}</RTLMode>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
