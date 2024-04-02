/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query allBoardsQuery {\n    boards {\n      id\n      ...BoardList_BoardFragment\n      ...Header_BoardFragment\n    }\n  }\n": types.AllBoardsQueryDocument,
    "\n  query boardQuery($id: ID!) {\n    board(id: $id) {\n      ...BoardArea_BoardFragment\n    }\n  }\n": types.BoardQueryDocument,
    "\n  fragment Board_BoardFragment on Board {\n    columns {\n      id\n      ...Column_BoardColumnFragment\n    }\n  }\n": types.Board_BoardFragmentFragmentDoc,
    "\n  fragment Column_BoardColumnFragment on BoardColumn {\n    name\n    tasks {\n      id\n      ...TaskCard_TaskFragment\n    }\n  }\n": types.Column_BoardColumnFragmentFragmentDoc,
    "\n  fragment BoardArea_BoardFragment on Board {\n    columns {\n      id\n    }\n    ...Board_BoardFragment\n  }\n": types.BoardArea_BoardFragmentFragmentDoc,
    "\n  fragment BoardList_BoardFragment on Board {\n    id\n    name\n  }\n": types.BoardList_BoardFragmentFragmentDoc,
    "\n  fragment Header_BoardFragment on Board {\n    name\n  }\n": types.Header_BoardFragmentFragmentDoc,
    "\n  fragment TaskCard_TaskFragment on Task {\n    title\n    subtasks {\n      totalCount\n      completedCount\n    }\n  }\n": types.TaskCard_TaskFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allBoardsQuery {\n    boards {\n      id\n      ...BoardList_BoardFragment\n      ...Header_BoardFragment\n    }\n  }\n"): (typeof documents)["\n  query allBoardsQuery {\n    boards {\n      id\n      ...BoardList_BoardFragment\n      ...Header_BoardFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query boardQuery($id: ID!) {\n    board(id: $id) {\n      ...BoardArea_BoardFragment\n    }\n  }\n"): (typeof documents)["\n  query boardQuery($id: ID!) {\n    board(id: $id) {\n      ...BoardArea_BoardFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Board_BoardFragment on Board {\n    columns {\n      id\n      ...Column_BoardColumnFragment\n    }\n  }\n"): (typeof documents)["\n  fragment Board_BoardFragment on Board {\n    columns {\n      id\n      ...Column_BoardColumnFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Column_BoardColumnFragment on BoardColumn {\n    name\n    tasks {\n      id\n      ...TaskCard_TaskFragment\n    }\n  }\n"): (typeof documents)["\n  fragment Column_BoardColumnFragment on BoardColumn {\n    name\n    tasks {\n      id\n      ...TaskCard_TaskFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BoardArea_BoardFragment on Board {\n    columns {\n      id\n    }\n    ...Board_BoardFragment\n  }\n"): (typeof documents)["\n  fragment BoardArea_BoardFragment on Board {\n    columns {\n      id\n    }\n    ...Board_BoardFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BoardList_BoardFragment on Board {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment BoardList_BoardFragment on Board {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Header_BoardFragment on Board {\n    name\n  }\n"): (typeof documents)["\n  fragment Header_BoardFragment on Board {\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskCard_TaskFragment on Task {\n    title\n    subtasks {\n      totalCount\n      completedCount\n    }\n  }\n"): (typeof documents)["\n  fragment TaskCard_TaskFragment on Task {\n    title\n    subtasks {\n      totalCount\n      completedCount\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;