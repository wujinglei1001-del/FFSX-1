import { WebStorageStateStore } from 'oidc-client-ts';
import paths, { workbenchEntryPath } from 'routes/paths';

export const REMEMBER_DEVICE_KEY = 'ffax_remember_device';

const browserOrigin = typeof window === 'undefined' ? '' : window.location.origin;

const normalizeAuthority = (value = '') => value.trim().replace(/\/+$/, '');
const normalizeBasePath = (value = '/') => {
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, '');
  return withoutTrailingSlash || '';
};

export const appBasePath = normalizeBasePath(import.meta.env.BASE_URL || '/');

const getAbsoluteAppUrl = (path) => `${browserOrigin}${appBasePath}${path}`;
const projectId = import.meta.env.VITE_ZITADEL_PROJECT_ID?.trim() || '';
const authority = normalizeAuthority(import.meta.env.VITE_ZITADEL_DOMAIN);
const configuredScope =
  import.meta.env.VITE_ZITADEL_SCOPE?.trim() ||
  'openid profile email offline_access urn:zitadel:iam:user:resourceowner urn:zitadel:iam:org:projects:roles';
const audienceScope = projectId ? `urn:zitadel:iam:org:project:id:${projectId}:aud` : '';
const configuredPostLoginPath = normalizeBasePath(
  import.meta.env.VITE_POST_LOGIN_URL?.trim() || workbenchEntryPath,
);

export const zitadelConfig = {
  authority,
  clientId: import.meta.env.VITE_ZITADEL_CLIENT_ID?.trim() || '',
  projectId,
  redirectUri:
    import.meta.env.VITE_ZITADEL_CALLBACK_URL?.trim() || getAbsoluteAppUrl(paths.zitadelCallback),
  postLogoutRedirectUri:
    import.meta.env.VITE_ZITADEL_POST_LOGOUT_URL?.trim() ||
    getAbsoluteAppUrl(paths.zitadelLoggedOut),
  postLoginPath:
    appBasePath && configuredPostLoginPath === appBasePath ? '/' : configuredPostLoginPath,
  accountUrl:
    import.meta.env.VITE_ZITADEL_ACCOUNT_URL?.trim() ||
    (authority ? `${authority}/ui/console/users/me` : ''),
  scope: [configuredScope, audienceScope].filter(Boolean).join(' '),
};

export const isZitadelConfigured = Boolean(
  zitadelConfig.authority && zitadelConfig.clientId && zitadelConfig.projectId,
);

export const getZitadelOidcConfig = () => ({
  authority: zitadelConfig.authority,
  client_id: zitadelConfig.clientId,
  redirect_uri: zitadelConfig.redirectUri,
  post_logout_redirect_uri: zitadelConfig.postLogoutRedirectUri,
  response_type: 'code',
  scope: zitadelConfig.scope,
  automaticSilentRenew: true,
  loadUserInfo: true,
  revokeTokensOnSignout: true,
  userStore:
    typeof window === 'undefined'
      ? undefined
      : new WebStorageStateStore({
          store:
            window.localStorage.getItem(REMEMBER_DEVICE_KEY) === 'true'
              ? window.localStorage
              : window.sessionStorage,
        }),
});
