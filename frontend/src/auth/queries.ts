import { ClientError, GraphQLClient } from "graphql-request";
import { graphql } from "../gql";
import { LoginCredentialsInput } from "../gql/graphql";

export const graphQLClient = new GraphQLClient(
  import.meta.env.VITE_BACKEND_GRAPHQL_URL,
  {
    credentials: "include",
    mode: "cors",
  }
);

const viewerQueryDocument = graphql(`
  query Viewer_Query {
    viewer {
      ...AuthProvider_UserFragment
    }
  }
`);

export async function viewer() {
  let resp;
  try {
    resp = await graphQLClient.request(viewerQueryDocument);
  } catch (error) {
    if (error instanceof ClientError && error.response.status === 401) {
      return null;
    }
    throw error;
  }
  return resp;
}

const loginMutationDocument = graphql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      __typename
      ... on LoginSuccess {
        user {
          ...AuthProvider_UserFragment
        }
      }
      ... on UnauthorizedError {
        message
      }
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function login(credentials: LoginCredentialsInput) {
  const resp = await graphQLClient.request(loginMutationDocument, {
    input: { credentials },
  });
  return resp.login;
}

const logoutMutationDocument = graphql(`
  mutation Logout {
    logout {
      success
    }
  }
`);

export async function logout() {
  await graphQLClient.request(logoutMutationDocument);
}
