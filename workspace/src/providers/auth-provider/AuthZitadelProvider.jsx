import { createContext, useCallback, useEffect, useMemo } from 'react';
import { AuthProvider as OidcAuthProvider, useAuth as useOidcAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router';
import {
  REMEMBER_DEVICE_KEY,
  appBasePath,
  getZitadelOidcConfig,
  isZitadelConfigured,
  zitadelConfig,
} from 'config/zitadel';
import axiosInstance from 'services/axios/axiosInstance';

const AUTH_TOKEN_KEY = 'auth_token';

const normalizeReturnTo = (value) => {
  if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
    if (appBasePath && value === appBasePath) return '/';
    if (appBasePath && value.startsWith(`${appBasePath}/`)) {
      return value.slice(appBasePath.length) || '/';
    }
    return value;
  }

  return zitadelConfig.postLoginPath;
};

const getProjectRoleClaim = (profile) => {
  const projectClaim = zitadelConfig.projectId
    ? profile[`urn:zitadel:iam:org:project:${zitadelConfig.projectId}:roles`]
    : undefined;
  return (
    projectClaim ||
    profile['urn:zitadel:iam:org:project:roles'] ||
    profile['urn:zitadel:iam:org:projects:roles'] ||
    {}
  );
};

const normalizeProjectRoles = (profile) => {
  const normalized = {};
  const claim = getProjectRoleClaim(profile);
  const grants = Array.isArray(claim) ? claim : [claim];

  for (const grant of grants) {
    if (!grant || typeof grant !== 'object' || Array.isArray(grant)) continue;
    for (const [role, organizations] of Object.entries(grant)) {
      normalized[role] ||= {};
      if (organizations && typeof organizations === 'object' && !Array.isArray(organizations)) {
        Object.assign(normalized[role], organizations);
      }
    }
  }

  return normalized;
};

const getProjectRoles = (profile) => Object.keys(normalizeProjectRoles(profile));

const getRoleOrganization = (profile) => {
  const organizationIds = new Set(
    Object.values(normalizeProjectRoles(profile)).flatMap((organizations) =>
      Object.keys(organizations),
    ),
  );
  return organizationIds.size === 1 ? [...organizationIds][0] : '';
};

const getSessionUser = (oidcUser) => {
  if (!oidcUser) return null;

  const { profile } = oidcUser;
  const organization =
    profile?.['urn:zitadel:iam:user:resourceowner:id'] ||
    profile?.['urn:zitadel:iam:user:resourceowner'] ||
    profile?.['urn:zitadel:iam:org:resourceowner'] ||
    profile?.resourceowner ||
    profile?.resourceOwner ||
    profile?.org_id ||
    profile?.orgId ||
    profile?.organization_id ||
    profile?.org?.id ||
    profile?.organization?.id ||
    profile?.organization?.orgId ||
    profile?.organization?.resourceOwner ||
    getRoleOrganization(profile) ||
    '';
  const organizationName =
    profile?.['urn:zitadel:iam:user:resourceowner:name'] ||
    profile?.organization_name ||
    profile?.organizationName ||
    profile?.org?.name ||
    profile?.organization?.name ||
    '';

  return {
    id: profile.sub,
    name: profile.name || profile.preferred_username || profile.email || 'FFA-X User',
    email: profile.email,
    avatar: profile.picture,
    username: profile.preferred_username,
    organization,
    organizationName,
    roles: getProjectRoles(profile),
    profile,
  };
};

export const AuthZitadelContext = createContext(null);

const UnconfiguredAuthProvider = ({ children }) => {
  const value = useMemo(
    () => ({
      sessionUser: null,
      accessToken: null,
      getAccessToken: async () => null,
      isLoading: false,
      isConfigured: false,
      error: null,
      signin: async () => undefined,
      signout: async () => undefined,
    }),
    [],
  );

  return <AuthZitadelContext value={value}>{children}</AuthZitadelContext>;
};

const ZitadelSessionProvider = ({ children }) => {
  const oidc = useOidcAuth();

  useEffect(() => {
    if (oidc.user?.access_token) {
      const rememberDevice = localStorage.getItem(REMEMBER_DEVICE_KEY) === 'true';
      const activeStorage = rememberDevice ? localStorage : sessionStorage;
      const inactiveStorage = rememberDevice ? sessionStorage : localStorage;

      activeStorage.setItem(AUTH_TOKEN_KEY, oidc.user.access_token);
      inactiveStorage.removeItem(AUTH_TOKEN_KEY);
      return;
    }

    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }, [oidc.user?.access_token]);

  const signin = useCallback(
    (returnTo) =>
      oidc.signinRedirect({
        state: { returnTo: normalizeReturnTo(returnTo) },
      }),
    [oidc],
  );

  const signout = useCallback(async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch {
      // Local sign-out must still complete if the server session has already expired.
    }
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REMEMBER_DEVICE_KEY);
    try {
      await oidc.signoutRedirect({
        post_logout_redirect_uri: zitadelConfig.postLogoutRedirectUri,
      });
    } catch {
      await oidc.removeUser();
      window.location.assign(`${appBasePath}/authentication/zitadel/logged-out`);
    }
  }, [oidc]);

  const getAccessToken = useCallback(async () => {
    if (oidc.user?.access_token && !oidc.user.expired) return oidc.user.access_token;
    const renewed = await oidc.signinSilent();
    return renewed?.access_token || null;
  }, [oidc]);

  const value = useMemo(
    () => ({
      sessionUser: oidc.isAuthenticated ? getSessionUser(oidc.user) : null,
      accessToken: oidc.user?.access_token || null,
      getAccessToken,
      isLoading: oidc.isLoading,
      isConfigured: true,
      error: oidc.error || null,
      signin,
      signout,
    }),
    [getAccessToken, oidc.error, oidc.isAuthenticated, oidc.isLoading, oidc.user, signin, signout],
  );

  return <AuthZitadelContext value={value}>{children}</AuthZitadelContext>;
};

const AuthZitadelProvider = ({ children }) => {
  const navigate = useNavigate();
  const onSigninCallback = useCallback(
    (user) => {
      navigate(normalizeReturnTo(user?.state?.returnTo), { replace: true });
    },
    [navigate],
  );

  if (!isZitadelConfigured) {
    return <UnconfiguredAuthProvider>{children}</UnconfiguredAuthProvider>;
  }

  return (
    <OidcAuthProvider {...getZitadelOidcConfig()} onSigninCallback={onSigninCallback}>
      <ZitadelSessionProvider>{children}</ZitadelSessionProvider>
    </OidcAuthProvider>
  );
};

export default AuthZitadelProvider;
