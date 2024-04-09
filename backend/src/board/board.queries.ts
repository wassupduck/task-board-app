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


