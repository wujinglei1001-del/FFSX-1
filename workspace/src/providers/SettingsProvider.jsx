import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { initialConfig } from 'config';
import { getColor } from 'helpers/echart-utils';
import { getItemFromStore, setItemToStore } from 'lib/utils';
import {
  COLLAPSE_NAVBAR,
  EXPAND_NAVBAR,
  SET_CONFIG,
  settingsReducer,
} from 'reducers/SettingsReducer';
import { COLOR_GROUPS } from 'theme/primaryColorOverride';

export const SettingsContext = createContext({});

const SettingsProvider = ({ children }) => {
  const localeMigrationVersion = 'zh-default-v1';
  const storedLocaleMigrationVersion = getItemFromStore('localeMigrationVersion', null);
  const shouldMigrateLocale = storedLocaleMigrationVersion !== localeMigrationVersion;

  if (shouldMigrateLocale) {
    setItemToStore('locale', initialConfig.locale);
    setItemToStore('localeMigrationVersion', localeMigrationVersion);
  }

  const storedPrimaryColor = getItemFromStore('primaryColor', undefined);
  let primaryColor = typeof storedPrimaryColor === 'string' ? storedPrimaryColor : null;

  const storedThemePreset = getItemFromStore('themePreset', initialConfig.themePreset);
  const themePreset =
    typeof storedThemePreset === 'string' ? storedThemePreset : initialConfig.themePreset;

  if (!primaryColor && themePreset) {
    const colorGroup = COLOR_GROUPS.find((group) => group.key === themePreset);
    if (colorGroup) {
      primaryColor = colorGroup.main;
    }
  }

  const configState = {
    ...initialConfig,
    sidenavCollapsed: getItemFromStore('sidenavCollapsed', initialConfig.sidenavCollapsed),
    sidenavType: getItemFromStore('sidenavType', initialConfig.sidenavType),
    topnavType: getItemFromStore('topnavType', initialConfig.topnavType),
    textDirection: getItemFromStore('textDirection', initialConfig.textDirection),
    navigationMenuType: getItemFromStore('navigationMenuType', initialConfig.navigationMenuType),
    navColor: getItemFromStore('navColor', initialConfig.navColor),
    locale: shouldMigrateLocale
      ? initialConfig.locale
      : getItemFromStore('locale', initialConfig.locale),
    currency: getItemFromStore('currency', initialConfig.currency),
    fontFamily: getItemFromStore('fontFamily', initialConfig.fontFamily),
    fontSize: Number(getItemFromStore('fontSize', initialConfig.fontSize.toString())),
    themePreset: themePreset,
    primaryColor,
  };
  const [config, configDispatch] = useReducer(settingsReducer, configState);
  const { i18n } = useTranslation();

  const setConfig = useCallback(
    (payload) => {
      configDispatch({
        type: SET_CONFIG,
        payload,
      });
    },
    [configDispatch],
  );

  const handleDrawerToggle = () => {
    setConfig({
      openNavbarDrawer: !config.openNavbarDrawer,
    });
  };

  const toggleNavbarCollapse = () => {
    if (config.sidenavCollapsed) {
      configDispatch({
        type: EXPAND_NAVBAR,
      });
    } else {
      configDispatch({
        type: COLLAPSE_NAVBAR,
      });
    }
  };

  const getThemeColor = (color) => {
    return getColor(color);
  };

  useEffect(() => {
    i18n.changeLanguage(config.locale.split('-').join(''));
  }, [config.locale]);

  return (
    <SettingsContext
      value={{
        config,
        configDispatch,
        setConfig,
        handleDrawerToggle,
        toggleNavbarCollapse,
        getThemeColor,
      }}
    >
      {children}
    </SettingsContext>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsProvider;
