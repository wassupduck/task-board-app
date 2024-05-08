import {
  ClientError,
  GraphQLClient,
  ResponseMiddleware,
} from "graphql-request";
import { authProvider } from "./auth/auth-provider";

const responseMiddleware: ResponseMiddleware = (response) => {
  if (response instanceof ClientError && response.response.status === 401) {
    authProvider.setUser(null);
    throw new Response("Unauthorized", { status: 401 });
  }
};

export const graphQLClient = new GraphQLClient(
  import.meta.env.VITE_BACKEND_GRAPHQL_URL,
  {
    credentials: "include",
    mode: "cors",
    responseMiddleware,
  }
);
