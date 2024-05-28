/** Types generated for queries found in "src/board/board.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'SelectBoardsByUserId' parameters type */
export interface ISelectBoardsByUserIdParams {
  userId: NumberOrString;
}

/** 'SelectBoardsByUserId' return type */
export interface ISelectBoardsByUserIdResult {
  appUserId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

/** 'SelectBoardsByUserId' query type */
export interface ISelectBoardsByUserIdQuery {
  params: ISelectBoardsByUserIdParams;
  result: ISelectBoardsByUserIdResult;
}

const selectBoardsByUserIdIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":40,"b":47}]}],"statement":"select *\nfrom board\nwhere app_user_id = :userId!\norder by name asc"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from board
 * where app_user_id = :userId!
 * order by name asc
 * ```
 */
export const selectBoardsByUserId = new PreparedQuery<ISelectBoardsByUserIdParams,ISelectBoardsByUserIdResult>(selectBoardsByUserIdIR);


/** 'SelectForUpdateBoardByIdAsUser' parameters type */
export interface ISelectForUpdateBoardByIdAsUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'SelectForUpdateBoardByIdAsUser' return type */
export interface ISelectForUpdateBoardByIdAsUserResult {
  appUserId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

/** 'SelectForUpdateBoardByIdAsUser' query type */
export interface ISelectForUpdateBoardByIdAsUserQuery {
  params: ISelectForUpdateBoardByIdAsUserParams;
  result: ISelectForUpdateBoardByIdAsUserResult;
}

const selectForUpdateBoardByIdAsUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":31,"b":34}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":54,"b":61}]}],"statement":"select *\nfrom board\nwhere id = :id!\nand app_user_id = :userId!\nfor update"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from board
 * where id = :id!
 * and app_user_id = :userId!
 * for update
 * ```
 */
export const selectForUpdateBoardByIdAsUser = new PreparedQuery<ISelectForUpdateBoardByIdAsUserParams,ISelectForUpdateBoardByIdAsUserResult>(selectForUpdateBoardByIdAsUserIR);


/** 'SelectBoardByIdAsUser' parameters type */
export interface ISelectBoardByIdAsUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'SelectBoardByIdAsUser' return type */
export interface ISelectBoardByIdAsUserResult {
  appUserId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

/** 'SelectBoardByIdAsUser' query type */
export interface ISelectBoardByIdAsUserQuery {
  params: ISelectBoardByIdAsUserParams;
  result: ISelectBoardByIdAsUserResult;
}

const selectBoardByIdAsUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":31,"b":34}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":54,"b":61}]}],"statement":"select *\nfrom board\nwhere id = :id!\nand app_user_id = :userId!"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from board
 * where id = :id!
 * and app_user_id = :userId!
 * ```
 */
export const selectBoardByIdAsUser = new PreparedQuery<ISelectBoardByIdAsUserParams,ISelectBoardByIdAsUserResult>(selectBoardByIdAsUserIR);


/** 'SelectBoardColumnsConnection' parameters type */
export interface ISelectBoardColumnsConnectionParams {
  boardId: NumberOrString;
}

/** 'SelectBoardColumnsConnection' return type */
export interface ISelectBoardColumnsConnectionResult {
  boardId: string;
  totalCount: number;
}

/** 'SelectBoardColumnsConnection' query type */
export interface ISelectBoardColumnsConnectionQuery {
  params: ISelectBoardColumnsConnectionParams;
  result: ISelectBoardColumnsConnectionResult;
}

const selectBoardColumnsConnectionIR: any = {"usedParamSet":{"boardId":true},"params":[{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":177,"b":185}]}],"statement":"select\n    board.id as \"board_id!\",\n    count(board_column.id)::integer as \"total_count!\"\nfrom board\nleft join board_column on board_column.board_id = board.id\nwhere board.id = :boardId!\ngroup by board.id"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     board.id as "board_id!",
 *     count(board_column.id)::integer as "total_count!"
 * from board
 * left join board_column on board_column.board_id = board.id
 * where board.id = :boardId!
 * group by board.id
 * ```
 */
export const selectBoardColumnsConnection = new PreparedQuery<ISelectBoardColumnsConnectionParams,ISelectBoardColumnsConnectionResult>(selectBoardColumnsConnectionIR);


/** 'SelectForUpdateBoardColumnByIdAsUser' parameters type */
export interface ISelectForUpdateBoardColumnByIdAsUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'SelectForUpdateBoardColumnByIdAsUser' return type */
export interface ISelectForUpdateBoardColumnByIdAsUserResult {
  boardId: string;
  createdAt: Date;
  id: string;
  name: string;
  position: number;
  updatedAt: Date;
}

/** 'SelectForUpdateBoardColumnByIdAsUser' query type */
export interface ISelectForUpdateBoardColumnByIdAsUserQuery {
  params: ISelectForUpdateBoardColumnByIdAsUserParams;
  result: ISelectForUpdateBoardColumnByIdAsUserResult;
}

const selectForUpdateBoardColumnByIdAsUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":117,"b":120}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":146,"b":153}]}],"statement":"select board_column.*\nfrom board_column\ninner join board on board.id = board_column.board_id\nwhere board_column.id = :id!\nand board.app_user_id = :userId!\nfor update"};

/**
 * Query generated from SQL:
 * ```
 * select board_column.*
 * from board_column
 * inner join board on board.id = board_column.board_id
 * where board_column.id = :id!
 * and board.app_user_id = :userId!
 * for update
 * ```
 */
export const selectForUpdateBoardColumnByIdAsUser = new PreparedQuery<ISelectForUpdateBoardColumnByIdAsUserParams,ISelectForUpdateBoardColumnByIdAsUserResult>(selectForUpdateBoardColumnByIdAsUserIR);


/** 'SelectBoardColumnsByBoardId' parameters type */
export interface ISelectBoardColumnsByBoardIdParams {
  boardId: NumberOrString;
}

/** 'SelectBoardColumnsByBoardId' return type */
export interface ISelectBoardColumnsByBoardIdResult {
  boardId: string;
  createdAt: Date;
  id: string;
  name: string;
  position: number;
  updatedAt: Date;
}

/** 'SelectBoardColumnsByBoardId' query type */
export interface ISelectBoardColumnsByBoardIdQuery {
  params: ISelectBoardColumnsByBoardIdParams;
  result: ISelectBoardColumnsByBoardIdResult;
}

const selectBoardColumnsByBoardIdIR: any = {"usedParamSet":{"boardId":true},"params":[{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":44,"b":52}]}],"statement":"select *\nfrom board_column\nwhere board_id = :boardId!\norder by position asc"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from board_column
 * where board_id = :boardId!
 * order by position asc
 * ```
 */
export const selectBoardColumnsByBoardId = new PreparedQuery<ISelectBoardColumnsByBoardIdParams,ISelectBoardColumnsByBoardIdResult>(selectBoardColumnsByBoardIdIR);


/** 'SelectBoardColumnsByIds' parameters type */
export interface ISelectBoardColumnsByIdsParams {
  ids: readonly (NumberOrString)[];
}

/** 'SelectBoardColumnsByIds' return type */
export interface ISelectBoardColumnsByIdsResult {
  boardId: string;
  createdAt: Date;
  id: string;
  name: string;
  position: number;
  updatedAt: Date;
}

/** 'SelectBoardColumnsByIds' query type */
export interface ISelectBoardColumnsByIdsQuery {
  params: ISelectBoardColumnsByIdsParams;
  result: ISelectBoardColumnsByIdsResult;
}

const selectBoardColumnsByIdsIR: any = {"usedParamSet":{"ids":true},"params":[{"name":"ids","required":true,"transform":{"type":"array_spread"},"locs":[{"a":39,"b":43}]}],"statement":"select *\nfrom board_column\nwhere id in :ids!"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from board_column
 * where id in :ids!
 * ```
 */
export const selectBoardColumnsByIds = new PreparedQuery<ISelectBoardColumnsByIdsParams,ISelectBoardColumnsByIdsResult>(selectBoardColumnsByIdsIR);


/** 'SelectBoardColumnTasksConnections' parameters type */
export interface ISelectBoardColumnTasksConnectionsParams {
  boardColumnIds: readonly (NumberOrString)[];
}

/** 'SelectBoardColumnTasksConnections' return type */
export interface ISelectBoardColumnTasksConnectionsResult {
  boardColumnId: string;
  totalCount: number;
}

/** 'SelectBoardColumnTasksConnections' query type */
export interface ISelectBoardColumnTasksConnectionsQuery {
  params: ISelectBoardColumnTasksConnectionsParams;
  result: ISelectBoardColumnTasksConnectionsResult;
}

const selectBoardColumnTasksConnectionsIR: any = {"usedParamSet":{"boardColumnIds":true},"params":[{"name":"boardColumnIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":196,"b":211}]}],"statement":"select\n    board_column.id as \"board_column_id!\",\n    count(task.id)::integer as \"total_count!\"\nfrom board_column\nleft join task on task.board_column_id = board_column.id\nwhere board_column.id in :boardColumnIds!\ngroup by board_column.id"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     board_column.id as "board_column_id!",
 *     count(task.id)::integer as "total_count!"
 * from board_column
 * left join task on task.board_column_id = board_column.id
 * where board_column.id in :boardColumnIds!
 * group by board_column.id
 * ```
 */
export const selectBoardColumnTasksConnections = new PreparedQuery<ISelectBoardColumnTasksConnectionsParams,ISelectBoardColumnTasksConnectionsResult>(selectBoardColumnTasksConnectionsIR);


/** 'InsertBoard' parameters type */
export interface IInsertBoardParams {
  board: {
    name: string | null | void,
    appUserId: NumberOrString | null | void
  };
}

/** 'InsertBoard' return type */
export interface IInsertBoardResult {
  appUserId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

/** 'InsertBoard' query type */
export interface IInsertBoardQuery {
  params: IInsertBoardParams;
  result: IInsertBoardResult;
}

const insertBoardIR: any = {"usedParamSet":{"board":true},"params":[{"name":"board","required":true,"transform":{"type":"pick_tuple","keys":[{"name":"name","required":false},{"name":"appUserId","required":false}]},"locs":[{"a":44,"b":50}]}],"statement":"insert into board(name, app_user_id)\nvalues :board!\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * insert into board(name, app_user_id)
 * values :board!
 * returning *
 * ```
 */
export const insertBoard = new PreparedQuery<IInsertBoardParams,IInsertBoardResult>(insertBoardIR);


/** 'UpdateBoard' parameters type */
export interface IUpdateBoardParams {
  id: NumberOrString;
  name?: string | null | void;
}

/** 'UpdateBoard' return type */
export interface IUpdateBoardResult {
  appUserId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

/** 'UpdateBoard' query type */
export interface IUpdateBoardQuery {
  params: IUpdateBoardParams;
  result: IUpdateBoardResult;
}

const updateBoardIR: any = {"usedParamSet":{"name":true,"id":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":41}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":61,"b":64}]}],"statement":"update board set\n    name = coalesce(:name, name)\nwhere id = :id!\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * update board set
 *     name = coalesce(:name, name)
 * where id = :id!
 * returning *
 * ```
 */
export const updateBoard = new PreparedQuery<IUpdateBoardParams,IUpdateBoardResult>(updateBoardIR);


/** 'DeleteBoardColumns' parameters type */
export interface IDeleteBoardColumnsParams {
  boardId: NumberOrString;
  columnIds: readonly (NumberOrString)[];
}

/** 'DeleteBoardColumns' return type */
export type IDeleteBoardColumnsResult = void;

/** 'DeleteBoardColumns' query type */
export interface IDeleteBoardColumnsQuery {
  params: IDeleteBoardColumnsParams;
  result: IDeleteBoardColumnsResult;
}

const deleteBoardColumnsIR: any = {"usedParamSet":{"columnIds":true,"boardId":true},"params":[{"name":"columnIds","required":true,"transform":{"type":"array_spread"},"locs":[{"a":37,"b":47}]},{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":64,"b":72}]}],"statement":"delete from board_column\nwhere id in :columnIds!\nand board_id = :boardId!"};

/**
 * Query generated from SQL:
 * ```
 * delete from board_column
 * where id in :columnIds!
 * and board_id = :boardId!
 * ```
 */
export const deleteBoardColumns = new PreparedQuery<IDeleteBoardColumnsParams,IDeleteBoardColumnsResult>(deleteBoardColumnsIR);


/** 'InsertBoardColumns' parameters type */
export interface IInsertBoardColumnsParams {
  columns: readonly ({
    idAlias: string | null | void,
    name: string,
    position: string,
    boardId: string
  })[];
}

/** 'InsertBoardColumns' return type */
export interface IInsertBoardColumnsResult {
  boardId: string;
  createdAt: Date;
  id: string;
  idAlias: string | null;
  name: string;
  position: number;
  updatedAt: Date;
}

/** 'InsertBoardColumns' query type */
export interface IInsertBoardColumnsQuery {
  params: IInsertBoardColumnsParams;
  result: IInsertBoardColumnsResult;
}

const insertBoardColumnsIR: any = {"usedParamSet":{"columns":true},"params":[{"name":"columns","required":true,"transform":{"type":"pick_array_spread","keys":[{"name":"idAlias","required":false},{"name":"name","required":true},{"name":"position","required":true},{"name":"boardId","required":true}]},"locs":[{"a":195,"b":203}]}],"statement":"with\nnew_column_data as (\n    select\n        id_alias,\n        name,\n        position::smallint,\n        board_id::bigint,\n        nextval('board_column_id_seq'::regclass) as id\n    from (values :columns!) as c (id_alias, name, position, board_id)\n),\nnew_column as (\n    insert into board_column(id, name, position, board_id)\n    select id, name, position, board_id\n    from new_column_data\n    returning *\n)\nselect\n    new_column.*,\n    new_column_data.id_alias\nfrom new_column\ninner join new_column_data on new_column_data.id = new_column.id\norder by new_column.position asc"};

/**
 * Query generated from SQL:
 * ```
 * with
 * new_column_data as (
 *     select
 *         id_alias,
 *         name,
 *         position::smallint,
 *         board_id::bigint,
 *         nextval('board_column_id_seq'::regclass) as id
 *     from (values :columns!) as c (id_alias, name, position, board_id)
 * ),
 * new_column as (
 *     insert into board_column(id, name, position, board_id)
 *     select id, name, position, board_id
 *     from new_column_data
 *     returning *
 * )
 * select
 *     new_column.*,
 *     new_column_data.id_alias
 * from new_column
 * inner join new_column_data on new_column_data.id = new_column.id
 * order by new_column.position asc
 * ```
 */
export const insertBoardColumns = new PreparedQuery<IInsertBoardColumnsParams,IInsertBoardColumnsResult>(insertBoardColumnsIR);


/** 'UpdateBoardColumns' parameters type */
export interface IUpdateBoardColumnsParams {
  boardId: NumberOrString;
  columns: readonly ({
    id: string,
    name: string | null | void,
    position: string | null | void
  })[];
}

/** 'UpdateBoardColumns' return type */
export interface IUpdateBoardColumnsResult {
  boardId: string;
  createdAt: Date;
  id: string;
  name: string;
  position: number;
  updatedAt: Date;
}

/** 'UpdateBoardColumns' query type */
export interface IUpdateBoardColumnsQuery {
  params: IUpdateBoardColumnsParams;
  result: IUpdateBoardColumnsResult;
}

const updateBoardColumnsIR: any = {"usedParamSet":{"columns":true,"boardId":true},"params":[{"name":"columns","required":true,"transform":{"type":"pick_array_spread","keys":[{"name":"id","required":true},{"name":"name","required":false},{"name":"position","required":false}]},"locs":[{"a":178,"b":186}]},{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":303,"b":311}]}],"statement":"update board_column\nset\n    name = coalesce(column_update.name, board_column.name),\n    position = coalesce(column_update.position::smallint, board_column.position)\nfrom (values :columns!) as column_update(id, name, position)\nwhere board_column.id = column_update.id::bigint\nand board_column.board_id = :boardId!\nreturning board_column.*"};

/**
 * Query generated from SQL:
 * ```
 * update board_column
 * set
 *     name = coalesce(column_update.name, board_column.name),
 *     position = coalesce(column_update.position::smallint, board_column.position)
 * from (values :columns!) as column_update(id, name, position)
 * where board_column.id = column_update.id::bigint
 * and board_column.board_id = :boardId!
 * returning board_column.*
 * ```
 */
export const updateBoardColumns = new PreparedQuery<IUpdateBoardColumnsParams,IUpdateBoardColumnsResult>(updateBoardColumnsIR);


/** 'DeleteBoardAsUser' parameters type */
export interface IDeleteBoardAsUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'DeleteBoardAsUser' return type */
export interface IDeleteBoardAsUserResult {
  appUserId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

/** 'DeleteBoardAsUser' query type */
export interface IDeleteBoardAsUserQuery {
  params: IDeleteBoardAsUserParams;
  result: IDeleteBoardAsUserResult;
}

const deleteBoardAsUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":29,"b":32}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":52,"b":59}]}],"statement":"delete from board\nwhere id = :id!\nand app_user_id = :userId!\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * delete from board
 * where id = :id!
 * and app_user_id = :userId!
 * returning *
 * ```
 */
export const deleteBoardAsUser = new PreparedQuery<IDeleteBoardAsUserParams,IDeleteBoardAsUserResult>(deleteBoardAsUserIR);


