import { useEffect, useMemo } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useSettingsContext } from 'providers/SettingsProvider';
import rtlPlugin from 'stylis-plugin-rtl';

const createRtlCache = () => {
  const cache = createCache({
    key: 'ffaxrtl',
    stylisPlugins: [rtlPlugin],
  });
  cache.compat = true;

  return cache;
};

const createLtrCache = () => {
  const cache = createCache({
    key: 'ffax',
  });
  cache.compat = true;

  return cache;
};

const RTLMode = ({ children }) => {
  const {
    config: { textDirection },
  } = useSettingsContext();

  const cache = useMemo(
    () => (textDirection === 'rtl' ? createRtlCache() : createLtrCache()),
    [textDirection],
  );

  useEffect(() => {
    document.dir = textDirection;
  }, [textDirection]);

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default RTLMode;
