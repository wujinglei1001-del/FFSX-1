import { createContext, useCallback, useEffect, useMemo } from 'react';
import { AuthProvider as OidcAuthProvider, useAuth as useOidcAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router';
import { getZitadelOidcConfig, isZitadelConfigured, zitadelConfig } from 'config/zitadel';

const AUTH_TOKEN_KEY = 'auth_token';

const normalizeReturnTo = (value) => {
  if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
    return value;
  }

  return zitadelConfig.postLoginPath;
};

const getProjectRoles = (profile) => {
  const projectClaim = zitadelConfig.projectId
    ? profile[`urn:zitadel:iam:org:project:${zitadelConfig.projectId}:roles`]
    : undefined;
  const roles =
    projectClaim ||
    profile['urn:zitadel:iam:org:project:roles'] ||
    profile['urn:zitadel:iam:org:projects:roles'] ||
    {};

  return Object.keys(roles);
};

const getSessionUser = (oidcUser) => {
  if (!oidcUser) return null;

  const { profile } = oidcUser;
  const organization =
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
    '';

  return {
    id: profile.sub,
    name: profile.name || profile.preferred_username || profile.email || 'FFAX User',
    email: profile.email,
    avatar: profile.picture,
    username: profile.preferred_username,
    organization,
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
      signup: async () => undefined,
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
      sessionStorage.setItem(AUTH_TOKEN_KEY, oidc.user.access_token);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return;
    }

    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }, [oidc.user?.access_token]);

  const signin = useCallback(
    (returnTo) =>
      oidc.signinRedirect({
        state: { returnTo: normalizeReturnTo(returnTo) },
      }),
    [oidc],
  );

  const signup = useCallback(
    (returnTo) =>
      oidc.signinRedirect({
        state: { returnTo: normalizeReturnTo(returnTo) },
        extraQueryParams: { prompt: 'create' },
      }),
    [oidc],
  );

  const signout = useCallback(async () => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    await oidc.signoutRedirect({
      post_logout_redirect_uri: zitadelConfig.postLogoutRedirectUri,
    });
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
      signup,
      signout,
    }),
    [
      getAccessToken,
      oidc.error,
      oidc.isAuthenticated,
      oidc.isLoading,
      oidc.user,
      signin,
      signup,
      signout,
    ],
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
