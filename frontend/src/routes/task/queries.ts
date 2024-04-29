import request from "graphql-request";
import { graphql } from "../../gql";
import { UpdateTaskPatchInput } from "../../gql/graphql";

const taskRouteQueryDocument = graphql(`
  query TaskRoute_Query($id: ID!) {
    task(id: $id) {
      ...TaskViewModal_TaskFragment
    }
  }
`);

export const taskRouteQueryKey = (taskId: string) => ["tasks", taskId] as const;

const taskRouteQueryFn = (id: string) => () => {
  return request(
    import.meta.env.VITE_BACKEND_GRAPHQL_URL,
    taskRouteQueryDocument,
    {
      id,
    }
  );
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
  const resp = await request(
    import.meta.env.VITE_BACKEND_GRAPHQL_URL,
    updateTaskMutationDocument,
    { input: { id, patch } }
  );
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
  const resp = await request(
    import.meta.env.VITE_BACKEND_GRAPHQL_URL,
    updateSubtaskCompletedMutationDocument,
    { input: { id, completed } }
  );
  return resp.updateSubtaskCompleted;
}
