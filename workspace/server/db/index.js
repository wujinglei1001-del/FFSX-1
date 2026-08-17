import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { serverConfig } from '../config.js';

const { Pool } = pg;

export const pool = serverConfig.databaseUrl
  ? new Pool({ connectionString: serverConfig.databaseUrl, max: 12, idleTimeoutMillis: 30000 })
  : null;

export const query = async (text, values = []) => {
  if (!pool) {
    const error = new Error('platform_database_not_configured');
    error.status = 503;
    throw error;
  }
  return pool.query(text, values);
};

export const withTransaction = async (work) => {
  if (!pool) {
    const error = new Error('platform_database_not_configured');
    error.status = 503;
    throw error;
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await work(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const initializeDatabase = async () => {
  if (!pool) return false;
  const schemaPath = fileURLToPath(new URL('./schema.sql', import.meta.url));
  const schema = await fs.readFile(schemaPath, 'utf8');
  await pool.query(schema);
  return true;
};

export const databaseHealth = async () => {
  if (!pool) return { configured: false, healthy: false };
  try {
    await pool.query('SELECT 1');
    return { configured: true, healthy: true };
  } catch {
    return { configured: true, healthy: false };
  }
};
