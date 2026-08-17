import fs from 'node:fs/promises';
import pg from 'pg';

const { Pool } = pg;

export const createDatabase = ({ connectionString, schemaUrl, max = 12 }) => {
  if (!connectionString) throw new Error('DATABASE_URL is required');
  const pool = new Pool({ connectionString, max, idleTimeoutMillis: 30000 });

  return {
    pool,
    query: (text, values = []) => pool.query(text, values),
    async transaction(work) {
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
    },
    async initialize() {
      const schema = await fs.readFile(schemaUrl, 'utf8');
      await pool.query(schema);
    },
    async health() {
      try {
        await pool.query('SELECT 1');
        return true;
      } catch {
        return false;
      }
    },
    close: () => pool.end(),
  };
};
