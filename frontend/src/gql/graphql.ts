/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Board = {
  __typename?: 'Board';
  columns: BoardColumnsConnection;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks: Array<Task>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardColumn = {
  __typename?: 'BoardColumn';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  tasks: Array<Task>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardColumnNameConflictError = ErrorResponse & {
  __typename?: 'BoardColumnNameConflictError';
  message: Scalars['String']['output'];
};

export type BoardColumnsConnection = {
  __typename?: 'BoardColumnsConnection';
  nodes: Array<BoardColumn>;
  totalCount: Scalars['Int']['output'];
};

export type BoardNameConflictError = ErrorResponse & {
  __typename?: 'BoardNameConflictError';
  message: Scalars['String']['output'];
};

export type CreateBoardInput = {
  board: NewBoardInput;
};

export type CreateBoardResponse = BoardNameConflictError | CreateBoardSuccess | InvalidInputError;

export type CreateBoardSuccess = {
  __typename?: 'CreateBoardSuccess';
  board: Board;
};

export type CreateTaskInput = {
  boardColumnId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type ErrorResponse = {
  message: Scalars['String']['output'];
};

export type InvalidInputError = ErrorResponse & {
  __typename?: 'InvalidInputError';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: CreateBoardResponse;
  createTask: Task;
  updateBoard: UpdateBoardResponse;
  updateBoardColumns: UpdateBoardColumnsResponse;
  updateSubtaskCompleted: UpdateSubtaskCompletedResponse;
  updateTask: Task;
};


export type MutationCreateBoardArgs = {
  input: CreateBoardInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationUpdateBoardArgs = {
  input: UpdateBoardInput;
};


export type MutationUpdateBoardColumnsArgs = {
  input: UpdateBoardColumnsInput;
};


export type MutationUpdateSubtaskCompletedArgs = {
  input: UpdateSubtaskCompletedInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
};

export type NewBoardColumnInput = {
  name: Scalars['String']['input'];
};

export type NewBoardInput = {
  columns?: InputMaybe<Array<NewBoardColumnInput>>;
  name: Scalars['String']['input'];
};

export type NotFoundError = ErrorResponse & {
  __typename?: 'NotFoundError';
  message: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  boards: Array<Board>;
  hello: Scalars['String']['output'];
  task?: Maybe<Task>;
};


export type QueryBoardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};

export type Subtask = {
  __typename?: 'Subtask';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Task = {
  __typename?: 'Task';
  column: BoardColumn;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  subtasks: TaskSubtasksConnection;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskSubtasksConnection = {
  __typename?: 'TaskSubtasksConnection';
  completedCount: Scalars['Int']['output'];
  nodes: Array<Subtask>;
  totalCount: Scalars['Int']['output'];
};

export type UpdateBoardColumnInput = {
  id: Scalars['ID']['input'];
  patch: UpdateBoardColumnPatchInput;
};

export type UpdateBoardColumnPatchInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBoardColumnsInput = {
  boardId: Scalars['ID']['input'];
  patch: UpdateBoardColumnsPatchInput;
};

export type UpdateBoardColumnsPatchAdditionInput = {
  column: NewBoardColumnInput;
  /** Alias for the ID of the created column. Can be referenced in the "UpdateBoardColumnsPatchInput.columnOrder" array to add and order columns in a single request. */
  idAlias?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateBoardColumnsPatchInput = {
  additions?: InputMaybe<Array<UpdateBoardColumnsPatchAdditionInput>>;
  columnOrder?: InputMaybe<Array<Scalars['ID']['input']>>;
  deletions?: InputMaybe<Array<Scalars['ID']['input']>>;
  updates?: InputMaybe<Array<UpdateBoardColumnInput>>;
};

export type UpdateBoardColumnsResponse = BoardColumnNameConflictError | InvalidInputError | NotFoundError | UpdateBoardColumnsSuccess;

export type UpdateBoardColumnsSuccess = {
  __typename?: 'UpdateBoardColumnsSuccess';
  board: Board;
};

export type UpdateBoardInput = {
  id: Scalars['ID']['input'];
  patch: UpdateBoardPatchInput;
};

export type UpdateBoardPatchInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBoardResponse = BoardNameConflictError | InvalidInputError | NotFoundError | UpdateBoardSuccess;

export type UpdateBoardSuccess = {
  __typename?: 'UpdateBoardSuccess';
  board: Board;
};

export type UpdateSubtaskCompletedInput = {
  completed: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateSubtaskCompletedResponse = NotFoundError | UpdateSubtaskCompletedSuccess;

export type UpdateSubtaskCompletedSuccess = {
  __typename?: 'UpdateSubtaskCompletedSuccess';
  subtask: Subtask;
};

export type UpdateTaskInput = {
  boardColumnId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AllBoardsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBoardsQueryQuery = { __typename?: 'Query', boards: Array<(
    { __typename?: 'Board', id: string }
    & { ' $fragmentRefs'?: { 'BoardList_BoardFragmentFragment': BoardList_BoardFragmentFragment } }
  )> };

export type BoardQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type BoardQueryQuery = { __typename?: 'Query', board?: (
    { __typename?: 'Board', id: string }
    & { ' $fragmentRefs'?: { 'Header_BoardFragmentFragment': Header_BoardFragmentFragment;'BoardArea_BoardFragmentFragment': BoardArea_BoardFragmentFragment } }
  ) | null };

export type Board_BoardFragmentFragment = { __typename?: 'Board', columns: { __typename?: 'BoardColumnsConnection', nodes: Array<(
      { __typename?: 'BoardColumn', id: string }
      & { ' $fragmentRefs'?: { 'Column_BoardColumnFragmentFragment': Column_BoardColumnFragmentFragment } }
    )> } } & { ' $fragmentName'?: 'Board_BoardFragmentFragment' };

export type Column_BoardColumnFragmentFragment = { __typename?: 'BoardColumn', name: string, tasks: Array<(
    { __typename?: 'Task', id: string }
    & { ' $fragmentRefs'?: { 'TaskCard_TaskFragmentFragment': TaskCard_TaskFragmentFragment } }
  )> } & { ' $fragmentName'?: 'Column_BoardColumnFragmentFragment' };

export type BoardArea_BoardFragmentFragment = (
  { __typename?: 'Board', id: string, columns: { __typename?: 'BoardColumnsConnection', totalCount: number } }
  & { ' $fragmentRefs'?: { 'Board_BoardFragmentFragment': Board_BoardFragmentFragment;'TaskViewModal_BoardFragmentFragment': TaskViewModal_BoardFragmentFragment } }
) & { ' $fragmentName'?: 'BoardArea_BoardFragmentFragment' };

export type BoardList_BoardFragmentFragment = { __typename?: 'Board', id: string, name: string } & { ' $fragmentName'?: 'BoardList_BoardFragmentFragment' };

export type Header_BoardFragmentFragment = { __typename?: 'Board', name: string, columns: { __typename?: 'BoardColumnsConnection', totalCount: number } } & { ' $fragmentName'?: 'Header_BoardFragmentFragment' };

export type TaskCard_TaskFragmentFragment = { __typename?: 'Task', title: string, subtasks: { __typename?: 'TaskSubtasksConnection', totalCount: number, completedCount: number } } & { ' $fragmentName'?: 'TaskCard_TaskFragmentFragment' };

export type TaskQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TaskQueryQuery = { __typename?: 'Query', task?: { __typename?: 'Task', title: string, description: string, column: { __typename?: 'BoardColumn', id: string, name: string }, subtasks: { __typename?: 'TaskSubtasksConnection', totalCount: number, completedCount: number, nodes: Array<(
        { __typename?: 'Subtask' }
        & { ' $fragmentRefs'?: { 'SubtaskList_SubtaskFragmentFragment': SubtaskList_SubtaskFragmentFragment } }
      )> } } | null };

export type UpdateSubtaskCompletedMutationMutationVariables = Exact<{
  input: UpdateSubtaskCompletedInput;
}>;


export type UpdateSubtaskCompletedMutationMutation = { __typename?: 'Mutation', updateSubtaskCompleted: { __typename: 'NotFoundError', message: string } | { __typename: 'UpdateSubtaskCompletedSuccess' } };

export type UpdateTaskColumnMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  boardColumnId: Scalars['ID']['input'];
}>;


export type UpdateTaskColumnMutationMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string } };

export type TaskViewModal_BoardFragmentFragment = { __typename?: 'Board', columns: { __typename?: 'BoardColumnsConnection', nodes: Array<(
      { __typename?: 'BoardColumn' }
      & { ' $fragmentRefs'?: { 'TaskColumnSelect_BoardColumnFragmentFragment': TaskColumnSelect_BoardColumnFragmentFragment } }
    )> } } & { ' $fragmentName'?: 'TaskViewModal_BoardFragmentFragment' };

export type SubtaskList_SubtaskFragmentFragment = (
  { __typename?: 'Subtask', id: string }
  & { ' $fragmentRefs'?: { 'SubtaskListItem_SubtaskFragmentFragment': SubtaskListItem_SubtaskFragmentFragment } }
) & { ' $fragmentName'?: 'SubtaskList_SubtaskFragmentFragment' };

export type SubtaskListItem_SubtaskFragmentFragment = { __typename?: 'Subtask', id: string, title: string, completed: boolean } & { ' $fragmentName'?: 'SubtaskListItem_SubtaskFragmentFragment' };

export type TaskColumnSelect_BoardColumnFragmentFragment = { __typename?: 'BoardColumn', id: string, name: string } & { ' $fragmentName'?: 'TaskColumnSelect_BoardColumnFragmentFragment' };

export const TaskCard_TaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}}]} as unknown as DocumentNode<TaskCard_TaskFragmentFragment, unknown>;
export const Column_BoardColumnFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Column_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}}]} as unknown as DocumentNode<Column_BoardColumnFragmentFragment, unknown>;
export const Board_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Board_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Column_BoardColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Column_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}}]}}]} as unknown as DocumentNode<Board_BoardFragmentFragment, unknown>;
export const TaskColumnSelect_BoardColumnFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TaskColumnSelect_BoardColumnFragmentFragment, unknown>;
export const TaskViewModal_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskViewModal_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TaskViewModal_BoardFragmentFragment, unknown>;
export const BoardArea_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardArea_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Board_BoardFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskViewModal_BoardFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Column_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Board_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Column_BoardColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskViewModal_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"}}]}}]}}]}}]} as unknown as DocumentNode<BoardArea_BoardFragmentFragment, unknown>;
export const BoardList_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardList_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<BoardList_BoardFragmentFragment, unknown>;
export const Header_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Header_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<Header_BoardFragmentFragment, unknown>;
export const SubtaskListItem_SubtaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]} as unknown as DocumentNode<SubtaskListItem_SubtaskFragmentFragment, unknown>;
export const SubtaskList_SubtaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskList_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]} as unknown as DocumentNode<SubtaskList_SubtaskFragmentFragment, unknown>;
export const AllBoardsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllBoardsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardList_BoardFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardList_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<AllBoardsQueryQuery, AllBoardsQueryQueryVariables>;
export const BoardQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BoardQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Header_BoardFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardArea_BoardFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Column_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Board_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Column_BoardColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskViewModal_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Header_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardArea_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Board_BoardFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskViewModal_BoardFragment"}}]}}]} as unknown as DocumentNode<BoardQueryQuery, BoardQueryQueryVariables>;
export const TaskQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TaskQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubtaskList_SubtaskFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskList_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"}}]}}]} as unknown as DocumentNode<TaskQueryQuery, TaskQueryQueryVariables>;
export const UpdateSubtaskCompletedMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubtaskCompletedMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSubtaskCompletedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubtaskCompleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSubtaskCompletedMutationMutation, UpdateSubtaskCompletedMutationMutationVariables>;
export const UpdateTaskColumnMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskColumnMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardColumnId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"boardColumnId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardColumnId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskColumnMutationMutation, UpdateTaskColumnMutationMutationVariables>;