/** Types generated for queries found in "src/task/task.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'SelectTasksByBoardId' parameters type */
export interface ISelectTasksByBoardIdParams {
  boardId: NumberOrString;
}

/** 'SelectTasksByBoardId' return type */
export interface ISelectTasksByBoardIdResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
}

/** 'SelectTasksByBoardId' query type */
export interface ISelectTasksByBoardIdQuery {
  params: ISelectTasksByBoardIdParams;
  result: ISelectTasksByBoardIdResult;
}

const selectTasksByBoardIdIR: any = {"usedParamSet":{"boardId":true},"params":[{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":120,"b":128}]}],"statement":"SELECT task.*\nFROM task\nINNER JOIN board_column ON board_column.id = task.board_column_id\nWHERE board_column.board_id = :boardId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT task.*
 * FROM task
 * INNER JOIN board_column ON board_column.id = task.board_column_id
 * WHERE board_column.board_id = :boardId!
 * ```
 */
export const selectTasksByBoardId = new PreparedQuery<ISelectTasksByBoardIdParams,ISelectTasksByBoardIdResult>(selectTasksByBoardIdIR);


/** 'SelectTasksByColumnIds' parameters type */
export interface ISelectTasksByColumnIdsParams {
  columnIds: readonly (NumberOrString)[];
}

/** 'SelectTasksByColumnIds' return type */
export interface ISelectTasksByColumnIdsResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
}

/** 'SelectTasksByColumnIds' query type */
export interface ISelectTasksByColumnIdsQuery {
  params: ISelectTasksByColumnIdsParams;
  result: ISelectTasksByColumnIdsResult;
}

const selectTasksByColumnIdsIR: any = {"usedParamSet":{"columnIds":true},"params":[{"name":"columnIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":49,"b":59}]}],"statement":"SELECT *\nFROM task\nWHERE task.board_column_id IN :columnIds!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM task
 * WHERE task.board_column_id IN :columnIds!
 * ```
 */
export const selectTasksByColumnIds = new PreparedQuery<ISelectTasksByColumnIdsParams,ISelectTasksByColumnIdsResult>(selectTasksByColumnIdsIR);


