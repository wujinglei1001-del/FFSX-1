export const rootPaths = {
  root: '/',
  authRoot: 'authentication',
  authZitadelRoot: 'zitadel',
};

const paths = {
  workbench: '/workbench',
  notifications: '/pages/notifications',
  zitadelLogin: '/authentication/zitadel/login',
  zitadelSignup: '/authentication/zitadel/sign-up',
  zitadelVerifyEmail: '/authentication/zitadel/verify-email',
  zitadelLoggedOut: '/authentication/zitadel/logged-out',
  zitadelCallback: '/authentication/callback',
  landingAbout: '/pages/landing/about-us',
  landingContact: '/pages/landing/contact',
  landingFaq: '/pages/landing/faq',
  landingSubscriptions: '/pages/landing/contact?topic=subscription',
  comingSoon: '/__template-preview-disabled__',
};

const runtimeBasePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

export const workbenchEntryPath =
  runtimeBasePath === '/workbench' ? rootPaths.root : paths.workbench;

export const authPaths = {
  login: paths.zitadelLogin,
  signup: paths.zitadelSignup,
};

export const publicAuthPaths = {
  login: `${paths.workbench}${paths.zitadelLogin}`,
  signup: `${paths.workbench}${paths.zitadelSignup}`,
};

export const apiEndpoints = {
  login: '/auth/login',
  register: '/auth/register',
  verifyEmail: '/auth/verify-email',
  logout: '/auth/logout',
  profile: '/auth/profile',
  contactRequests: '/public/contact-requests',
  getUsers: '/users',
  notifications: '/v1/notifications',
  notificationRead: (id) => `/v1/notifications/${id}/read`,
  plugins: '/v1/plugins',
  pluginPurchase: (id) => `/v1/plugins/${id}/purchase`,
  pluginAction: (id, action) => `/v1/plugins/${id}/${action}`,
};

export default paths;
