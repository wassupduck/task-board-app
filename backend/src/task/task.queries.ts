/** Types generated for queries found in "src/task/task.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'SelectTaskByIdAsUser' parameters type */
export interface ISelectTaskByIdAsUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'SelectTaskByIdAsUser' return type */
export interface ISelectTaskByIdAsUserResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
}

/** 'SelectTaskByIdAsUser' query type */
export interface ISelectTaskByIdAsUserQuery {
  params: ISelectTaskByIdAsUserParams;
  result: ISelectTaskByIdAsUserResult;
}

const selectTaskByIdAsUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":159,"b":162}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":188,"b":195}]}],"statement":"select task.*\nfrom task\ninner join board_column on board_column.id = task.board_column_id\ninner join board on board.id = board_column.board_id\nwhere task.id = :id!\nand board.app_user_id = :userId!"};

/**
 * Query generated from SQL:
 * ```
 * select task.*
 * from task
 * inner join board_column on board_column.id = task.board_column_id
 * inner join board on board.id = board_column.board_id
 * where task.id = :id!
 * and board.app_user_id = :userId!
 * ```
 */
export const selectTaskByIdAsUser = new PreparedQuery<ISelectTaskByIdAsUserParams,ISelectTaskByIdAsUserResult>(selectTaskByIdAsUserIR);


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

const selectTasksByBoardIdIR: any = {"usedParamSet":{"boardId":true},"params":[{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":120,"b":128}]}],"statement":"select task.*\nfrom task\ninner join board_column on board_column.id = task.board_column_id\nwhere board_column.board_id = :boardId!"};

/**
 * Query generated from SQL:
 * ```
 * select task.*
 * from task
 * inner join board_column on board_column.id = task.board_column_id
 * where board_column.board_id = :boardId!
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

const selectTasksByColumnIdsIR: any = {"usedParamSet":{"columnIds":true},"params":[{"name":"columnIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":49,"b":59}]}],"statement":"select *\nfrom task\nwhere task.board_column_id in :columnIds!"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from task
 * where task.board_column_id in :columnIds!
 * ```
 */
export const selectTasksByColumnIds = new PreparedQuery<ISelectTasksByColumnIdsParams,ISelectTasksByColumnIdsResult>(selectTasksByColumnIdsIR);


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

const insertTaskIR: any = {"usedParamSet":{"task":true},"params":[{"name":"task","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"title","required":true},{"name":"description","required":true},{"name":"boardColumnId","required":true}]},"locs":[{"a":61,"b":65}]}],"statement":"insert into task(title, description, board_column_id)\nvalues :task\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * insert into task(title, description, board_column_id)
 * values :task
 * returning *
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

const updateTaskIR: any = {"usedParamSet":{"title":true,"description":true,"boardColumnId":true,"id":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":42}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":80,"b":91}]},{"name":"boardColumnId","required":false,"transform":{"type":"scalar"},"locs":[{"a":139,"b":152}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":183,"b":186}]}],"statement":"update task set\n    title = coalesce(:title, title),\n    description = coalesce(:description, description),\n    board_column_id = coalesce(:boardColumnId, board_column_id)\nwhere id = :id!\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * update task set
 *     title = coalesce(:title, title),
 *     description = coalesce(:description, description),
 *     board_column_id = coalesce(:boardColumnId, board_column_id)
 * where id = :id!
 * returning *
 * ```
 */
export const updateTask = new PreparedQuery<IUpdateTaskParams,IUpdateTaskResult>(updateTaskIR);


/** 'DeleteTaskAsUser' parameters type */
export interface IDeleteTaskAsUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'DeleteTaskAsUser' return type */
export interface IDeleteTaskAsUserResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
}

/** 'DeleteTaskAsUser' query type */
export interface IDeleteTaskAsUserQuery {
  params: IDeleteTaskAsUserParams;
  result: IDeleteTaskAsUserResult;
}

const deleteTaskAsUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":210,"b":213}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":243,"b":250}]}],"statement":"delete from task\nwhere id = (\n    select task.id\n    from task\n    inner join board_column on board_column.id = task.board_column_id\n    inner join board on board.id = board_column.board_id\n    where task.id = :id!\n    and board.app_user_id = :userId!\n)\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * delete from task
 * where id = (
 *     select task.id
 *     from task
 *     inner join board_column on board_column.id = task.board_column_id
 *     inner join board on board.id = board_column.board_id
 *     where task.id = :id!
 *     and board.app_user_id = :userId!
 * )
 * returning *
 * ```
 */
export const deleteTaskAsUser = new PreparedQuery<IDeleteTaskAsUserParams,IDeleteTaskAsUserResult>(deleteTaskAsUserIR);


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

const selectSubtasksConnectionsByTaskIdsIR: any = {"usedParamSet":{"taskIds":true},"params":[{"name":"taskIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":251,"b":259}]}],"statement":"select\n    task.id as task_id,\n    count(subtask.id)::integer as \"total_count!\",\n    (count(subtask.id) filter (where subtask.completed is true))::integer as \"completed_count!\"\nfrom task\nleft join subtask on subtask.task_id = task.id\nwhere task.id in :taskIds!\ngroup by task.id"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     task.id as task_id,
 *     count(subtask.id)::integer as "total_count!",
 *     (count(subtask.id) filter (where subtask.completed is true))::integer as "completed_count!"
 * from task
 * left join subtask on subtask.task_id = task.id
 * where task.id in :taskIds!
 * group by task.id
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

const selectSubtasksByTaskIdsIR: any = {"usedParamSet":{"taskIds":true},"params":[{"name":"taskIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":39,"b":47}]}],"statement":"select *\nfrom subtask\nwhere task_id in :taskIds!\norder by task_id, created_at, id"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from subtask
 * where task_id in :taskIds!
 * order by task_id, created_at, id
 * ```
 */
export const selectSubtasksByTaskIds = new PreparedQuery<ISelectSubtasksByTaskIdsParams,ISelectSubtasksByTaskIdsResult>(selectSubtasksByTaskIdsIR);


/** 'InsertSubtasks' parameters type */
export interface IInsertSubtasksParams {
  subtasks: readonly ({
    title: string,
    taskId: NumberOrString
  })[];
}

/** 'InsertSubtasks' return type */
export interface IInsertSubtasksResult {
  completed: boolean;
  createdAt: Date;
  id: string;
  taskId: string;
  title: string;
  updatedAt: Date;
}

/** 'InsertSubtasks' query type */
export interface IInsertSubtasksQuery {
  params: IInsertSubtasksParams;
  result: IInsertSubtasksResult;
}

const insertSubtasksIR: any = {"usedParamSet":{"subtasks":true},"params":[{"name":"subtasks","required":true,"transform":{"type":"pick_array_spread","keys":[{"name":"title","required":true},{"name":"taskId","required":true}]},"locs":[{"a":43,"b":52}]}],"statement":"insert into subtask(title, task_id)\nvalues :subtasks!\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * insert into subtask(title, task_id)
 * values :subtasks!
 * returning *
 * ```
 */
export const insertSubtasks = new PreparedQuery<IInsertSubtasksParams,IInsertSubtasksResult>(insertSubtasksIR);


/** 'UpdateSubtaskCompletedByIdAsUser' parameters type */
export interface IUpdateSubtaskCompletedByIdAsUserParams {
  completed: boolean;
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'UpdateSubtaskCompletedByIdAsUser' return type */
export interface IUpdateSubtaskCompletedByIdAsUserResult {
  completed: boolean;
  createdAt: Date;
  id: string;
  taskId: string;
  title: string;
  updatedAt: Date;
}

/** 'UpdateSubtaskCompletedByIdAsUser' query type */
export interface IUpdateSubtaskCompletedByIdAsUserQuery {
  params: IUpdateSubtaskCompletedByIdAsUserParams;
  result: IUpdateSubtaskCompletedByIdAsUserResult;
}

const updateSubtaskCompletedByIdAsUserIR: any = {"usedParamSet":{"completed":true,"id":true,"userId":true},"params":[{"name":"completed","required":true,"transform":{"type":"scalar"},"locs":[{"a":31,"b":41}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":294,"b":297}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":327,"b":334}]}],"statement":"update subtask\nset completed = :completed!\nwhere id = (\n    select subtask.id\n    from subtask\n    inner join task on task.id = subtask.task_id\n    inner join board_column on board_column.id = task.board_column_id\n    inner join board on board.id = board_column.board_id\n    where subtask.id = :id!\n    and board.app_user_id = :userId!\n)\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * update subtask
 * set completed = :completed!
 * where id = (
 *     select subtask.id
 *     from subtask
 *     inner join task on task.id = subtask.task_id
 *     inner join board_column on board_column.id = task.board_column_id
 *     inner join board on board.id = board_column.board_id
 *     where subtask.id = :id!
 *     and board.app_user_id = :userId!
 * )
 * returning *
 * ```
 */
export const updateSubtaskCompletedByIdAsUser = new PreparedQuery<IUpdateSubtaskCompletedByIdAsUserParams,IUpdateSubtaskCompletedByIdAsUserResult>(updateSubtaskCompletedByIdAsUserIR);


