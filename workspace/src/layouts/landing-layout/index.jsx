import { useEffect, useRef } from 'react';
import useSettingsPanelMountEffect from 'hooks/useSettingsPanelMountEffect';
import { useSettingsContext } from 'providers/SettingsProvider';
import LandingAppBar from './app-bar';
import LandingFooter from './footer';

const LandingLayout = ({ children }) => {
  const {
    config: { navColor },
    setConfig,
  } = useSettingsContext();

  const navColorRef = useRef(navColor);

  useSettingsPanelMountEffect({
    disableNavigationMenuSection: true,
    disableSidenavShapeSection: true,
    disableTopShapeSection: true,
  });

  useEffect(() => {
    setConfig({
      navColor: 'default',
    });

    return () => {
      setConfig({
        navColor: navColorRef.current,
      });
    };
  }, []);

  return (
    <div>
      <LandingAppBar />
      {children}
      <LandingFooter />
    </div>
  );
};

export default LandingLayout;
