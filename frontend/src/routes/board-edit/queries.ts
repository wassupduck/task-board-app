import { graphql } from "../../gql";
import {
  UpdateBoardColumnsPatchInput,
  UpdateBoardPatchInput,
} from "../../gql/graphql";
import { graphQLClient } from "../../graphql-client";

const updateBoardMutationDocument = graphql(`
  mutation UpdateBoard($input: UpdateBoardInput!) {
    updateBoard(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function updateBoard(id: string, patch: UpdateBoardPatchInput) {
  const resp = await graphQLClient.request(updateBoardMutationDocument, {
    input: { id, patch },
  });
  return resp.updateBoard;
}

const updateBoardColumnsMutationDocument = graphql(`
  mutation UpdateBoardColumns($input: UpdateBoardColumnsInput!) {
    updateBoardColumns(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function updateBoardColumns(
  boardId: string,
  patch: UpdateBoardColumnsPatchInput
) {
  const resp = await graphQLClient.request(updateBoardColumnsMutationDocument, {
    input: { boardId, patch },
  });
  return resp.updateBoardColumns;
}
