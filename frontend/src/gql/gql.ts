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
    "\n  fragment Board_BoardFragment on Board {\n    columns {\n      nodes {\n        id\n        ...Column_BoardColumnFragment\n      }\n    }\n  }\n": types.Board_BoardFragmentFragmentDoc,
    "\n  fragment Column_BoardColumnFragment on BoardColumn {\n    name\n    tasks {\n      id\n      ...TaskCard_TaskFragment\n    }\n  }\n": types.Column_BoardColumnFragmentFragmentDoc,
    "\n  fragment BoardNav_QueryFragment on Query {\n    boards {\n      id\n      name\n    }\n  }\n": types.BoardNav_QueryFragmentFragmentDoc,
    "\n  fragment BoardHeader_BoardFragment on Board {\n    name\n    columns {\n      totalCount\n    }\n  }\n": types.BoardHeader_BoardFragmentFragmentDoc,
    "\n  fragment Sidebar_QueryFragment on Query {\n    ...BoardNav_QueryFragment\n  }\n": types.Sidebar_QueryFragmentFragmentDoc,
    "\n  fragment TaskCard_TaskFragment on Task {\n    title\n    subtasks {\n      totalCount\n      completedCount\n    }\n  }\n": types.TaskCard_TaskFragmentFragmentDoc,
    "\n  fragment TaskViewModal_TaskFragment on Task {\n    id\n    title\n    description\n    column {\n      id\n      name\n    }\n    subtasks {\n      totalCount\n      completedCount\n      nodes {\n        ...SubtaskList_SubtaskFragment\n      }\n    }\n  }\n": types.TaskViewModal_TaskFragmentFragmentDoc,
    "\n  fragment TaskViewModal_BoardFragment on Board {\n    columns {\n      nodes {\n        ...TaskColumnSelect_BoardColumnFragment\n      }\n    }\n  }\n": types.TaskViewModal_BoardFragmentFragmentDoc,
    "\n  fragment SubtaskList_SubtaskFragment on Subtask {\n    id\n    ...SubtaskListItem_SubtaskFragment\n  }\n": types.SubtaskList_SubtaskFragmentFragmentDoc,
    "\n  fragment SubtaskListItem_SubtaskFragment on Subtask {\n    id\n    title\n    completed\n  }\n": types.SubtaskListItem_SubtaskFragmentFragmentDoc,
    "\n  fragment TaskColumnSelect_BoardColumnFragment on BoardColumn {\n    id\n    name\n  }\n": types.TaskColumnSelect_BoardColumnFragmentFragmentDoc,
    "\n  query BoardRoute_Query($id: ID!) {\n    board(id: $id) {\n      id\n      columns {\n        totalCount\n      }\n      ...Board_BoardFragment\n      ...BoardHeader_BoardFragment\n      ...TaskViewModal_BoardFragment\n    }\n  }\n": types.BoardRoute_QueryDocument,
    "\n  mutation CreateBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      __typename\n      ... on CreateBoardSuccess {\n        board {\n          id\n        }\n      }\n      ... on ErrorResponse {\n        message\n      }\n    }\n  }\n": types.CreateBoardDocument,
    "\n  query RootRoute_Query {\n    boards {\n      id\n    }\n    ...Sidebar_QueryFragment\n  }\n": types.RootRoute_QueryDocument,
    "\n  query TaskRoute_Query($id: ID!) {\n    task(id: $id) {\n      ...TaskViewModal_TaskFragment\n    }\n  }\n": types.TaskRoute_QueryDocument,
    "\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(input: $input) {\n      __typename\n      ... on ErrorResponse {\n        message\n      }\n    }\n  }\n": types.UpdateTaskDocument,
    "\n  mutation UpdateSubtaskCompleted($input: UpdateSubtaskCompletedInput!) {\n    updateSubtaskCompleted(input: $input) {\n      __typename\n      ... on ErrorResponse {\n        message\n      }\n    }\n  }\n": types.UpdateSubtaskCompletedDocument,
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
export function graphql(source: "\n  fragment Board_BoardFragment on Board {\n    columns {\n      nodes {\n        id\n        ...Column_BoardColumnFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Board_BoardFragment on Board {\n    columns {\n      nodes {\n        id\n        ...Column_BoardColumnFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Column_BoardColumnFragment on BoardColumn {\n    name\n    tasks {\n      id\n      ...TaskCard_TaskFragment\n    }\n  }\n"): (typeof documents)["\n  fragment Column_BoardColumnFragment on BoardColumn {\n    name\n    tasks {\n      id\n      ...TaskCard_TaskFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BoardNav_QueryFragment on Query {\n    boards {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment BoardNav_QueryFragment on Query {\n    boards {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BoardHeader_BoardFragment on Board {\n    name\n    columns {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  fragment BoardHeader_BoardFragment on Board {\n    name\n    columns {\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Sidebar_QueryFragment on Query {\n    ...BoardNav_QueryFragment\n  }\n"): (typeof documents)["\n  fragment Sidebar_QueryFragment on Query {\n    ...BoardNav_QueryFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskCard_TaskFragment on Task {\n    title\n    subtasks {\n      totalCount\n      completedCount\n    }\n  }\n"): (typeof documents)["\n  fragment TaskCard_TaskFragment on Task {\n    title\n    subtasks {\n      totalCount\n      completedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskViewModal_TaskFragment on Task {\n    id\n    title\n    description\n    column {\n      id\n      name\n    }\n    subtasks {\n      totalCount\n      completedCount\n      nodes {\n        ...SubtaskList_SubtaskFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment TaskViewModal_TaskFragment on Task {\n    id\n    title\n    description\n    column {\n      id\n      name\n    }\n    subtasks {\n      totalCount\n      completedCount\n      nodes {\n        ...SubtaskList_SubtaskFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskViewModal_BoardFragment on Board {\n    columns {\n      nodes {\n        ...TaskColumnSelect_BoardColumnFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment TaskViewModal_BoardFragment on Board {\n    columns {\n      nodes {\n        ...TaskColumnSelect_BoardColumnFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SubtaskList_SubtaskFragment on Subtask {\n    id\n    ...SubtaskListItem_SubtaskFragment\n  }\n"): (typeof documents)["\n  fragment SubtaskList_SubtaskFragment on Subtask {\n    id\n    ...SubtaskListItem_SubtaskFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SubtaskListItem_SubtaskFragment on Subtask {\n    id\n    title\n    completed\n  }\n"): (typeof documents)["\n  fragment SubtaskListItem_SubtaskFragment on Subtask {\n    id\n    title\n    completed\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskColumnSelect_BoardColumnFragment on BoardColumn {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment TaskColumnSelect_BoardColumnFragment on BoardColumn {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BoardRoute_Query($id: ID!) {\n    board(id: $id) {\n      id\n      columns {\n        totalCount\n      }\n      ...Board_BoardFragment\n      ...BoardHeader_BoardFragment\n      ...TaskViewModal_BoardFragment\n    }\n  }\n"): (typeof documents)["\n  query BoardRoute_Query($id: ID!) {\n    board(id: $id) {\n      id\n      columns {\n        totalCount\n      }\n      ...Board_BoardFragment\n      ...BoardHeader_BoardFragment\n      ...TaskViewModal_BoardFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      __typename\n      ... on CreateBoardSuccess {\n        board {\n          id\n        }\n      }\n      ... on ErrorResponse {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      __typename\n      ... on CreateBoardSuccess {\n        board {\n          id\n        }\n      }\n      ... on ErrorResponse {\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RootRoute_Query {\n    boards {\n      id\n    }\n    ...Sidebar_QueryFragment\n  }\n"): (typeof documents)["\n  query RootRoute_Query {\n    boards {\n      id\n    }\n    ...Sidebar_QueryFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TaskRoute_Query($id: ID!) {\n    task(id: $id) {\n      ...TaskViewModal_TaskFragment\n    }\n  }\n"): (typeof documents)["\n  query TaskRoute_Query($id: ID!) {\n    task(id: $id) {\n      ...TaskViewModal_TaskFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(input: $input) {\n      __typename\n      ... on ErrorResponse {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(input: $input) {\n      __typename\n      ... on ErrorResponse {\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSubtaskCompleted($input: UpdateSubtaskCompletedInput!) {\n    updateSubtaskCompleted(input: $input) {\n      __typename\n      ... on ErrorResponse {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSubtaskCompleted($input: UpdateSubtaskCompletedInput!) {\n    updateSubtaskCompleted(input: $input) {\n      __typename\n      ... on ErrorResponse {\n        message\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;