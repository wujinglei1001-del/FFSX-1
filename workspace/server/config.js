import dotenv from 'dotenv';
import { resolve } from 'node:path';

dotenv.config({ path: resolve(process.cwd(), 'server/.env'), quiet: true });

const normalizeUrl = (value = '') => value.trim().replace(/\/+$/, '');

const splitList = (value = '') =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export const serverConfig = {
  port: Number(process.env.PORT || 8000),
  allowedOrigins: splitList(process.env.FFAX_ALLOWED_ORIGINS || 'http://localhost:5002'),
  databaseUrl: process.env.FFAX_DATABASE_URL?.trim() || '',
  redisUrl: process.env.FFAX_REDIS_URL?.trim() || '',
  mercurBaseUrl: normalizeUrl(process.env.MERCUR_BASE_URL || 'http://localhost:9000'),
  paymentsEnabled: process.env.FFAX_ENABLE_REAL_PAYMENTS === 'true',
  zitadel: {
    issuer: normalizeUrl(process.env.ZITADEL_ISSUER),
    internalUrl: normalizeUrl(process.env.ZITADEL_INTERNAL_URL || 'http://zitadel-api:8080'),
    projectId: process.env.ZITADEL_PROJECT_ID?.trim() || '',
    apiClientId: process.env.ZITADEL_API_CLIENT_ID?.trim() || '',
    apiClientSecret: process.env.ZITADEL_API_CLIENT_SECRET?.trim() || '',
    instanceHost: process.env.ZITADEL_INSTANCE_HOST?.trim() || '',
    publicScheme: process.env.ZITADEL_PUBLIC_SCHEME?.trim() || 'https',
    loginClientPatFile:
      process.env.ZITADEL_LOGIN_CLIENT_PAT_FILE?.trim() ||
      '/zitadel/bootstrap/login-client.pat',
    introspectionUrl:
      process.env.ZITADEL_INTROSPECTION_URL?.trim() ||
      `${normalizeUrl(process.env.ZITADEL_ISSUER)}/oauth/v2/introspect`,
  },
};

export const getMissingAuthConfig = () => {
  const required = {
    ZITADEL_ISSUER: serverConfig.zitadel.issuer,
    ZITADEL_PROJECT_ID: serverConfig.zitadel.projectId,
    ZITADEL_API_CLIENT_ID: serverConfig.zitadel.apiClientId,
    ZITADEL_API_CLIENT_SECRET: serverConfig.zitadel.apiClientSecret,
  };

  return Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);
};
