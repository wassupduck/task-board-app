/** Types generated for queries found in "src/board/board.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'SelectAllBoardsForUser' parameters type */
export interface ISelectAllBoardsForUserParams {
  userId: NumberOrString;
}

/** 'SelectAllBoardsForUser' return type */
export interface ISelectAllBoardsForUserResult {
  appUserId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

/** 'SelectAllBoardsForUser' query type */
export interface ISelectAllBoardsForUserQuery {
  params: ISelectAllBoardsForUserParams;
  result: ISelectAllBoardsForUserResult;
}

const selectAllBoardsForUserIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":40,"b":47}]}],"statement":"SELECT *\nFROM board\nWHERE app_user_id = :userId!\nORDER BY name ASC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM board
 * WHERE app_user_id = :userId!
 * ORDER BY name ASC
 * ```
 */
export const selectAllBoardsForUser = new PreparedQuery<ISelectAllBoardsForUserParams,ISelectAllBoardsForUserResult>(selectAllBoardsForUserIR);


/** 'SelectForUpdateBoardByIdForUser' parameters type */
export interface ISelectForUpdateBoardByIdForUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'SelectForUpdateBoardByIdForUser' return type */
export interface ISelectForUpdateBoardByIdForUserResult {
  appUserId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

/** 'SelectForUpdateBoardByIdForUser' query type */
export interface ISelectForUpdateBoardByIdForUserQuery {
  params: ISelectForUpdateBoardByIdForUserParams;
  result: ISelectForUpdateBoardByIdForUserResult;
}

const selectForUpdateBoardByIdForUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":31,"b":34}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":54,"b":61}]}],"statement":"SELECT *\nFROM board\nWHERE id = :id!\nAND app_user_id = :userId!\nFOR UPDATE"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM board
 * WHERE id = :id!
 * AND app_user_id = :userId!
 * FOR UPDATE
 * ```
 */
export const selectForUpdateBoardByIdForUser = new PreparedQuery<ISelectForUpdateBoardByIdForUserParams,ISelectForUpdateBoardByIdForUserResult>(selectForUpdateBoardByIdForUserIR);


/** 'SelectBoardByIdForUser' parameters type */
export interface ISelectBoardByIdForUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'SelectBoardByIdForUser' return type */
export interface ISelectBoardByIdForUserResult {
  appUserId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
}

/** 'SelectBoardByIdForUser' query type */
export interface ISelectBoardByIdForUserQuery {
  params: ISelectBoardByIdForUserParams;
  result: ISelectBoardByIdForUserResult;
}

const selectBoardByIdForUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":31,"b":34}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":54,"b":61}]}],"statement":"SELECT *\nFROM board\nWHERE id = :id!\nAND app_user_id = :userId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM board
 * WHERE id = :id!
 * AND app_user_id = :userId!
 * ```
 */
export const selectBoardByIdForUser = new PreparedQuery<ISelectBoardByIdForUserParams,ISelectBoardByIdForUserResult>(selectBoardByIdForUserIR);


/** 'SelectBoardColumnByIdForUser' parameters type */
export interface ISelectBoardColumnByIdForUserParams {
  id: NumberOrString;
  userId: NumberOrString;
}

/** 'SelectBoardColumnByIdForUser' return type */
export interface ISelectBoardColumnByIdForUserResult {
  boardId: string;
  createdAt: Date;
  id: string;
  name: string;
  position: number;
  updatedAt: Date;
}

/** 'SelectBoardColumnByIdForUser' query type */
export interface ISelectBoardColumnByIdForUserQuery {
  params: ISelectBoardColumnByIdForUserParams;
  result: ISelectBoardColumnByIdForUserResult;
}

const selectBoardColumnByIdForUserIR: any = {"usedParamSet":{"id":true,"userId":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":117,"b":120}]},{"name":"userId","required":true,"transform":{"type":"scalar"},"locs":[{"a":146,"b":153}]}],"statement":"SELECT board_column.*\nFROM board_column\nINNER JOIN board ON board.id = board_column.board_id\nWHERE board_column.id = :id!\nAND board.app_user_id = :userId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT board_column.*
 * FROM board_column
 * INNER JOIN board ON board.id = board_column.board_id
 * WHERE board_column.id = :id!
 * AND board.app_user_id = :userId!
 * ```
 */
export const selectBoardColumnByIdForUser = new PreparedQuery<ISelectBoardColumnByIdForUserParams,ISelectBoardColumnByIdForUserResult>(selectBoardColumnByIdForUserIR);


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

const selectBoardColumnsByBoardIdIR: any = {"usedParamSet":{"boardId":true},"params":[{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":44,"b":52}]}],"statement":"SELECT *\nFROM board_column\nWHERE board_id = :boardId!\nORDER BY position ASC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM board_column
 * WHERE board_id = :boardId!
 * ORDER BY position ASC
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

const selectBoardColumnsByIdsIR: any = {"usedParamSet":{"ids":true},"params":[{"name":"ids","required":true,"transform":{"type":"array_spread"},"locs":[{"a":39,"b":43}]}],"statement":"SELECT *\nFROM board_column\nWHERE id in :ids!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM board_column
 * WHERE id in :ids!
 * ```
 */
export const selectBoardColumnsByIds = new PreparedQuery<ISelectBoardColumnsByIdsParams,ISelectBoardColumnsByIdsResult>(selectBoardColumnsByIdsIR);


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

const selectBoardColumnsConnectionIR: any = {"usedParamSet":{"boardId":true},"params":[{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":177,"b":185}]}],"statement":"SELECT\n    board.id AS \"board_id!\",\n    count(board_column.id)::integer AS \"total_count!\"\nFROM board\nLEFT JOIN board_column ON board_column.board_id = board.id\nWHERE board.id = :boardId!\nGROUP BY board.id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     board.id AS "board_id!",
 *     count(board_column.id)::integer AS "total_count!"
 * FROM board
 * LEFT JOIN board_column ON board_column.board_id = board.id
 * WHERE board.id = :boardId!
 * GROUP BY board.id
 * ```
 */
export const selectBoardColumnsConnection = new PreparedQuery<ISelectBoardColumnsConnectionParams,ISelectBoardColumnsConnectionResult>(selectBoardColumnsConnectionIR);


/** 'InsertBoard' parameters type */
export interface IInsertBoardParams {
  board: {
    name: string | null | void,
    userId: NumberOrString | null | void
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

const insertBoardIR: any = {"usedParamSet":{"board":true},"params":[{"name":"board","required":true,"transform":{"type":"pick_tuple","keys":[{"name":"name","required":false},{"name":"userId","required":false}]},"locs":[{"a":44,"b":50}]}],"statement":"INSERT INTO board(name, app_user_id)\nVALUES :board!\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO board(name, app_user_id)
 * VALUES :board!
 * RETURNING *
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

const updateBoardIR: any = {"usedParamSet":{"name":true,"id":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":41}]},{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":61,"b":64}]}],"statement":"UPDATE board SET\n    name = COALESCE(:name, name)\nWHERE id = :id!\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE board SET
 *     name = COALESCE(:name, name)
 * WHERE id = :id!
 * RETURNING *
 * ```
 */
export const updateBoard = new PreparedQuery<IUpdateBoardParams,IUpdateBoardResult>(updateBoardIR);


/** 'DeleteBoardColumns' parameters type */
export interface IDeleteBoardColumnsParams {
  boardId: NumberOrString;
  columnIds: readonly (NumberOrString | null | void)[];
}

/** 'DeleteBoardColumns' return type */
export type IDeleteBoardColumnsResult = void;

/** 'DeleteBoardColumns' query type */
export interface IDeleteBoardColumnsQuery {
  params: IDeleteBoardColumnsParams;
  result: IDeleteBoardColumnsResult;
}

const deleteBoardColumnsIR: any = {"usedParamSet":{"columnIds":true,"boardId":true},"params":[{"name":"columnIds","required":false,"transform":{"type":"array_spread"},"locs":[{"a":37,"b":46}]},{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":63,"b":71}]}],"statement":"DELETE FROM board_column\nWHERE id IN :columnIds\nAND board_id = :boardId!"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM board_column
 * WHERE id IN :columnIds
 * AND board_id = :boardId!
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

const insertBoardColumnsIR: any = {"usedParamSet":{"columns":true},"params":[{"name":"columns","required":true,"transform":{"type":"pick_array_spread","keys":[{"name":"idAlias","required":false},{"name":"name","required":true},{"name":"position","required":true},{"name":"boardId","required":true}]},"locs":[{"a":195,"b":203}]}],"statement":"WITH\nnew_column_data AS (\n    SELECT\n        id_alias,\n        name,\n        position::smallint,\n        board_id::bigint,\n        nextval('board_column_id_seq'::regclass) AS id\n    FROM (VALUES :columns!) AS c (id_alias, name, position, board_id)\n),\nnew_column AS (\n    INSERT INTO board_column(id, name, position, board_id)\n    SELECT id, name, position, board_id\n    FROM new_column_data\n    RETURNING *\n)\nSELECT\n    new_column.*,\n    new_column_data.id_alias\nFROM new_column\nINNER JOIN new_column_data ON new_column_data.id = new_column.id\nORDER BY new_column.position ASC"};

/**
 * Query generated from SQL:
 * ```
 * WITH
 * new_column_data AS (
 *     SELECT
 *         id_alias,
 *         name,
 *         position::smallint,
 *         board_id::bigint,
 *         nextval('board_column_id_seq'::regclass) AS id
 *     FROM (VALUES :columns!) AS c (id_alias, name, position, board_id)
 * ),
 * new_column AS (
 *     INSERT INTO board_column(id, name, position, board_id)
 *     SELECT id, name, position, board_id
 *     FROM new_column_data
 *     RETURNING *
 * )
 * SELECT
 *     new_column.*,
 *     new_column_data.id_alias
 * FROM new_column
 * INNER JOIN new_column_data ON new_column_data.id = new_column.id
 * ORDER BY new_column.position ASC
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

const updateBoardColumnsIR: any = {"usedParamSet":{"columns":true,"boardId":true},"params":[{"name":"columns","required":true,"transform":{"type":"pick_array_spread","keys":[{"name":"id","required":true},{"name":"name","required":false},{"name":"position","required":false}]},"locs":[{"a":178,"b":186}]},{"name":"boardId","required":true,"transform":{"type":"scalar"},"locs":[{"a":303,"b":311}]}],"statement":"UPDATE board_column\nSET\n    name = COALESCE(column_update.name, board_column.name),\n    position = COALESCE(column_update.position::smallint, board_column.position)\nFROM (VALUES :columns!) AS column_update(id, name, position)\nWHERE board_column.id = column_update.id::bigint\nAND board_column.board_id = :boardId!\nRETURNING board_column.*"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE board_column
 * SET
 *     name = COALESCE(column_update.name, board_column.name),
 *     position = COALESCE(column_update.position::smallint, board_column.position)
 * FROM (VALUES :columns!) AS column_update(id, name, position)
 * WHERE board_column.id = column_update.id::bigint
 * AND board_column.board_id = :boardId!
 * RETURNING board_column.*
 * ```
 */
export const updateBoardColumns = new PreparedQuery<IUpdateBoardColumnsParams,IUpdateBoardColumnsResult>(updateBoardColumnsIR);


