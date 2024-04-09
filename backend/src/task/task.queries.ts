/** Types generated for queries found in "src/task/task.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'SelectTaskByIdForUser' parameters type */
export interface ISelectTaskByIdForUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'SelectTaskByIdForUser' return type */
export interface ISelectTaskByIdForUserResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
}

/** 'SelectTaskByIdForUser' query type */
export interface ISelectTaskByIdForUserQuery {
  params: ISelectTaskByIdForUserParams;
  result: ISelectTaskByIdForUserResult;
}

const selectTaskByIdForUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":159,"b":162}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":188,"b":195}]}],"statement":"SELECT task.*\nFROM task\nINNER JOIN board_column ON board_column.id = task.board_column_id\nINNER JOIN board ON board.id = board_column.board_id\nWHERE task.id = :id!\nAND board.app_user_id = :userId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT task.*
 * FROM task
 * INNER JOIN board_column ON board_column.id = task.board_column_id
 * INNER JOIN board ON board.id = board_column.board_id
 * WHERE task.id = :id!
 * AND board.app_user_id = :userId!
 * ```
 */
export const selectTaskByIdForUser = new PreparedQuery<ISelectTaskByIdForUserParams,ISelectTaskByIdForUserResult>(selectTaskByIdForUserIR);


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

const selectSubtasksConnectionsByTaskIdsIR: any = {"usedParamSet":{"taskIds":true},"params":[{"name":"taskIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":251,"b":259}]}],"statement":"SELECT\n    task.id AS task_id,\n    count(subtask.id)::integer AS \"total_count!\",\n    (count(subtask.id) FILTER (WHERE subtask.completed IS true))::integer AS \"completed_count!\"\nFROM task\nLEFT JOIN subtask ON subtask.task_id = task.id\nWHERE task.id IN :taskIds!\nGROUP BY task.id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     task.id AS task_id,
 *     count(subtask.id)::integer AS "total_count!",
 *     (count(subtask.id) FILTER (WHERE subtask.completed IS true))::integer AS "completed_count!"
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

const selectSubtasksByTaskIdsIR: any = {"usedParamSet":{"taskIds":true},"params":[{"name":"taskIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":39,"b":47}]}],"statement":"SELECT *\nFROM subtask\nWHERE task_id IN :taskIds!\nORDER BY task_id, created_at, id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM subtask
 * WHERE task_id IN :taskIds!
 * ORDER BY task_id, created_at, id
 * ```
 */
export const selectSubtasksByTaskIds = new PreparedQuery<ISelectSubtasksByTaskIdsParams,ISelectSubtasksByTaskIdsResult>(selectSubtasksByTaskIdsIR);


/** 'UpdateSubtaskCompletedByIdForUser' parameters type */
export interface IUpdateSubtaskCompletedByIdForUserParams {
  completed: boolean;
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'UpdateSubtaskCompletedByIdForUser' return type */
export interface IUpdateSubtaskCompletedByIdForUserResult {
  completed: boolean;
  createdAt: Date;
  id: string;
  taskId: string;
  title: string;
  updatedAt: Date;
}

/** 'UpdateSubtaskCompletedByIdForUser' query type */
export interface IUpdateSubtaskCompletedByIdForUserQuery {
  params: IUpdateSubtaskCompletedByIdForUserParams;
  result: IUpdateSubtaskCompletedByIdForUserResult;
}

const updateSubtaskCompletedByIdForUserIR: any = {"usedParamSet":{"completed":true,"id":true,"userId":true},"params":[{"name":"completed","required":true,"transform":{"type":"scalar"},"locs":[{"a":31,"b":41}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":294,"b":297}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":327,"b":334}]}],"statement":"UPDATE subtask\nSET completed = :completed!\nWHERE id = (\n    SELECT subtask.id\n    FROM subtask\n    INNER JOIN task ON task.id = subtask.task_id\n    INNER JOIN board_column ON board_column.id = task.board_column_id\n    INNER JOIN board ON board.id = board_column.board_id\n    WHERE subtask.id = :id!\n    AND board.app_user_id = :userId!\n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE subtask
 * SET completed = :completed!
 * WHERE id = (
 *     SELECT subtask.id
 *     FROM subtask
 *     INNER JOIN task ON task.id = subtask.task_id
 *     INNER JOIN board_column ON board_column.id = task.board_column_id
 *     INNER JOIN board ON board.id = board_column.board_id
 *     WHERE subtask.id = :id!
 *     AND board.app_user_id = :userId!
 * )
 * RETURNING *
 * ```
 */
export const updateSubtaskCompletedByIdForUser = new PreparedQuery<IUpdateSubtaskCompletedByIdForUserParams,IUpdateSubtaskCompletedByIdForUserResult>(updateSubtaskCompletedByIdForUserIR);


/** 'InsertTask' parameters type */
export interface IInsertTaskParams {
  task: {
    title: string,
    description: string,
    boardColumnId: NumberOrString
  };
}

/** 'InsertTask' return type */
export interface IInsertTaskResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
}

/** 'InsertTask' query type */
export interface IInsertTaskQuery {
  params: IInsertTaskParams;
  result: IInsertTaskResult;
}

const insertTaskIR: any = {"usedParamSet":{"task":true},"params":[{"name":"task","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"title","required":true},{"name":"description","required":true},{"name":"boardColumnId","required":true}]},"locs":[{"a":61,"b":65}]}],"statement":"INSERT INTO task(title, description, board_column_id)\nVALUES :task\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO task(title, description, board_column_id)
 * VALUES :task
 * RETURNING *
 * ```
 */
export const insertTask = new PreparedQuery<IInsertTaskParams,IInsertTaskResult>(insertTaskIR);


/** 'UpdateTask' parameters type */
export interface IUpdateTaskParams {
  boardColumnId?: NumberOrString | null | void;
  description?: string | null | void;
  id: NumberOrString;
  title?: string | null | void;
}

/** 'UpdateTask' return type */
export interface IUpdateTaskResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
}

/** 'UpdateTask' query type */
export interface IUpdateTaskQuery {
  params: IUpdateTaskParams;
  result: IUpdateTaskResult;
}

const updateTaskIR: any = {"usedParamSet":{"title":true,"description":true,"boardColumnId":true,"id":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":42}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":80,"b":91}]},{"name":"boardColumnId","required":false,"transform":{"type":"scalar"},"locs":[{"a":139,"b":152}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":183,"b":186}]}],"statement":"UPDATE task SET\n    title = COALESCE(:title, title),\n    description = COALESCE(:description, description),\n    board_column_id = COALESCE(:boardColumnId, board_column_id)\nWHERE id = :id!\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE task SET
 *     title = COALESCE(:title, title),
 *     description = COALESCE(:description, description),
 *     board_column_id = COALESCE(:boardColumnId, board_column_id)
 * WHERE id = :id!
 * RETURNING *
 * ```
 */
export const updateTask = new PreparedQuery<IUpdateTaskParams,IUpdateTaskResult>(updateTaskIR);

