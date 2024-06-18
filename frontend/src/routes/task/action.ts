import { ActionFunctionArgs, json, redirect } from "react-router-dom";
import invariant from "tiny-invariant";
import {
  deleteTask,
  taskRouteQueryKey,
  updateSubtaskCompleted,
  updateTask,
} from "./queries";
import { QueryClient } from "@tanstack/react-query";
import { boardRouteQueryKey } from "../board/queries";
import { UpdateTaskPatchInput } from "../../gql/graphql";

type ActionPatchRequestUpdateTask = {
  operation: "update-task";
  patch: UpdateTaskPatchInput;
};
type ActionPatchRequestUpdateSubtaskCompleted = {
  operation: "update-subtask-completed";
  patch: {
    id: string;
    completed: boolean;
  };
};
export type ActionPatchRequestJson =
  | ActionPatchRequestUpdateTask
  | ActionPatchRequestUpdateSubtaskCompleted;

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    invariant(params.taskId, "Missing taskId param");
    invariant(params.boardId, "Missing boardId param");
    const { taskId, boardId } = params;

    if (request.method === "DELETE") {
      const resp = await deleteTask(taskId);

      if (resp.__typename === "NotFoundError") {
        throw new Response("Not found", { status: 404 });
      }

      await queryClient.invalidateQueries({
        queryKey: boardRouteQueryKey(boardId),
      });

      return redirect(`/boards/${boardId}`);
    }

    if (request.method === "PATCH") {
      const data = (await request.json()) as ActionPatchRequestJson;
      const { operation, patch } = data;

      let resp;
      if (operation === "update-task") {
        resp = await updateTask(taskId, patch);
        if (resp.__typename !== "UpdateTaskSuccess") {
          // TODO
        }
      } else if (operation === "update-subtask-completed") {
        // TODO: Move to /subtasks/:subTaskId route?
        const { id, completed } = patch;
        resp = await updateSubtaskCompleted(id, completed);
        if (resp.__typename !== "UpdateSubtaskCompletedSuccess") {
          // TODO
        }
      }

      await queryClient.invalidateQueries({
        queryKey: taskRouteQueryKey(taskId),
      });
      await queryClient.invalidateQueries({
        queryKey: boardRouteQueryKey(boardId),
      });

      return json(resp, { status: 200 });
    }
  };
