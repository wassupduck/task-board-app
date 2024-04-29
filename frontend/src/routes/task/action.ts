import { ActionFunctionArgs, json } from "react-router-dom";
import invariant from "tiny-invariant";
import {
  taskRouteQueryKey,
  updateSubtaskCompleted,
  updateTask,
} from "./queries";
import { QueryClient } from "@tanstack/react-query";
import { boardRouteQueryKey } from "../board/queries";

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    invariant(params.taskId, "Missing taskId param");
    invariant(params.boardId, "Missing boardId param");
    const { taskId, boardId } = params;
    const data = await request.json();

    if (request.method === "PATCH") {
      const { intent, patch } = data;

      let resp;
      if (intent === "update-task") {
        resp = await updateTask(taskId, patch);
        if (resp.__typename !== "UpdateTaskSuccess") {
          // TODO
        }
      } else if (intent === "update-subtask-completed") {
        // TODO: Move to /subtasks/:subTaskId route?
        const { subtaskId, completed } = patch;
        resp = await updateSubtaskCompleted(subtaskId, completed);
        if (resp.__typename !== "UpdateSubtaskCompletedSuccess") {
          // TODO
        }
      }

      await queryClient.invalidateQueries({
        queryKey: taskRouteQueryKey(taskId),
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: boardRouteQueryKey(boardId),
        refetchType: "all",
      });

      return json(resp, { status: 200 });
    }
  };
