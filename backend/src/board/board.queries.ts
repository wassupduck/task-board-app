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


