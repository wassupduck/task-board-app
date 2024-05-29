/** Types generated for queries found in "src/user/user.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'SelectUserById' parameters type */
export interface ISelectUserByIdParams {
  id: string;
}

/** 'SelectUserById' return type */
export interface ISelectUserByIdResult {
  createdAt: Date;
  id: string;
  passwordHash: string;
  updatedAt: Date;
  username: string;
}

/** 'SelectUserById' query type */
export interface ISelectUserByIdQuery {
  params: ISelectUserByIdParams;
  result: ISelectUserByIdResult;
}

const selectUserByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":34,"b":37}]}],"statement":"select *\nfrom app_user\nwhere id = :id!"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from app_user
 * where id = :id!
 * ```
 */
export const selectUserById = new PreparedQuery<ISelectUserByIdParams,ISelectUserByIdResult>(selectUserByIdIR);


/** 'SelectUserByUsername' parameters type */
export interface ISelectUserByUsernameParams {
  username: string;
}

/** 'SelectUserByUsername' return type */
export interface ISelectUserByUsernameResult {
  createdAt: Date;
  id: string;
  passwordHash: string;
  updatedAt: Date;
  username: string;
}

/** 'SelectUserByUsername' query type */
export interface ISelectUserByUsernameQuery {
  params: ISelectUserByUsernameParams;
  result: ISelectUserByUsernameResult;
}

const selectUserByUsernameIR: any = {"usedParamSet":{"username":true},"params":[{"name":"username","required":true,"transform":{"type":"scalar"},"locs":[{"a":40,"b":49}]}],"statement":"select *\nfrom app_user\nwhere username = :username!"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from app_user
 * where username = :username!
 * ```
 */
export const selectUserByUsername = new PreparedQuery<ISelectUserByUsernameParams,ISelectUserByUsernameResult>(selectUserByUsernameIR);


/** 'InsertUser' parameters type */
export interface IInsertUserParams {
  user: {
    username: string,
    passwordHash: string
  };
}

/** 'InsertUser' return type */
export interface IInsertUserResult {
  createdAt: Date;
  id: string;
  passwordHash: string;
  updatedAt: Date;
  username: string;
}

/** 'InsertUser' query type */
export interface IInsertUserQuery {
  params: IInsertUserParams;
  result: IInsertUserResult;
}

const insertUserIR: any = {"usedParamSet":{"user":true},"params":[{"name":"user","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"username","required":true},{"name":"passwordHash","required":true}]},"locs":[{"a":53,"b":57}]}],"statement":"insert into app_user(username, password_hash)\nvalues :user\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * insert into app_user(username, password_hash)
 * values :user
 * returning *
 * ```
 */
export const insertUser = new PreparedQuery<IInsertUserParams,IInsertUserResult>(insertUserIR);


