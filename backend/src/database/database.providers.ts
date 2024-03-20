import { FactoryProvider } from '@nestjs/common';
import pg from 'pg';
import { PG_POOL } from './database.constants.js';
import config from '../config.js';

export const pgPoolProvider: FactoryProvider<pg.Pool> = {
  provide: PG_POOL,
  useFactory: async () => {
    const pool = new pg.Pool({
      connectionString: config.dbConnectionString,
    });

    // Test connectivity
    let client;
    try {
      client = await pool.connect();
    } catch {
      throw new Error('Failed to connect to the database');
    }
    client.release();

    return pool;
  },
};
