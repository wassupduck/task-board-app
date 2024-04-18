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

const selectCurrentMigrationVersionIR: any = {"usedParamSet":{},"params":[],"statement":"select split_part(name, '_', 1) as \"current_version!\"\nfrom knex_migrations\norder by migration_time desc\nlimit 1"};

/**
 * Query generated from SQL:
 * ```
 * select split_part(name, '_', 1) as "current_version!"
 * from knex_migrations
 * order by migration_time desc
 * limit 1
 * ```
 */
export const selectCurrentMigrationVersion = new PreparedQuery<ISelectCurrentMigrationVersionParams,ISelectCurrentMigrationVersionResult>(selectCurrentMigrationVersionIR);


