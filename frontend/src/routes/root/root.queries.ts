import { graphql } from "../../gql";
import { graphQLClient } from "../../graphql-client";

const rootRouteQueryDocument = graphql(`
  query RootRoute_Query {
    boards {
      id
    }
    ...Header_QueryFragment
    ...Sidebar_QueryFragment
  }
`);

export const rootRouteQueryKey = ["root"] as const;

const rootRouteQueryFn = async () => {
  return await graphQLClient.request(rootRouteQueryDocument);
};

export const rootRouteQuery = {
  queryKey: rootRouteQueryKey,
  queryFn: rootRouteQueryFn,
};
