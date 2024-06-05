import { graphql } from "../../gql";
import { UpdateTaskPatchInput } from "../../gql/graphql";
import { graphQLClient } from "../../graphql-client";

const taskRouteQueryDocument = graphql(`
  query TaskRoute_Query($id: ID!) {
    task(id: $id) {
      id
      title
      description
      column {
        id
        name
      }
      subtasks {
        totalCount
        completedCount
        nodes {
          ...SubtaskList_SubtaskFragment
        }
      }
    }
  }
`);

export const taskRouteQueryKey = (taskId: string) => ["tasks", taskId] as const;

const taskRouteQueryFn = (id: string) => async () => {
  const resp = await graphQLClient.request(taskRouteQueryDocument, {
    id,
  });
  if (!resp.task) {
    throw new Response("Not found", { status: 404 });
  }
  return { task: resp.task };
};

export const taskRouteQuery = (id: string) => ({
  queryKey: taskRouteQueryKey(id),
  queryFn: taskRouteQueryFn(id),
});

const updateTaskMutationDocument = graphql(`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function updateTask(id: string, patch: UpdateTaskPatchInput) {
  const resp = await graphQLClient.request(updateTaskMutationDocument, {
    input: { id, patch },
  });
  return resp.updateTask;
}

const updateSubtaskCompletedMutationDocument = graphql(`
  mutation UpdateSubtaskCompleted($input: UpdateSubtaskCompletedInput!) {
    updateSubtaskCompleted(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function updateSubtaskCompleted(id: string, completed: boolean) {
  const resp = await graphQLClient.request(
    updateSubtaskCompletedMutationDocument,
    { input: { id, completed } }
  );
  return resp.updateSubtaskCompleted;
}

const deleteTaskMutationDocument = graphql(`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

export async function deleteTask(id: string) {
  const resp = await graphQLClient.request(deleteTaskMutationDocument, {
    input: { id },
  });
  return resp.deleteTask;
}
