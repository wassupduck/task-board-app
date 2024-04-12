import { Inject, Injectable } from '@nestjs/common';
import { PreparedQuery } from '@pgtyped/runtime';
import pg from 'pg';
import { PG_POOL } from './database.constants.js';
import { TransactionManager } from './transaction-manager.js';
import { DatabaseError, wrapError } from './database.errors.js';

@Injectable()
export class DatabaseClient {
  constructor(
    @Inject(PG_POOL) private readonly pool: pg.Pool,
    private readonly trxManager: TransactionManager,
  ) {}

  private async runQuery<Params, Result>(
    query: PreparedQuery<Params, Result>,
    params: Params,
  ): Promise<Result[]> {
    const client = this.trxManager.getActiveTransaction() ?? this.pool;

    let results;
    try {
      results = await query.run(params, client);
    } catch (error) {
      throw wrapError('Query error', error);
    }

    // Convert keys to camelCase to match pgtyped query result type.
    return (results as { [k: string]: unknown }[]).map((result) =>
      Object.fromEntries(
        Object.entries(result).map(([key, value]) => [
          key.replace(/_[a-z]/g, ([, char]) => char.toUpperCase()),
          value,
        ]),
      ),
    ) as Result[];
  }

  async queryAll<Params, Result>(
    query: PreparedQuery<Params, Result>,
    params: Params,
  ): Promise<Result[]> {
    return this.runQuery(query, params);
  }

  async queryOne<Params, Result>(
    query: PreparedQuery<Params, Result>,
    params: Params,
  ): Promise<Result> {
    const results = await this.queryAll(query, params);
    if (results.length !== 1) {
      throw new DatabaseError(`Expected 1 row, found: ${results.length}`);
    }
    return results[0];
  }

  async queryOneOrNone<Params, Result>(
    query: PreparedQuery<Params, Result>,
    params: Params,
  ): Promise<Result | null> {
    const results = await this.queryAll(query, params);
    if (results.length > 1) {
      throw new DatabaseError(`Expected 0 or 1 row, found: ${results.length}`);
    }
    return results.length ? results[0] : null;
  }

  async inTransaction<T>(
    transactionScope: () => Promise<T>,
  ): Promise<Awaited<T>> {
    return await this.trxManager.inTransaction(transactionScope);
  }
}
