import { graphql } from "../../gql";
import { graphQLClient } from "../../graphql-client";

const boardRouteQueryDocument = graphql(`
  query BoardRoute_Query($id: ID!) {
    board(id: $id) {
      id
      columns {
        totalCount
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
