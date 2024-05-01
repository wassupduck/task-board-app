import request from "graphql-request";
import { graphql } from "../../gql";

const boardRouteQueryDocument = graphql(`
  query BoardRoute_Query($id: ID!) {
    board(id: $id) {
      id
      columns {
        totalCount
      }
      ...Board_BoardFragment
      ...BoardHeader_BoardFragment
      ...TaskViewModal_BoardFragment
      ...EditBoardRoute_BoardFragment
    }
  }
`);

export const boardRouteQueryKey = (boardId: string) =>
  ["boards", boardId] as const;

const boardRouteQueryFn = (id: string) => () =>
  request(import.meta.env.VITE_BACKEND_GRAPHQL_URL, boardRouteQueryDocument, {
    id,
  });

export const boardRouteQuery = (id: string) => ({
  queryKey: boardRouteQueryKey(id),
  queryFn: boardRouteQueryFn(id),
});
