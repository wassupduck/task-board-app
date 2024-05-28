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
  position: string;
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
  position: string;
  title: string;
  updatedAt: Date;
}

/** 'SelectTasksByColumnIds' query type */
export interface ISelectTasksByColumnIdsQuery {
  params: ISelectTasksByColumnIdsParams;
  result: ISelectTasksByColumnIdsResult;
}

const selectTasksByColumnIdsIR: any = {"usedParamSet":{"columnIds":true},"params":[{"name":"columnIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":44,"b":54}]}],"statement":"select *\nfrom task\nwhere board_column_id in :columnIds!\norder by board_column_id, position asc"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from task
 * where board_column_id in :columnIds!
 * order by board_column_id, position asc
 * ```
 */
export const selectTasksByColumnIds = new PreparedQuery<ISelectTasksByColumnIdsParams,ISelectTasksByColumnIdsResult>(selectTasksByColumnIdsIR);


/** 'SelectTasksSurroundingBoardColumnPosition' parameters type */
export interface ISelectTasksSurroundingBoardColumnPositionParams {
  boardColumnId: NumberOrString;
  position: string;
}

/** 'SelectTasksSurroundingBoardColumnPosition' return type */
export interface ISelectTasksSurroundingBoardColumnPositionResult {
  boardColumnId: string | null;
  createdAt: Date | null;
  description: string | null;
  id: string | null;
  position: string | null;
  title: string | null;
  updatedAt: Date | null;
}

/** 'SelectTasksSurroundingBoardColumnPosition' query type */
export interface ISelectTasksSurroundingBoardColumnPositionQuery {
  params: ISelectTasksSurroundingBoardColumnPositionParams;
  result: ISelectTasksSurroundingBoardColumnPositionResult;
}

const selectTasksSurroundingBoardColumnPositionIR: any = {"usedParamSet":{"boardColumnId":true,"position":true},"params":[{"name":"boardColumnId","required":true,"transform":{"type":"scalar"},"locs":[{"a":72,"b":86},{"a":223,"b":237}]},{"name":"position","required":true,"transform":{"type":"scalar"},"locs":[{"a":108,"b":117},{"a":258,"b":267}]}],"statement":"select *\nfrom ((\n    select *\n    from task\n    where board_column_id = :boardColumnId!\n    and position <= :position!\n    order by position desc\n    limit 1\n) union (\n    select *\n    from task\n    where board_column_id = :boardColumnId!\n    and position > :position!\n    order by position asc\n    limit 1\n))\norder by position asc"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from ((
 *     select *
 *     from task
 *     where board_column_id = :boardColumnId!
 *     and position <= :position!
 *     order by position desc
 *     limit 1
 * ) union (
 *     select *
 *     from task
 *     where board_column_id = :boardColumnId!
 *     and position > :position!
 *     order by position asc
 *     limit 1
 * ))
 * order by position asc
 * ```
 */
export const selectTasksSurroundingBoardColumnPosition = new PreparedQuery<ISelectTasksSurroundingBoardColumnPositionParams,ISelectTasksSurroundingBoardColumnPositionResult>(selectTasksSurroundingBoardColumnPositionIR);


/** 'SelectLastTaskInBoardColumn' parameters type */
export interface ISelectLastTaskInBoardColumnParams {
  boardColumnId: NumberOrString;
}

/** 'SelectLastTaskInBoardColumn' return type */
export interface ISelectLastTaskInBoardColumnResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  position: string;
  title: string;
  updatedAt: Date;
}

/** 'SelectLastTaskInBoardColumn' query type */
export interface ISelectLastTaskInBoardColumnQuery {
  params: ISelectLastTaskInBoardColumnParams;
  result: ISelectLastTaskInBoardColumnResult;
}

const selectLastTaskInBoardColumnIR: any = {"usedParamSet":{"boardColumnId":true},"params":[{"name":"boardColumnId","required":true,"transform":{"type":"scalar"},"locs":[{"a":43,"b":57}]}],"statement":"select *\nfrom task\nwhere board_column_id = :boardColumnId!\norder by position desc\nlimit 1"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from task
 * where board_column_id = :boardColumnId!
 * order by position desc
 * limit 1
 * ```
 */
export const selectLastTaskInBoardColumn = new PreparedQuery<ISelectLastTaskInBoardColumnParams,ISelectLastTaskInBoardColumnResult>(selectLastTaskInBoardColumnIR);


/** 'InsertTask' parameters type */
export interface IInsertTaskParams {
  task: {
    title: string,
    description: string,
    boardColumnId: NumberOrString,
    position: string
  };
}

/** 'InsertTask' return type */
export interface IInsertTaskResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  position: string;
  title: string;
  updatedAt: Date;
}

/** 'InsertTask' query type */
export interface IInsertTaskQuery {
  params: IInsertTaskParams;
  result: IInsertTaskResult;
}

const insertTaskIR: any = {"usedParamSet":{"task":true},"params":[{"name":"task","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"title","required":true},{"name":"description","required":true},{"name":"boardColumnId","required":true},{"name":"position","required":true}]},"locs":[{"a":71,"b":75}]}],"statement":"insert into task(title, description, board_column_id, position)\nvalues :task\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * insert into task(title, description, board_column_id, position)
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
  position?: string | null | void;
  title?: string | null | void;
}

/** 'UpdateTask' return type */
export interface IUpdateTaskResult {
  boardColumnId: string;
  createdAt: Date;
  description: string;
  id: string;
  position: string;
  title: string;
  updatedAt: Date;
}

/** 'UpdateTask' query type */
export interface IUpdateTaskQuery {
  params: IUpdateTaskParams;
  result: IUpdateTaskResult;
}

const updateTaskIR: any = {"usedParamSet":{"title":true,"description":true,"boardColumnId":true,"position":true,"id":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":42}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":80,"b":91}]},{"name":"boardColumnId","required":false,"transform":{"type":"scalar"},"locs":[{"a":139,"b":152}]},{"name":"position","required":false,"transform":{"type":"scalar"},"locs":[{"a":197,"b":205}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":229,"b":232}]}],"statement":"update task set\n    title = coalesce(:title, title),\n    description = coalesce(:description, description),\n    board_column_id = coalesce(:boardColumnId, board_column_id),\n    position = coalesce(:position, position)\nwhere id = :id!\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * update task set
 *     title = coalesce(:title, title),
 *     description = coalesce(:description, description),
 *     board_column_id = coalesce(:boardColumnId, board_column_id),
 *     position = coalesce(:position, position)
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
  position: string;
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


/** 'UpdateTaskSubtasks' parameters type */
export interface IUpdateTaskSubtasksParams {
  subtasks: readonly ({
    id: string,
    title: string | null | void,
    completed: string | null | void
  })[];
  taskId: NumberOrString;
}

/** 'UpdateTaskSubtasks' return type */
export interface IUpdateTaskSubtasksResult {
  completed: boolean;
  createdAt: Date;
  id: string;
  taskId: string;
  title: string;
  updatedAt: Date;
}

/** 'UpdateTaskSubtasks' query type */
export interface IUpdateTaskSubtasksQuery {
  params: IUpdateTaskSubtasksParams;
  result: IUpdateTaskSubtasksResult;
}

const updateTaskSubtasksIR: any = {"usedParamSet":{"subtasks":true,"taskId":true},"params":[{"name":"subtasks","required":true,"transform":{"type":"pick_array_spread","keys":[{"name":"id","required":true},{"name":"title","required":false},{"name":"completed","required":false}]},"locs":[{"a":170,"b":179}]},{"name":"taskId","required":true,"transform":{"type":"scalar"},"locs":[{"a":289,"b":296}]}],"statement":"update subtask\nset\n    title = coalesce(subtask_update.title, subtask.title),\n    completed = coalesce(subtask_update.completed::boolean, subtask.completed)\nfrom (values :subtasks!) as subtask_update(id, title, completed)\nwhere subtask.id = subtask_update.id::bigint\nand subtask.task_id = :taskId!\nreturning subtask.*"};

/**
 * Query generated from SQL:
 * ```
 * update subtask
 * set
 *     title = coalesce(subtask_update.title, subtask.title),
 *     completed = coalesce(subtask_update.completed::boolean, subtask.completed)
 * from (values :subtasks!) as subtask_update(id, title, completed)
 * where subtask.id = subtask_update.id::bigint
 * and subtask.task_id = :taskId!
 * returning subtask.*
 * ```
 */
export const updateTaskSubtasks = new PreparedQuery<IUpdateTaskSubtasksParams,IUpdateTaskSubtasksResult>(updateTaskSubtasksIR);


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


/** 'DeleteTaskSubtasks' parameters type */
export interface IDeleteTaskSubtasksParams {
  subtaskIds: readonly (NumberOrString)[];
  taskId: NumberOrString;
}

/** 'DeleteTaskSubtasks' return type */
export interface IDeleteTaskSubtasksResult {
  completed: boolean;
  createdAt: Date;
  id: string;
  taskId: string;
  title: string;
  updatedAt: Date;
}

/** 'DeleteTaskSubtasks' query type */
export interface IDeleteTaskSubtasksQuery {
  params: IDeleteTaskSubtasksParams;
  result: IDeleteTaskSubtasksResult;
}

const deleteTaskSubtasksIR: any = {"usedParamSet":{"subtaskIds":true,"taskId":true},"params":[{"name":"subtaskIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":32,"b":43}]},{"name":"taskId","required":true,"transform":{"type":"scalar"},"locs":[{"a":59,"b":66}]}],"statement":"delete from subtask\nwhere id in :subtaskIds!\nand task_id = :taskId!\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * delete from subtask
 * where id in :subtaskIds!
 * and task_id = :taskId!
 * returning *
 * ```
 */
export const deleteTaskSubtasks = new PreparedQuery<IDeleteTaskSubtasksParams,IDeleteTaskSubtasksResult>(deleteTaskSubtasksIR);


