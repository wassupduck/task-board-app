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


/** 'SelectSubtasksConnectionsByTaskIds' parameters type */
export interface ISelectSubtasksConnectionsByTaskIdsParams {
  taskIds: readonly (NumberOrString)[];
}

/** 'SelectSubtasksConnectionsByTaskIds' return type */
export interface ISelectSubtasksConnectionsByTaskIdsResult {
  completedCount: number;
  taskId: string;
  totalCount: number;
}

/** 'SelectSubtasksConnectionsByTaskIds' query type */
export interface ISelectSubtasksConnectionsByTaskIdsQuery {
  params: ISelectSubtasksConnectionsByTaskIdsParams;
  result: ISelectSubtasksConnectionsByTaskIdsResult;
}

const selectSubtasksConnectionsByTaskIdsIR: any = {"usedParamSet":{"taskIds":true},"params":[{"name":"taskIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":261,"b":269}]}],"statement":"SELECT\n    task.id AS task_id,\n    count(subtask.task_id)::integer AS \"total_count!\",\n    (count(subtask.task_id) FILTER (WHERE subtask.completed IS true))::integer AS \"completed_count!\"\nFROM task\nLEFT JOIN subtask ON subtask.task_id = task.id\nWHERE task.id IN :taskIds!\nGROUP BY task.id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     task.id AS task_id,
 *     count(subtask.task_id)::integer AS "total_count!",
 *     (count(subtask.task_id) FILTER (WHERE subtask.completed IS true))::integer AS "completed_count!"
 * FROM task
 * LEFT JOIN subtask ON subtask.task_id = task.id
 * WHERE task.id IN :taskIds!
 * GROUP BY task.id
 * ```
 */
export const selectSubtasksConnectionsByTaskIds = new PreparedQuery<ISelectSubtasksConnectionsByTaskIdsParams,ISelectSubtasksConnectionsByTaskIdsResult>(selectSubtasksConnectionsByTaskIdsIR);


/** 'SelectSubtasksByTaskIds' parameters type */
export interface ISelectSubtasksByTaskIdsParams {
  taskIds: readonly (NumberOrString)[];
}

/** 'SelectSubtasksByTaskIds' return type */
export interface ISelectSubtasksByTaskIdsResult {
  completed: boolean;
  createdAt: Date;
  id: string;
  taskId: string;
  title: string;
  updatedAt: Date;
}

/** 'SelectSubtasksByTaskIds' query type */
export interface ISelectSubtasksByTaskIdsQuery {
  params: ISelectSubtasksByTaskIdsParams;
  result: ISelectSubtasksByTaskIdsResult;
}

const selectSubtasksByTaskIdsIR: any = {"usedParamSet":{"taskIds":true},"params":[{"name":"taskIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":39,"b":47}]}],"statement":"SELECT *\nFROM subtask\nWHERE task_id IN :taskIds!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM subtask
 * WHERE task_id IN :taskIds!
 * ```
 */
export const selectSubtasksByTaskIds = new PreparedQuery<ISelectSubtasksByTaskIdsParams,ISelectSubtasksByTaskIdsResult>(selectSubtasksByTaskIdsIR);


