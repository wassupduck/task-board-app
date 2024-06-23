import { graphql } from "../../gql";
import { NewTaskInput } from "../../gql/graphql";
import { graphQLClient } from "../../graphql-client";

const createTaskMutationDocument = graphql(`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function createTask(task: NewTaskInput) {
  const resp = await graphQLClient.request(createTaskMutationDocument, {
    input: { task },
  });
  return resp.createTask;
}
