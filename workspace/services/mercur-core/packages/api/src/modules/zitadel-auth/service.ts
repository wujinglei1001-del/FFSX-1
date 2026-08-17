import type {
  AuthIdentityProviderService,
  AuthenticationInput,
  AuthenticationResponse,
  Logger,
} from '@medusajs/framework/types';
import { AbstractAuthModuleProvider, MedusaError } from '@medusajs/framework/utils';

type InjectedDependencies = { logger: Logger };
type Options = {
  issuer: string;
  projectId: string;
  clientId: string;
  clientSecret: string;
  introspectionUrl?: string;
  instanceHost?: string;
};

type ZitadelClaims = Record<string, unknown> & {
  active?: boolean;
  sub?: string;
  aud?: string | string[];
  iss?: string;
  email?: string;
  username?: string;
  preferred_username?: string;
};

const normalizeUrl = (value: string) => value.replace(/\/+$/, '');

export default class ZitadelAuthProviderService extends AbstractAuthModuleProvider {
  static identifier = 'zitadel';
  static DISPLAY_NAME = 'FFAX ZITADEL';

  protected logger_: Logger;
  protected options_: Options;

  constructor({ logger }: InjectedDependencies, options: Options) {
    // @ts-ignore Medusa injects the provider container and options at runtime.
    super(...arguments);
    this.logger_ = logger;
    this.options_ = options;
  }

  static validateOptions(options: Options) {
    const missing = ['issuer', 'projectId', 'clientId', 'clientSecret'].filter(
      (key) => !options[key as keyof Options],
    );
    if (missing.length) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Missing ZITADEL provider options: ${missing.join(', ')}`,
      );
    }
  }

  private accessToken(data: AuthenticationInput) {
    const bodyToken = data.body?.access_token;
    const authorization = data.headers?.authorization || data.headers?.Authorization;
    const headerToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
    return bodyToken || headerToken;
  }

  private async introspect(token: string): Promise<ZitadelClaims> {
    const issuer = normalizeUrl(this.options_.issuer);
    const response = await fetch(
      this.options_.introspectionUrl || `${issuer}/oauth/v2/introspect`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${this.options_.clientId}:${this.options_.clientSecret}`,
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(this.options_.instanceHost
            ? {
                'X-Zitadel-Instance-Host': this.options_.instanceHost,
                'X-Zitadel-Public-Host': this.options_.instanceHost,
              }
            : {}),
        },
        body: new URLSearchParams({ token, token_type_hint: 'access_token' }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) throw new Error('ZITADEL token introspection failed');
    return response.json() as Promise<ZitadelClaims>;
  }

  private projectRoles(claims: ZitadelClaims) {
    const roleClaim =
      claims[`urn:zitadel:iam:org:project:${this.options_.projectId}:roles`] ||
      claims['urn:zitadel:iam:org:project:roles'] ||
      claims['urn:zitadel:iam:org:projects:roles'] ||
      {};
    return Object.keys(roleClaim as Record<string, unknown>);
  }

  async authenticate(
    data: AuthenticationInput,
    identities: AuthIdentityProviderService,
  ): Promise<AuthenticationResponse> {
    const token = this.accessToken(data);
    if (!token) return { success: false, error: 'Missing ZITADEL access token' };

    try {
      const claims = await this.introspect(token);
      const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
      if (!claims.active || !claims.sub) return { success: false, error: 'Inactive token' };
      if (claims.iss && normalizeUrl(claims.iss) !== normalizeUrl(this.options_.issuer)) {
        return { success: false, error: 'Invalid token issuer' };
      }
      if (!audiences.includes(this.options_.projectId)) {
        return { success: false, error: 'Invalid token audience' };
      }

      const organization = claims['urn:zitadel:iam:user:resourceowner'];
      const userMetadata = {
        email: claims.email,
        username: claims.username || claims.preferred_username,
        organization,
        roles: this.projectRoles(claims),
      };

      let authIdentity;
      try {
        authIdentity = await identities.retrieve({ entity_id: claims.sub });
        authIdentity = await identities.update(claims.sub, { user_metadata: userMetadata });
      } catch {
        authIdentity = await identities.create({
          entity_id: claims.sub,
          provider_metadata: { issuer: normalizeUrl(this.options_.issuer) },
          user_metadata: userMetadata,
        });
      }
      return { success: true, authIdentity };
    } catch (error) {
      this.logger_.warn(`ZITADEL authentication rejected: ${(error as Error).message}`);
      return { success: false, error: 'ZITADEL authentication failed' };
    }
  }

  async register(data: AuthenticationInput, identities: AuthIdentityProviderService) {
    return this.authenticate(data, identities);
  }
}
