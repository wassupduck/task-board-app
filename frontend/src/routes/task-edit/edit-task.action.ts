import { ActionFunctionArgs, redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { boardRouteQueryKey } from "../board";
import {
  UpdateTaskPatchInput,
  UpdateTaskSubtasksPatchInput,
} from "../../gql/graphql";
import { taskRouteQueryKey } from "../task";
import { updateTask } from "../task/task.queries";
import { updateTaskSubtasks } from "./edit-task.queries";

export type ActionRequestJson = {
  task?: UpdateTaskPatchInput;
  subtasks?: UpdateTaskSubtasksPatchInput;
};
export type ActionData = Awaited<ReturnType<ReturnType<typeof action>>>;

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    invariant(params.boardId, "Missing boardId param");
    invariant(params.taskId, "Missing taskId param");
    const { taskId, boardId } = params;

    const data = (await request.json()) as ActionRequestJson;

    if (data.task) {
      const resp = await updateTask(taskId, data.task);
      if (resp.__typename !== "UpdateTaskSuccess") {
        if (resp.__typename === "NotFoundError") {
          throw new Response("Not found", { status: 404 });
        }
        throw resp;
      }
    }

    if (data.subtasks) {
      const resp = await updateTaskSubtasks(taskId, data.subtasks);
      if (resp.__typename !== "UpdateTaskSubtasksSuccess") {
        if (resp.__typename === "NotFoundError") {
          throw new Response("Not found", { status: 404 });
        }
        throw resp;
      }
    }

    if (data.task !== undefined || data.subtasks !== undefined) {
      await queryClient.invalidateQueries({
        queryKey: boardRouteQueryKey(boardId),
      });
      await queryClient.refetchQueries({
        queryKey: taskRouteQueryKey(taskId),
      });
    }

    return redirect(`/boards/${boardId}/tasks/${taskId}`);
  };
