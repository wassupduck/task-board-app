import { graphql } from "../../gql";
import { NewUserInput } from "../../gql/graphql";
import { graphQLClient } from "../../graphql-client";

const signupMutationDocument = graphql(`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      __typename
      ... on SignupSuccess {
        user {
          ...AuthProvider_UserFragment
        }
      }
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function signup(user: NewUserInput) {
  const resp = await graphQLClient.request(signupMutationDocument, {
    input: { user },
  });
  return resp.signup;
}
