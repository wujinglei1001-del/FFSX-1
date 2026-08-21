import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useConfigFromQuery } from 'hooks/useConfigFromQuery';
import AuthProvider from 'providers/AuthProvider';
import { rootPaths } from 'routes/paths';
import SettingPanelToggler from 'components/settings-panel/SettingPanelToggler';
import SettingsPanel from 'components/settings-panel/SettingsPanel';

const App = () => {
  const { pathname } = useLocation();

  useConfigFromQuery();

  const runtimeBasePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';
  const isWorkbenchBundle = runtimeBasePath === '/workbench';
  const isShowcase = !isWorkbenchBundle && pathname === '/';
  const isAuthentication = pathname.startsWith(`/${rootPaths.authRoot}`);

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
      <Outlet />

      {!isShowcase && !isAuthentication && (
        <>
          <SettingsPanel />
          <SettingPanelToggler />
        </>
      )}
    </AuthProvider>
  );
};

export default App;
