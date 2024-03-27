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
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  boards: Array<Board>;
  hello: Scalars['String']['output'];
};

export type AllBoardsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBoardsQueryQuery = { __typename?: 'Query', boards: Array<(
    { __typename?: 'Board', id: string }
    & { ' $fragmentRefs'?: { 'BoardList_BoardFragmentFragment': BoardList_BoardFragmentFragment;'Header_BoardFragmentFragment': Header_BoardFragmentFragment } }
  )> };

export type BoardList_BoardFragmentFragment = { __typename?: 'Board', id: string, name: string } & { ' $fragmentName'?: 'BoardList_BoardFragmentFragment' };

export type Header_BoardFragmentFragment = { __typename?: 'Board', name: string } & { ' $fragmentName'?: 'Header_BoardFragmentFragment' };

export const BoardList_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardList_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<BoardList_BoardFragmentFragment, unknown>;
export const Header_BoardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Header_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<Header_BoardFragmentFragment, unknown>;
export const AllBoardsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allBoardsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardList_BoardFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Header_BoardFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardList_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Header_BoardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<AllBoardsQueryQuery, AllBoardsQueryQueryVariables>;