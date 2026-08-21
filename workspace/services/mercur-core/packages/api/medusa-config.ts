import { ContainerRegistrationKeys, Modules, loadEnv } from '@medusajs/framework/utils';
import { withMercur } from '@mercurjs/core';
import fs from 'fs';
import path from 'path';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

const requiredSecret = (name: 'JWT_SECRET' | 'COOKIE_SECRET') => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} must be configured before Mercur starts.`);
  return value;
};

// Resolves where a dashboard app lives:
// - in the source tree (development): ../../apps/<name>
// - in the production build artifact: hosts that deploy only `.medusa/server` (for example
//   Medusa Cloud) get the panels bundled into ./dashboards/<name> by
//   scripts/bundle-dashboards.mjs during `build`. The compiled config runs from the
//   artifact root, so __dirname points there.
const dashboardAppDir = (name: string) => {
  const bundled = path.join(__dirname, 'dashboards', name);
  return fs.existsSync(bundled) ? bundled : path.join(__dirname, `../../apps/${name}`);
};

module.exports = withMercur({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      connection: { ssl: false },
    },
    redisUrl: process.env.REDIS_URL,
    workerMode: (process.env.MEDUSA_WORKER_MODE || 'shared') as 'shared' | 'worker' | 'server',
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      vendorCors: process.env.VENDOR_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: requiredSecret('JWT_SECRET'),
      cookieSecret: requiredSecret('COOKIE_SECRET'),
      authMethodsPerActor: {
        user: ['zitadel'],
        member: ['zitadel'],
        customer: ['zitadel'],
      },
    },
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'true',
  },
  featureFlags: {
    seller_registration: true,
  },
  modules: [
    {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: '@medusajs/medusa/workflow-engine-redis',
      options: {
        redis: {
          redisUrl: process.env.REDIS_URL,
        },
      },
    },
    {
      resolve: '@medusajs/medusa/locking',
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/locking-redis',
            id: 'locking-redis',
            is_default: true,
            options: {
              redisUrl: process.env.REDIS_URL,
            },
          },
        ],
      },
    },
    {
      resolve: '@medusajs/medusa/auth',
      dependencies: [Modules.CACHE, ContainerRegistrationKeys.LOGGER],
      options: {
        providers: [
          {
            resolve: './src/modules/zitadel-auth',
            id: 'zitadel',
            options: {
              issuer: process.env.ZITADEL_ISSUER,
              projectId: process.env.ZITADEL_PROJECT_ID,
              clientId: process.env.ZITADEL_API_CLIENT_ID,
              clientSecret: process.env.ZITADEL_API_CLIENT_SECRET,
              introspectionUrl: process.env.ZITADEL_INTROSPECTION_URL,
              instanceHost: process.env.ZITADEL_INSTANCE_HOST,
            },
          },
        ],
      },
    },
    {
      resolve: '@mercurjs/core/modules/admin-ui',
      options: {
        appDir: dashboardAppDir('admin'),
        path: '/dashboard',
        disable: process.env.DISABLE_MERCUR_DASHBOARDS === 'true',
      },
    },
    {
      resolve: '@mercurjs/core/modules/vendor-ui',
      options: {
        appDir: dashboardAppDir('vendor'),
        path: '/seller',
        disable: process.env.DISABLE_MERCUR_DASHBOARDS === 'true',
      },
    },
    {
      resolve: '@medusajs/medusa/file',
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/file-local',
            id: 'local',
            options: {
              // The local provider bakes this into every uploaded file URL.
              // It must be the publicly reachable origin in production, or
              // images resolve to localhost and render broken.
              backend_url: process.env.FILE_BACKEND_URL || 'http://localhost:9000/static',
            },
          },
        ],
      },
    },
  ],
});
