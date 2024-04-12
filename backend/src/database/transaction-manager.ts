import { AsyncLocalStorage } from 'async_hooks';
import { Inject, Injectable } from '@nestjs/common';
import pg from 'pg';
import { PG_POOL } from './database.constants.js';
import { DatabaseTransactor } from './interfaces/database-transactor.interface.js';
import { DatabaseError, wrapError } from './database.errors.js';

@Injectable()
export class TransactionManager implements DatabaseTransactor {
  private readonly transactionStore: AsyncLocalStorage<DatabaseTransaction> =
    new AsyncLocalStorage();

  constructor(@Inject(PG_POOL) private readonly pool: pg.Pool) {}

  async inTransaction<T>(
    transactionScope: () => Promise<T>,
  ): Promise<Awaited<T>> {
    const activeTransaction = this.getActiveTransaction();
    if (activeTransaction) {
      // TODO: This is not production ready.
      // This ignores various problematic situations such as:
      // 1. If a nested transaction throws but the error is caught by the surrounding
      // block and not rethrown - in which case the transaction should be rolled back
      // but instead will commit.
      // 2. If a nested transaction doesn't completed before it's parent / the root transaction
      // completes i.e if the promise is erroneously unawaited - in this case the root transaction
      // should not be commited.
      return await transactionScope();
    }

    const conn = await this.pool.connect();

    let trx;
    try {
      trx = await DatabaseTransaction.begin(conn);
    } catch (error) {
      conn.release(error instanceof Error ? error : true);
      throw error;
    }

    let result;
    try {
      result = await this.transactionStore.run(trx, transactionScope);
    } catch (error) {
      await trx.rollback();
      throw error;
    }

    await trx.commit();
    return result;
  }

  getActiveTransaction(): DatabaseTransaction | null {
    return this.transactionStore.getStore() ?? null;
  }
}

class DatabaseTransaction {
  private completed = false;
  constructor(private readonly client: pg.PoolClient) {}

  static async begin(client: pg.PoolClient): Promise<DatabaseTransaction> {
    try {
      await client.query('BEGIN');
    } catch (error) {
      throw wrapError('Transaction error', error);
    }
    return new DatabaseTransaction(client);
  }

  async query(
    query: string,
    bindings: any[],
  ): Promise<{
    rows: any[];
  }> {
    // Prevent query on the transaction client after transaction completes
    // and the client has been released.
    if (this.completed) {
      throw new DatabaseError(
        'Trying to use transaction client after transaction completed',
      );
    }
    return this.client.query(query, bindings);
  }

  async commit(): Promise<void> {
    this.complete('COMMIT');
  }

  async rollback(): Promise<void> {
    this.complete('ROLLBACK');
  }

  async complete(action: 'COMMIT' | 'ROLLBACK'): Promise<void> {
    if (this.completed) {
      return;
    }
    let completedWithError: boolean | Error = false;
    this.completed = true;
    try {
      await this.client.query(action);
    } catch (error) {
      completedWithError = error instanceof Error ? error : true;
      throw wrapError('Transaction error', error);
    } finally {
      this.client.release(completedWithError);
    }
  }
}
