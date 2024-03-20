import { Injectable } from '@nestjs/common';
import { DatabaseClient } from './database/index.js';
import { selectCurrentMigrationVersion } from './app.queries.js';

@Injectable()
export class AppRepository {
  constructor(private readonly db: DatabaseClient) {}

  async currentMigrationVersion(): Promise<string> {
    return (await this.db.queryOne(selectCurrentMigrationVersion, undefined))
      .currentVersion;
  }
}
