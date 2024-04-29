import request from "graphql-request";
import { graphql } from "../../gql";
import { NewBoardInput } from "../../gql/graphql";

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
  const resp = await request(
    import.meta.env.VITE_BACKEND_GRAPHQL_URL,
    createBoardMutationDocument,
    { input: { board } }
  );
  return resp.createBoard;
}
