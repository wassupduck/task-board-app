import request from "graphql-request";
import { graphql } from "../../gql";

const rootRouteQueryDocument = graphql(`
  query RootRoute_Query {
    boards {
      id
    }
    ...Sidebar_QueryFragment
  }
`);

export const rootRouteQueryKey = ["root"] as const;

const rootRouteQueryFn = () => {
  return request(
    import.meta.env.VITE_BACKEND_GRAPHQL_URL,
    rootRouteQueryDocument
  );
};

export const rootRouteQuery = {
  queryKey: rootRouteQueryKey,
  queryFn: rootRouteQueryFn,
};
