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
    "\n  query AllBoardsQuery {\n    boards {\n      id\n      ...BoardList_BoardFragment\n    }\n  }\n": types.AllBoardsQueryDocument,
    "\n  query BoardQuery($id: ID!) {\n    board(id: $id) {\n      id\n      ...Header_BoardFragment\n      ...BoardArea_BoardFragment\n    }\n  }\n": types.BoardQueryDocument,
    "\n  fragment Board_BoardFragment on Board {\n    columns {\n      nodes {\n        id\n        ...Column_BoardColumnFragment\n      }\n    }\n  }\n": types.Board_BoardFragmentFragmentDoc,
    "\n  fragment Column_BoardColumnFragment on BoardColumn {\n    name\n    tasks {\n      id\n      ...TaskCard_TaskFragment\n    }\n  }\n": types.Column_BoardColumnFragmentFragmentDoc,
    "\n  fragment BoardArea_BoardFragment on Board {\n    id\n    columns {\n      totalCount\n    }\n    ...Board_BoardFragment\n    ...TaskViewModal_BoardFragment\n  }\n": types.BoardArea_BoardFragmentFragmentDoc,
    "\n  fragment BoardList_BoardFragment on Board {\n    id\n    name\n  }\n": types.BoardList_BoardFragmentFragmentDoc,
    "\n  fragment Header_BoardFragment on Board {\n    name\n    columns {\n      totalCount\n    }\n  }\n": types.Header_BoardFragmentFragmentDoc,
    "\n  fragment TaskCard_TaskFragment on Task {\n    title\n    subtasks {\n      totalCount\n      completedCount\n    }\n  }\n": types.TaskCard_TaskFragmentFragmentDoc,
    "\n  query TaskQuery($id: ID!) {\n    task(id: $id) {\n      title\n      description\n      column {\n        id\n        name\n      }\n      subtasks {\n        totalCount\n        completedCount\n        nodes {\n          ...SubtaskList_SubtaskFragment\n        }\n      }\n    }\n  }\n": types.TaskQueryDocument,
    "\n  mutation UpdateSubtaskCompletedMutation($id: ID!, $completed: Boolean!) {\n    updateSubtaskCompleted(id: $id, completed: $completed) {\n      success\n      message\n    }\n  }\n": types.UpdateSubtaskCompletedMutationDocument,
    "\n  mutation UpdateTaskColumnMutation($id: ID!, $boardColumnId: ID!) {\n    updateTask(id: $id, input: { boardColumnId: $boardColumnId }) {\n      id\n    }\n  }\n": types.UpdateTaskColumnMutationDocument,
    "\n  fragment TaskViewModal_BoardFragment on Board {\n    columns {\n      nodes {\n        ...TaskColumnSelect_BoardColumnFragment\n      }\n    }\n  }\n": types.TaskViewModal_BoardFragmentFragmentDoc,
    "\n  fragment SubtaskList_SubtaskFragment on Subtask {\n    id\n    ...SubtaskListItem_SubtaskFragment\n  }\n": types.SubtaskList_SubtaskFragmentFragmentDoc,
    "\n  fragment SubtaskListItem_SubtaskFragment on Subtask {\n    id\n    title\n    completed\n  }\n": types.SubtaskListItem_SubtaskFragmentFragmentDoc,
    "\n  fragment TaskColumnSelect_BoardColumnFragment on BoardColumn {\n    id\n    name\n  }\n": types.TaskColumnSelect_BoardColumnFragmentFragmentDoc,
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
export function graphql(source: "\n  query AllBoardsQuery {\n    boards {\n      id\n      ...BoardList_BoardFragment\n    }\n  }\n"): (typeof documents)["\n  query AllBoardsQuery {\n    boards {\n      id\n      ...BoardList_BoardFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BoardQuery($id: ID!) {\n    board(id: $id) {\n      id\n      ...Header_BoardFragment\n      ...BoardArea_BoardFragment\n    }\n  }\n"): (typeof documents)["\n  query BoardQuery($id: ID!) {\n    board(id: $id) {\n      id\n      ...Header_BoardFragment\n      ...BoardArea_BoardFragment\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment BoardArea_BoardFragment on Board {\n    id\n    columns {\n      totalCount\n    }\n    ...Board_BoardFragment\n    ...TaskViewModal_BoardFragment\n  }\n"): (typeof documents)["\n  fragment BoardArea_BoardFragment on Board {\n    id\n    columns {\n      totalCount\n    }\n    ...Board_BoardFragment\n    ...TaskViewModal_BoardFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BoardList_BoardFragment on Board {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment BoardList_BoardFragment on Board {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Header_BoardFragment on Board {\n    name\n    columns {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  fragment Header_BoardFragment on Board {\n    name\n    columns {\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskCard_TaskFragment on Task {\n    title\n    subtasks {\n      totalCount\n      completedCount\n    }\n  }\n"): (typeof documents)["\n  fragment TaskCard_TaskFragment on Task {\n    title\n    subtasks {\n      totalCount\n      completedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TaskQuery($id: ID!) {\n    task(id: $id) {\n      title\n      description\n      column {\n        id\n        name\n      }\n      subtasks {\n        totalCount\n        completedCount\n        nodes {\n          ...SubtaskList_SubtaskFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query TaskQuery($id: ID!) {\n    task(id: $id) {\n      title\n      description\n      column {\n        id\n        name\n      }\n      subtasks {\n        totalCount\n        completedCount\n        nodes {\n          ...SubtaskList_SubtaskFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSubtaskCompletedMutation($id: ID!, $completed: Boolean!) {\n    updateSubtaskCompleted(id: $id, completed: $completed) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSubtaskCompletedMutation($id: ID!, $completed: Boolean!) {\n    updateSubtaskCompleted(id: $id, completed: $completed) {\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTaskColumnMutation($id: ID!, $boardColumnId: ID!) {\n    updateTask(id: $id, input: { boardColumnId: $boardColumnId }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTaskColumnMutation($id: ID!, $boardColumnId: ID!) {\n    updateTask(id: $id, input: { boardColumnId: $boardColumnId }) {\n      id\n    }\n  }\n"];
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

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;