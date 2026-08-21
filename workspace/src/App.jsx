import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useConfigFromQuery } from 'hooks/useConfigFromQuery';
import AuthProvider from 'providers/AuthProvider';
import SettingPanelToggler from 'components/settings-panel/SettingPanelToggler';
import SettingsPanel from 'components/settings-panel/SettingsPanel';

const App = () => {
  const { pathname } = useLocation();

  useConfigFromQuery();

  const isLandingPage = pathname === '/' || pathname.startsWith('/pages/landing/');

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isLandingPage) {
      document.documentElement.style.overscrollBehavior = 'none';
      document.documentElement.style.filter = 'none';
    }

    return () => {
      document.documentElement.style.overscrollBehavior = 'auto';
      document.documentElement.style.filter = 'auto';
    };
  }, [pathname, isLandingPage]);

  return (
    <AuthProvider>
      <Outlet />

      {!isLandingPage && (
        <>
          <SettingsPanel />
          <SettingPanelToggler />
        </>
      )}
    </AuthProvider>
  );
};

export default App;
