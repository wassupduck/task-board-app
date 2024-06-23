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

export type AddTaskSubtaskInput = {
  subtask: NewSubtaskInput;
};

export type Board = {
  __typename?: 'Board';
  columns: BoardColumnsConnection;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardColumn = {
  __typename?: 'BoardColumn';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  tasks: BoardColumnTasksConnection;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardColumnNameConflictError = ErrorResponse & {
  __typename?: 'BoardColumnNameConflictError';
  message: Scalars['String']['output'];
};

export type BoardColumnNotFoundError = ErrorResponse & {
  __typename?: 'BoardColumnNotFoundError';
  message: Scalars['String']['output'];
};

export type BoardColumnTasksConnection = {
  __typename?: 'BoardColumnTasksConnection';
  nodes: Array<Task>;
  totalCount: Scalars['Int']['output'];
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
  task: NewTaskInput;
};

export type CreateTaskResponse = BoardColumnNotFoundError | CreateTaskSuccess | InvalidInputError;

export type CreateTaskSuccess = {
  __typename?: 'CreateTaskSuccess';
  task: Task;
};

export type DeleteBoardInput = {
  id: Scalars['ID']['input'];
};

export type DeleteBoardResponse = DeleteBoardSuccess | NotFoundError;

export type DeleteBoardSuccess = {
  __typename?: 'DeleteBoardSuccess';
  deletedId: Scalars['ID']['output'];
};

export type DeleteTaskInput = {
  id: Scalars['ID']['input'];
};

export type DeleteTaskResponse = DeleteTaskSuccess | NotFoundError;

export type DeleteTaskSuccess = {
  __typename?: 'DeleteTaskSuccess';
  deletedId: Scalars['ID']['output'];
};

export type ErrorResponse = {
  message: Scalars['String']['output'];
};

export type InvalidInputError = ErrorResponse & {
  __typename?: 'InvalidInputError';
  message: Scalars['String']['output'];
};

export type LoginCredentialsInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginInput = {
  credentials: LoginCredentialsInput;
};

export type LoginResponse = LoginSuccess | UnauthorizedError;

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  user: User;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  success: Scalars['Boolean']['output'];
};

export type MoveTaskInput = {
  id: Scalars['ID']['input'];
  move: MoveTaskMoveInput;
};

export type MoveTaskMoveDestinationInput = {
  boardColumnId?: InputMaybe<Scalars['ID']['input']>;
  positionAfter?: InputMaybe<Scalars['String']['input']>;
};

export type MoveTaskMoveInput = {
  to: MoveTaskMoveDestinationInput;
};

export type MoveTaskResponse = BoardColumnNotFoundError | InvalidInputError | MoveTaskSuccess | NotFoundError;

export type MoveTaskSuccess = {
  __typename?: 'MoveTaskSuccess';
  task: Task;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: CreateBoardResponse;
  createTask: CreateTaskResponse;
  deleteBoard: DeleteBoardResponse;
  deleteTask: DeleteTaskResponse;
  login: LoginResponse;
  logout: LogoutResponse;
  moveTask: MoveTaskResponse;
  signup: SignupResponse;
  updateBoard: UpdateBoardResponse;
  updateBoardColumns: UpdateBoardColumnsResponse;
  updateSubtaskCompleted: UpdateSubtaskCompletedResponse;
  updateTask: UpdateTaskResponse;
  updateTaskSubtasks: UpdateTaskSubtasksResponse;
};


export type MutationCreateBoardArgs = {
  input: CreateBoardInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteBoardArgs = {
  input: DeleteBoardInput;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMoveTaskArgs = {
  input: MoveTaskInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
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
  input: UpdateTaskInput;
};


export type MutationUpdateTaskSubtasksArgs = {
  input: UpdateTaskSubtasksInput;
};

export type NewBoardColumnInput = {
  name: Scalars['String']['input'];
};

export type NewBoardInput = {
  columns?: InputMaybe<Array<NewBoardColumnInput>>;
  name: Scalars['String']['input'];
};

export type NewSubtaskInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type NewTaskInput = {
  boardColumnId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  subtasks?: InputMaybe<Array<NewSubtaskInput>>;
  title: Scalars['String']['input'];
};

export type NewUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
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
  viewer: User;
};


export type QueryBoardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};

export type SignupInput = {
  user: NewUserInput;
};

export type SignupResponse = InvalidInputError | SignupSuccess | UserUsernameConflictError;

export type SignupSuccess = {
  __typename?: 'SignupSuccess';
  user: User;
};

export type Subtask = {
  __typename?: 'Subtask';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SubtaskTitleConflictError = ErrorResponse & {
  __typename?: 'SubtaskTitleConflictError';
  message: Scalars['String']['output'];
};

export type Task = {
  __typename?: 'Task';
  column: BoardColumn;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['String']['output'];
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

export type UnauthorizedError = ErrorResponse & {
  __typename?: 'UnauthorizedError';
  message: Scalars['String']['output'];
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
  id: Scalars['ID']['input'];
  patch: UpdateTaskPatchInput;
};

export type UpdateTaskPatchInput = {
  boardColumnId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskResponse = BoardColumnNotFoundError | NotFoundError | UpdateTaskSuccess;

export type UpdateTaskSubtaskInput = {
  id: Scalars['ID']['input'];
  patch: UpdateTaskSubtaskPatchInput;
};

export type UpdateTaskSubtaskPatchInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskSubtasksInput = {
  patch: UpdateTaskSubtasksPatchInput;
  taskId: Scalars['ID']['input'];
};

export type UpdateTaskSubtasksPatchInput = {
  additions?: InputMaybe<Array<AddTaskSubtaskInput>>;
  deletions?: InputMaybe<Array<Scalars['ID']['input']>>;
  updates?: InputMaybe<Array<UpdateTaskSubtaskInput>>;
};

export type UpdateTaskSubtasksResponse = InvalidInputError | NotFoundError | SubtaskTitleConflictError | UpdateTaskSubtasksSuccess;

export type UpdateTaskSubtasksSuccess = {
  __typename?: 'UpdateTaskSubtasksSuccess';
  task: Task;
};

export type UpdateTaskSuccess = {
  __typename?: 'UpdateTaskSuccess';
  task: Task;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserUsernameConflictError = ErrorResponse & {
  __typename?: 'UserUsernameConflictError';
  message: Scalars['String']['output'];
};

export type AuthProvider_UserFragmentFragment = { __typename?: 'User', id: string, username: string } & { ' $fragmentName'?: 'AuthProvider_UserFragmentFragment' };

export type Viewer_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Viewer_QueryQuery = { __typename?: 'Query', viewer: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'AuthProvider_UserFragmentFragment': AuthProvider_UserFragmentFragment } }
  ) };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'LoginSuccess', user: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'AuthProvider_UserFragmentFragment': AuthProvider_UserFragmentFragment } }
    ) } | { __typename: 'UnauthorizedError', message: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', success: boolean } };

export type Board_BoardFragmentFragment = { __typename?: 'Board', columns: { __typename?: 'BoardColumnsConnection', nodes: Array<(
      { __typename?: 'BoardColumn', id: string, tasks: { __typename?: 'BoardColumnTasksConnection', nodes: Array<(
          { __typename?: 'Task', id: string, column: { __typename?: 'BoardColumn', id: string } }
          & { ' $fragmentRefs'?: { 'TaskCard_TaskFragmentFragment': TaskCard_TaskFragmentFragment } }
        )> } }
      & { ' $fragmentRefs'?: { 'Column_BoardColumnFragmentFragment': Column_BoardColumnFragmentFragment } }
    )> } } & { ' $fragmentName'?: 'Board_BoardFragmentFragment' };

export type Column_BoardColumnFragmentFragment = { __typename?: 'BoardColumn', id: string, name: string, tasks: { __typename?: 'BoardColumnTasksConnection', totalCount: number, nodes: Array<(
      { __typename?: 'Task', id: string }
      & { ' $fragmentRefs'?: { 'SortableTaskCard_TaskFragmentFragment': SortableTaskCard_TaskFragmentFragment } }
    )> } } & { ' $fragmentName'?: 'Column_BoardColumnFragmentFragment' };

export type BoardNav_QueryFragmentFragment = { __typename?: 'Query', boards: Array<{ __typename?: 'Board', id: string, name: string }> } & { ' $fragmentName'?: 'BoardNav_QueryFragmentFragment' };

export type BoardHeader_QueryFragmentFragment = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'MobileMenu_QueryFragmentFragment': MobileMenu_QueryFragmentFragment } }
) & { ' $fragmentName'?: 'BoardHeader_QueryFragmentFragment' };

export type BoardHeader_BoardFragmentFragment = { __typename?: 'Board', id: string, name: string, columns: { __typename?: 'BoardColumnsConnection', totalCount: number } } & { ' $fragmentName'?: 'BoardHeader_BoardFragmentFragment' };

export type Header_QueryFragmentFragment = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'MobileMenu_QueryFragmentFragment': MobileMenu_QueryFragmentFragment;'BoardHeader_QueryFragmentFragment': BoardHeader_QueryFragmentFragment } }
) & { ' $fragmentName'?: 'Header_QueryFragmentFragment' };

export type MobileMenu_QueryFragmentFragment = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'BoardNav_QueryFragmentFragment': BoardNav_QueryFragmentFragment } }
) & { ' $fragmentName'?: 'MobileMenu_QueryFragmentFragment' };

export type Sidebar_QueryFragmentFragment = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'BoardNav_QueryFragmentFragment': BoardNav_QueryFragmentFragment } }
) & { ' $fragmentName'?: 'Sidebar_QueryFragmentFragment' };

export type SortableTaskCard_TaskFragmentFragment = (
  { __typename?: 'Task', id: string }
  & { ' $fragmentRefs'?: { 'TaskCard_TaskFragmentFragment': TaskCard_TaskFragmentFragment } }
) & { ' $fragmentName'?: 'SortableTaskCard_TaskFragmentFragment' };

export type TaskCard_TaskFragmentFragment = { __typename?: 'Task', title: string, subtasks: { __typename?: 'TaskSubtasksConnection', totalCount: number, completedCount: number } } & { ' $fragmentName'?: 'TaskCard_TaskFragmentFragment' };

export type TaskForm_BoardFragmentFragment = { __typename?: 'Board', columns: { __typename?: 'BoardColumnsConnection', nodes: Array<{ __typename?: 'BoardColumn', id: string, name: string }> } } & { ' $fragmentName'?: 'TaskForm_BoardFragmentFragment' };

export type EditBoardRoute_BoardFragmentFragment = { __typename?: 'Board', id: string, name: string, columns: { __typename?: 'BoardColumnsConnection', nodes: Array<{ __typename?: 'BoardColumn', id: string, name: string }> } } & { ' $fragmentName'?: 'EditBoardRoute_BoardFragmentFragment' };

export type UpdateBoardMutationVariables = Exact<{
  input: UpdateBoardInput;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename: 'BoardNameConflictError', message: string } | { __typename: 'InvalidInputError', message: string } | { __typename: 'NotFoundError', message: string } | { __typename: 'UpdateBoardSuccess' } };

export type UpdateBoardColumnsMutationVariables = Exact<{
  input: UpdateBoardColumnsInput;
}>;


export type UpdateBoardColumnsMutation = { __typename?: 'Mutation', updateBoardColumns: { __typename: 'BoardColumnNameConflictError', message: string } | { __typename: 'InvalidInputError', message: string } | { __typename: 'NotFoundError', message: string } | { __typename: 'UpdateBoardColumnsSuccess' } };

export type BoardRoute_QueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type BoardRoute_QueryQuery = { __typename?: 'Query', board?: (
    { __typename?: 'Board', id: string, columns: { __typename?: 'BoardColumnsConnection', totalCount: number, nodes: Array<{ __typename?: 'BoardColumn', id: string, tasks: { __typename?: 'BoardColumnTasksConnection', nodes: Array<{ __typename?: 'Task', id: string, position: string, column: { __typename?: 'BoardColumn', id: string } }> } }> } }
    & { ' $fragmentRefs'?: { 'Board_BoardFragmentFragment': Board_BoardFragmentFragment;'BoardHeader_BoardFragmentFragment': BoardHeader_BoardFragmentFragment;'EditBoardRoute_BoardFragmentFragment': EditBoardRoute_BoardFragmentFragment;'TaskRoute_BoardFragmentFragment': TaskRoute_BoardFragmentFragment;'NewTaskRoute_BoardFragmentFragment': NewTaskRoute_BoardFragmentFragment;'EditTaskRoute_BoardFragmentFragment': EditTaskRoute_BoardFragmentFragment } }
  ) | null };

export type DeleteBoardMutationVariables = Exact<{
  input: DeleteBoardInput;
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: { __typename: 'DeleteBoardSuccess' } | { __typename: 'NotFoundError', message: string } };

export type MoveTaskMutationVariables = Exact<{
  input: MoveTaskInput;
}>;


export type MoveTaskMutation = { __typename?: 'Mutation', moveTask: { __typename: 'BoardColumnNotFoundError', message: string } | { __typename: 'InvalidInputError', message: string } | { __typename: 'MoveTaskSuccess' } | { __typename: 'NotFoundError', message: string } };

export type CreateBoardMutationVariables = Exact<{
  input: CreateBoardInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename: 'BoardNameConflictError', message: string } | { __typename: 'CreateBoardSuccess', board: { __typename?: 'Board', id: string } } | { __typename: 'InvalidInputError', message: string } };

export type RootRoute_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type RootRoute_QueryQuery = (
  { __typename?: 'Query', boards: Array<{ __typename?: 'Board', id: string }> }
  & { ' $fragmentRefs'?: { 'Header_QueryFragmentFragment': Header_QueryFragmentFragment;'Sidebar_QueryFragmentFragment': Sidebar_QueryFragmentFragment } }
);

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename: 'InvalidInputError', message: string } | { __typename: 'SignupSuccess', user: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'AuthProvider_UserFragmentFragment': AuthProvider_UserFragmentFragment } }
    ) } | { __typename: 'UserUsernameConflictError', message: string } };

export type EditTaskRoute_BoardFragmentFragment = (
  { __typename?: 'Board' }
  & { ' $fragmentRefs'?: { 'TaskForm_BoardFragmentFragment': TaskForm_BoardFragmentFragment } }
) & { ' $fragmentName'?: 'EditTaskRoute_BoardFragmentFragment' };

export type EditTaskRoute_QueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EditTaskRoute_QueryQuery = { __typename?: 'Query', task?: { __typename?: 'Task', id: string, title: string, description: string, column: { __typename?: 'BoardColumn', id: string }, subtasks: { __typename?: 'TaskSubtasksConnection', nodes: Array<{ __typename?: 'Subtask', id: string, title: string }> } } | null };

export type UpdateTaskSubtasksMutationVariables = Exact<{
  input: UpdateTaskSubtasksInput;
}>;


export type UpdateTaskSubtasksMutation = { __typename?: 'Mutation', updateTaskSubtasks: { __typename: 'InvalidInputError', message: string } | { __typename: 'NotFoundError', message: string } | { __typename: 'SubtaskTitleConflictError', message: string } | { __typename: 'UpdateTaskSubtasksSuccess' } };

export type SubtaskList_SubtaskFragmentFragment = (
  { __typename?: 'Subtask', id: string }
  & { ' $fragmentRefs'?: { 'SubtaskListItem_SubtaskFragmentFragment': SubtaskListItem_SubtaskFragmentFragment } }
) & { ' $fragmentName'?: 'SubtaskList_SubtaskFragmentFragment' };

export type SubtaskListItem_SubtaskFragmentFragment = { __typename?: 'Subtask', id: string, title: string, completed: boolean } & { ' $fragmentName'?: 'SubtaskListItem_SubtaskFragmentFragment' };

export type TaskRoute_BoardFragmentFragment = { __typename?: 'Board', columns: { __typename?: 'BoardColumnsConnection', nodes: Array<(
      { __typename?: 'BoardColumn' }
      & { ' $fragmentRefs'?: { 'TaskColumnSelect_BoardColumnFragmentFragment': TaskColumnSelect_BoardColumnFragmentFragment } }
    )> } } & { ' $fragmentName'?: 'TaskRoute_BoardFragmentFragment' };

export type TaskColumnSelect_BoardColumnFragmentFragment = { __typename?: 'BoardColumn', id: string, name: string } & { ' $fragmentName'?: 'TaskColumnSelect_BoardColumnFragmentFragment' };

export type TaskRoute_QueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TaskRoute_QueryQuery = { __typename?: 'Query', task?: { __typename?: 'Task', id: string, title: string, description: string, column: { __typename?: 'BoardColumn', id: string, name: string }, subtasks: { __typename?: 'TaskSubtasksConnection', totalCount: number, completedCount: number, nodes: Array<(
        { __typename?: 'Subtask' }
        & { ' $fragmentRefs'?: { 'SubtaskList_SubtaskFragmentFragment': SubtaskList_SubtaskFragmentFragment } }
      )> } } | null };

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename: 'BoardColumnNotFoundError', message: string } | { __typename: 'NotFoundError', message: string } | { __typename: 'UpdateTaskSuccess' } };

export type UpdateSubtaskCompletedMutationVariables = Exact<{
  input: UpdateSubtaskCompletedInput;
}>;


export type UpdateSubtaskCompletedMutation = { __typename?: 'Mutation', updateSubtaskCompleted: { __typename: 'NotFoundError', message: string } | { __typename: 'UpdateSubtaskCompletedSuccess' } };

export type DeleteTaskMutationVariables = Exact<{
  input: DeleteTaskInput;
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename: 'DeleteTaskSuccess' } | { __typename: 'NotFoundError', message: string } };

export type NewTaskRoute_BoardFragmentFragment = (
  { __typename?: 'Board', columns: { __typename?: 'BoardColumnsConnection', nodes: Array<{ __typename?: 'BoardColumn', id: string }> } }
  & { ' $fragmentRefs'?: { 'TaskForm_BoardFragmentFragment': TaskForm_BoardFragmentFragment } }
) & { ' $fragmentName'?: 'NewTaskRoute_BoardFragmentFragment' };

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename: 'BoardColumnNotFoundError', message: string } | { __typename: 'CreateTaskSuccess' } | { __typename: 'InvalidInputError', message: string } };

export const AuthProvider_UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthProvider_UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<AuthProvider_UserFragmentFragment, unknown>;
export const TaskCard_TaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}}]} as unknown as DocumentNode<TaskCard_TaskFragmentFragment, unknown>;
export const SortableTaskCard_TaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SortableTaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}}]} as unknown as DocumentNode<SortableTaskCard_TaskFragmentFragment, unknown>;
export const Column_BoardColumnFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Column_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SortableTaskCard_TaskFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SortableTaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}}]} as unknown as DocumentNode<Column_BoardColumnFragmentFragment, unknown>;
export const Board_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Board_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Column_BoardColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SortableTaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Column_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SortableTaskCard_TaskFragment"}}]}}]}}]}}]} as unknown as DocumentNode<Board_BoardFragmentFragment, unknown>;
export const BoardHeader_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardHeader_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<BoardHeader_BoardFragmentFragment, unknown>;
export const BoardNav_QueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardNav_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<BoardNav_QueryFragmentFragment, unknown>;
export const MobileMenu_QueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MobileMenu_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardNav_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardNav_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MobileMenu_QueryFragmentFragment, unknown>;
export const BoardHeader_QueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardHeader_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MobileMenu_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardNav_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MobileMenu_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardNav_QueryFragment"}}]}}]} as unknown as DocumentNode<BoardHeader_QueryFragmentFragment, unknown>;
export const Header_QueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Header_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MobileMenu_QueryFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardHeader_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardNav_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MobileMenu_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardNav_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardHeader_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MobileMenu_QueryFragment"}}]}}]} as unknown as DocumentNode<Header_QueryFragmentFragment, unknown>;
export const Sidebar_QueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Sidebar_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardNav_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardNav_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<Sidebar_QueryFragmentFragment, unknown>;
export const EditBoardRoute_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditBoardRoute_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<EditBoardRoute_BoardFragmentFragment, unknown>;
export const TaskForm_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForm_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<TaskForm_BoardFragmentFragment, unknown>;
export const EditTaskRoute_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditTaskRoute_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForm_BoardFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForm_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<EditTaskRoute_BoardFragmentFragment, unknown>;
export const SubtaskListItem_SubtaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]} as unknown as DocumentNode<SubtaskListItem_SubtaskFragmentFragment, unknown>;
export const SubtaskList_SubtaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskList_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]} as unknown as DocumentNode<SubtaskList_SubtaskFragmentFragment, unknown>;
export const TaskColumnSelect_BoardColumnFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TaskColumnSelect_BoardColumnFragmentFragment, unknown>;
export const TaskRoute_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskRoute_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TaskRoute_BoardFragmentFragment, unknown>;
export const NewTaskRoute_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewTaskRoute_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForm_BoardFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForm_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<NewTaskRoute_BoardFragmentFragment, unknown>;
export const Viewer_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Viewer_Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthProvider_UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthProvider_UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<Viewer_QueryQuery, Viewer_QueryQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoginSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthProvider_UserFragment"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UnauthorizedError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthProvider_UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const UpdateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const UpdateBoardColumnsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBoardColumns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardColumnsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoardColumns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBoardColumnsMutation, UpdateBoardColumnsMutationVariables>;
export const BoardRoute_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BoardRoute_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Board_BoardFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardHeader_BoardFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditBoardRoute_BoardFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskRoute_BoardFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NewTaskRoute_BoardFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditTaskRoute_BoardFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SortableTaskCard_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Column_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SortableTaskCard_TaskFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardColumn"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForm_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Board_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskCard_TaskFragment"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Column_BoardColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardHeader_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditBoardRoute_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskRoute_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskColumnSelect_BoardColumnFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewTaskRoute_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForm_BoardFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditTaskRoute_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForm_BoardFragment"}}]}}]} as unknown as DocumentNode<BoardRoute_QueryQuery, BoardRoute_QueryQueryVariables>;
export const DeleteBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const MoveTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MoveTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<MoveTaskMutation, MoveTaskMutationVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const RootRoute_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RootRoute_Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Header_QueryFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Sidebar_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardNav_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MobileMenu_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardNav_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardHeader_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MobileMenu_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Header_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MobileMenu_QueryFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardHeader_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Sidebar_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardNav_QueryFragment"}}]}}]} as unknown as DocumentNode<RootRoute_QueryQuery, RootRoute_QueryQueryVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SignupSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthProvider_UserFragment"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthProvider_UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const EditTaskRoute_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditTaskRoute_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EditTaskRoute_QueryQuery, EditTaskRoute_QueryQueryVariables>;
export const UpdateTaskSubtasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskSubtasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskSubtasksInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskSubtasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskSubtasksMutation, UpdateTaskSubtasksMutationVariables>;
export const TaskRoute_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TaskRoute_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubtaskList_SubtaskFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubtaskList_SubtaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subtask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubtaskListItem_SubtaskFragment"}}]}}]} as unknown as DocumentNode<TaskRoute_QueryQuery, TaskRoute_QueryQueryVariables>;
export const UpdateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UpdateSubtaskCompletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubtaskCompleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSubtaskCompletedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubtaskCompleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSubtaskCompletedMutation, UpdateSubtaskCompletedMutationVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ErrorResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;