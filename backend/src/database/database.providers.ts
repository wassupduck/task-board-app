import { FactoryProvider } from '@nestjs/common';
import pg from 'pg';
import { Signer } from '@aws-sdk/rds-signer';
import { PG_POOL } from './database.constants.js';
import config from '../config.js';

export const pgPoolProvider: FactoryProvider<pg.Pool> = {
  provide: PG_POOL,
  useFactory: async () => {
    let poolConfig: pg.PoolConfig;

    if (process.env.NODE_ENV !== 'production') {
      poolConfig = config.db;
    } else {
      const rdsSigner = new Signer({
        hostname: config.db.host,
        port: config.db.port,
        username: config.db.user,
      });
      poolConfig = {
        ...config.db,
        password: () => rdsSigner.getAuthToken(),
      };
    }

    const pool = new pg.Pool(poolConfig);

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
