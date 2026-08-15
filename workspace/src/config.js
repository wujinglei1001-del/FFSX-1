import { mainDrawerWidth } from 'lib/constants';

export const fontFamilies = ['Plus Jakarta Sans', 'Inter', 'Roboto', 'DM Sans'];

export const initialConfig = {
  assetsDir: import.meta.env.VITE_ASSET_BASE_URL ?? '',
  textDirection: 'ltr',
  navigationMenuType: 'sidenav',
  sidenavType: 'default',
  sidenavCollapsed: false,
  topnavType: 'default',
  navColor: 'default',
  openNavbarDrawer: false,
  drawerWidth: mainDrawerWidth.full,
  locale: 'zh-CN',
  currency: 'USD',
  themePreset: 'default-light',
  primaryColor: null,
  fontFamily: fontFamilies[0],
  fontSize: 16,
};

export const defaultJwtAuthCredentials = {
  email: 'demo@aurora.com',
  password: 'password123',
};
