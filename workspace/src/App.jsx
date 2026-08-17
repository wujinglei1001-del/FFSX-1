import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useConfigFromQuery } from 'hooks/useConfigFromQuery';
import AuthProvider from 'providers/AuthProvider';
import SettingPanelToggler from 'components/settings-panel/SettingPanelToggler';
import SettingsPanel from 'components/settings-panel/SettingsPanel';

const App = () => {
  const { pathname } = useLocation();
  const isEmbedded = window.self !== window.top;

  useConfigFromQuery();

  const isShowcase = pathname === '/' || pathname.startsWith('/showcase');
  const isLanding = pathname.startsWith('/pages/landing');

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isShowcase) {
      document.documentElement.style.overscrollBehavior = 'none';
      document.documentElement.style.filter = 'none';
    }

    return () => {
      document.documentElement.style.overscrollBehavior = 'auto';
      document.documentElement.style.filter = 'auto';
    };
  }, [pathname, isShowcase]);

  return (
    <AuthProvider>
      {isEmbedded && (
        <GlobalStyles
          styles={{
            'html, body, #root': {
              scrollbarWidth: 'none !important',
              msOverflowStyle: 'none',
            },
            'html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar': {
              display: 'none !important',
              width: '0 !important',
              height: '0 !important',
            },
            '.simplebar-track': {
              display: 'none !important',
            },
          }}
        />
      )}
      {isLanding && (
        <GlobalStyles
          styles={{
            '#root': {
              userSelect: 'none',
              WebkitUserSelect: 'none',
            },
            '#root img, #root svg': {
              WebkitUserDrag: 'none',
              userSelect: 'none',
            },
            '#root input, #root textarea, #root [contenteditable="true"]': {
              userSelect: 'text',
              WebkitUserSelect: 'text',
            },
          }}
        />
      )}
      <Outlet />

      {!isShowcase && !isEmbedded && (
        <>
          <SettingsPanel />
          <SettingPanelToggler />
        </>
      )}
    </AuthProvider>
  );
};

export default App;
