import { graphql } from "../../gql";
import { UpdateTaskSubtasksPatchInput } from "../../gql/graphql";
import { graphQLClient } from "../../graphql-client";

const editTaskRouteQueryDocument = graphql(`
  query EditTaskRoute_Query($id: ID!) {
    task(id: $id) {
      id
      title
      description
      column {
        id
      }
      subtasks {
        nodes {
          id
          title
        }
      }
    }
  }
`);

export const editTaskRouteQueryKey = (taskId: string) =>
  ["tasks", taskId, "edit"] as const;

const editTaskRouteQueryFn = (id: string) => async () => {
  const resp = await graphQLClient.request(editTaskRouteQueryDocument, {
    id,
  });
  if (!resp.task) {
    throw new Response("Not found", { status: 404 });
  }
  return { task: resp.task };
};

export const editTaskRouteQuery = (id: string) => ({
  queryKey: editTaskRouteQueryKey(id),
  queryFn: editTaskRouteQueryFn(id),
});

const updateTaskSubtasksMutationDocument = graphql(`
  mutation UpdateTaskSubtasks($input: UpdateTaskSubtasksInput!) {
    updateTaskSubtasks(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function updateTaskSubtasks(
  taskId: string,
  patch: UpdateTaskSubtasksPatchInput
) {
  const resp = await graphQLClient.request(updateTaskSubtasksMutationDocument, {
    input: { taskId, patch },
  });
  return resp.updateTaskSubtasks;
}
