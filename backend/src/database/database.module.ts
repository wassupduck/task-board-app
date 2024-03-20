import { Global, Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import { DatabaseClient } from './database-client.js';
import { pgPoolProvider } from './database.providers.js';
import type { Pool } from 'pg';
import { PG_POOL } from './database.constants.js';

@Global()
@Module({
  providers: [DatabaseClient, pgPoolProvider],
  exports: [DatabaseClient],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(@Inject(PG_POOL) private readonly pgPool: Pool) {}

  async onApplicationShutdown() {
    await this.pgPool.end();
  }
}
