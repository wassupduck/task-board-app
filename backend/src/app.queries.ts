/** Types generated for queries found in "src/app.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'SelectCurrentMigrationVersion' parameters type */
export type ISelectCurrentMigrationVersionParams = void;

/** 'SelectCurrentMigrationVersion' return type */
export interface ISelectCurrentMigrationVersionResult {
  currentVersion: string;
}

/** 'SelectCurrentMigrationVersion' query type */
export interface ISelectCurrentMigrationVersionQuery {
  params: ISelectCurrentMigrationVersionParams;
  result: ISelectCurrentMigrationVersionResult;
}

const selectCurrentMigrationVersionIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT SPLIT_PART(name, '_', 1) as \"current_version!\"\nFROM knex_migrations\nORDER BY migration_time DESC\nLIMIT 1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT SPLIT_PART(name, '_', 1) as "current_version!"
 * FROM knex_migrations
 * ORDER BY migration_time DESC
 * LIMIT 1
 * ```
 */
export const selectCurrentMigrationVersion = new PreparedQuery<ISelectCurrentMigrationVersionParams,ISelectCurrentMigrationVersionResult>(selectCurrentMigrationVersionIR);


