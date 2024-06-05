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
      const data = await request.json();
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
      });
      await queryClient.invalidateQueries({
        queryKey: boardRouteQueryKey(boardId),
      });

      return json(resp, { status: 200 });
    }
  };
