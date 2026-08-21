import { createClient } from 'redis';
import { serverConfig } from './config.js';

let publisher;

export const realtimeHealth = () => ({
  configured: Boolean(serverConfig.redisUrl),
  healthy: Boolean(publisher?.isReady),
});

export const initializeRealtime = async () => {
  if (!serverConfig.redisUrl) return false;
  publisher = createClient({ url: serverConfig.redisUrl });
  publisher.on('error', (error) => console.error('FFAX Redis publisher error', error.message));
  await publisher.connect();
  return true;
};

export const publishTenantEvent = async (tenantId, event) => {
  if (!publisher?.isReady) return;
  await publisher.publish(`ffax:tenant:${tenantId}`, JSON.stringify(event));
};

export const createTenantSubscription = async (tenantId, onMessage) => {
  if (!serverConfig.redisUrl) return async () => undefined;
  const subscriber = createClient({ url: serverConfig.redisUrl });
  subscriber.on('error', (error) => console.error('FFAX Redis subscriber error', error.message));
  await subscriber.connect();
  await subscriber.subscribe(`ffax:tenant:${tenantId}`, onMessage);
  return async () => {
    if (subscriber.isOpen) {
      await subscriber.unsubscribe();
      await subscriber.quit();
    }
  };
};
