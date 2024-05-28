import { graphql } from "../../gql";
import { MoveTaskMoveInput } from "../../gql/graphql";
import { graphQLClient } from "../../graphql-client";

const boardRouteQueryDocument = graphql(`
  query BoardRoute_Query($id: ID!) {
    board(id: $id) {
      id
      columns {
        totalCount
        nodes {
          id
          tasks {
            nodes {
              id
              position
              column {
                id
              }
            }
          }
        }
      }
      ...Board_BoardFragment
      ...BoardHeader_BoardFragment
      ...EditBoardRoute_BoardFragment
      ...TaskRoute_BoardFragment
      ...NewTaskRoute_BoardFragment
      ...EditTaskRoute_BoardFragment
    }
  }
`);

export const boardRouteQueryKey = (boardId: string) =>
  ["boards", boardId] as const;

const boardRouteQueryFn = (id: string) => async () => {
  const resp = await graphQLClient.request(boardRouteQueryDocument, {
    id,
  });
  if (!resp.board) {
    throw new Response("Not found", { status: 404 });
  }
  return { board: resp.board };
};

export const boardRouteQuery = (id: string) => ({
  queryKey: boardRouteQueryKey(id),
  queryFn: boardRouteQueryFn(id),
});

const deleteBoardMutationDocument = graphql(`
  mutation DeleteBoard($input: DeleteBoardInput!) {
    deleteBoard(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function deleteBoard(id: string) {
  const resp = await graphQLClient.request(deleteBoardMutationDocument, {
    input: { id },
  });
  return resp.deleteBoard;
}

const moveTaskMutationDocument = graphql(`
  mutation MoveTask($input: MoveTaskInput!) {
    moveTask(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function moveTask(id: string, move: MoveTaskMoveInput) {
  const resp = await graphQLClient.request(moveTaskMutationDocument, {
    input: { id, move },
  });
  return resp.moveTask;
}
