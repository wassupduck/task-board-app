import { graphql } from "../../gql";
import { NewBoardInput } from "../../gql/graphql";
import { graphQLClient } from "../../graphql-client";

const createBoardMutationDocument = graphql(`
  mutation CreateBoard($input: CreateBoardInput!) {
    createBoard(input: $input) {
      __typename
      ... on CreateBoardSuccess {
        board {
          id
        }
      }
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function createBoard(board: NewBoardInput) {
  const resp = await graphQLClient.request(createBoardMutationDocument, {
    input: { board },
  });
  return resp.createBoard;
}
