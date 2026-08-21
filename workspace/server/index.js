import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import {
  getZitadelLoginClientHealth,
  loginWithZitadel,
  logoutWithZitadel,
  registerWithZitadel,
  verifyEmailWithZitadel,
} from './auth/login.js';
import { requireZitadelAuth } from './auth/zitadel.js';
import { controlPlaneRouter } from './channels/router.js';
import { runtimeControlPlaneRouter } from './channels/runtime-router.js';
import { getMissingAuthConfig, serverConfig } from './config.js';
import { databaseHealth, initializeDatabase } from './db/index.js';
import { requireTenantContext } from './platform/context.js';
import { platformRouter } from './platform/router.js';
import { createContactRequest } from './public/contact.js';
import { initializeRealtime, realtimeHealth } from './realtime.js';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || serverConfig.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin is not allowed'));
    },
  }),
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', async (_req, res) => {
  const database = await databaseHealth();
  const missingAuthenticationConfig = getMissingAuthConfig();
  const loginClient = await getZitadelLoginClientHealth();
  const realtime = realtimeHealth();
  const authentication = {
    configured: missingAuthenticationConfig.length === 0 && loginClient.configured,
    missing: missingAuthenticationConfig,
    loginClient,
  };
  const ready =
    database.configured &&
    database.healthy &&
    authentication.configured &&
    realtime.configured &&
    realtime.healthy;

  res.status(ready ? 200 : 503).json({
    status: ready ? 'ok' : 'degraded',
    service: 'ffax-api',
    ready,
    database,
    authentication,
    realtime,
  });
});

app.post('/api/auth/login', loginWithZitadel);
app.post('/api/auth/register', registerWithZitadel);
app.post('/api/auth/verify-email', verifyEmailWithZitadel);
app.post('/api/auth/logout', logoutWithZitadel);
app.post('/api/public/contact-requests', createContactRequest);

app.get('/api/auth/profile', requireZitadelAuth, (req, res) => {
  res.json({
    data: {
      id: req.auth.userId,
      username: req.auth.username,
      email: req.auth.email,
      organization: req.auth.organization,
      roles: req.auth.roles,
    },
  });
});

app.use('/api/internal/control-plane', runtimeControlPlaneRouter);

app.use(
  '/api',
  requireZitadelAuth,
  requireTenantContext,
  controlPlaneRouter,
  platformRouter,
);

app.use('/api', requireZitadelAuth);

app.use((_req, res) => {
  res.status(404).json({ error: 'not_found' });
});

app.use((error, _req, res, _next) => {
  const status = Number(error.status) || 500;

  res.status(status).json({
    error: status === 500 ? 'internal_server_error' : error.message,
  });
});

const start = async () => {
  await initializeDatabase();
  await initializeRealtime();
  app.listen(serverConfig.port, () =>
    console.log(`FFAX API listening on port ${serverConfig.port}`),
  );
};

start().catch((error) => {
  console.error('FFAX API startup failed', error);
  process.exitCode = 1;
});
