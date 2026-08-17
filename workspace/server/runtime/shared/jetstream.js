import { StorageType, jetstream, jetstreamManager } from '@nats-io/jetstream';
import { connect } from '@nats-io/transport-node';

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const codec = {
  encode(value) {
    return encoder.encode(JSON.stringify(value));
  },
  decode(value) {
    return JSON.parse(decoder.decode(value));
  },
};

export const createJetStream = async ({
  channelId,
  servers,
  subjects = [`${channelId}.ingress.>`, `${channelId}.changes.>`],
}) => {
  if (!servers) throw new Error('NATS_URL is required');
  const connection = await connect({
    servers: servers.split(',').map((value) => value.trim()),
    name: `ffax-${channelId}-${process.env.INSTANCE_ID || process.pid}`,
    maxReconnectAttempts: -1,
  });
  const manager = await jetstreamManager(connection);
  const streamName = `FFAX_${channelId.toUpperCase()}`;
  try {
    await manager.streams.info(streamName);
  } catch {
    await manager.streams.add({
      name: streamName,
      subjects,
      storage: StorageType.File,
      num_replicas: Number(process.env.NATS_REPLICAS || 1),
      max_age: 1000 * 60 * 60 * 24 * 30 * 1_000_000,
    });
  }

  const client = jetstream(connection);
  return {
    connection,
    manager,
    jetstream: client,
    codec,
    streamName,
    publish(subject, payload, options = {}) {
      return client.publish(subject, codec.encode(payload), options);
    },
    close: () => connection.drain(),
  };
};
