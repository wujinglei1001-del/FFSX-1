import { mainDrawerWidth } from 'lib/constants';

export const fontFamilies = ['Plus Jakarta Sans'];

const optionalExternalUrl = (value) => value?.trim() || '';

export const externalLinks = {
  contact: {
    website: optionalExternalUrl(import.meta.env.VITE_FFAX_WEBSITE_URL),
    email: optionalExternalUrl(import.meta.env.VITE_FFAX_CONTACT_EMAIL),
    phone: optionalExternalUrl(import.meta.env.VITE_FFAX_CONTACT_PHONE),
    location: optionalExternalUrl(import.meta.env.VITE_FFAX_CONTACT_LOCATION),
  },
  legal: {
    privacy: optionalExternalUrl(import.meta.env.VITE_FFAX_PRIVACY_URL),
    cookies: optionalExternalUrl(import.meta.env.VITE_FFAX_COOKIE_URL),
    terms: optionalExternalUrl(import.meta.env.VITE_FFAX_TERMS_URL),
    security: optionalExternalUrl(import.meta.env.VITE_FFAX_SECURITY_URL),
  },
  social: {
    facebook: optionalExternalUrl(import.meta.env.VITE_FFAX_FACEBOOK_URL),
    instagram: optionalExternalUrl(import.meta.env.VITE_FFAX_INSTAGRAM_URL),
    threads: optionalExternalUrl(import.meta.env.VITE_FFAX_THREADS_URL),
    x: optionalExternalUrl(import.meta.env.VITE_FFAX_X_URL),
    notion: optionalExternalUrl(import.meta.env.VITE_FFAX_NOTION_URL),
    youtube: optionalExternalUrl(import.meta.env.VITE_FFAX_YOUTUBE_URL),
    pinterest: optionalExternalUrl(import.meta.env.VITE_FFAX_PINTEREST_URL),
    tiktok: optionalExternalUrl(import.meta.env.VITE_FFAX_TIKTOK_URL),
  },
};

export const initialConfig = {
  assetsDir: import.meta.env.VITE_ASSET_BASE_URL?.trim() || '/assets',
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
