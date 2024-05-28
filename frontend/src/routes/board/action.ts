import { ActionFunctionArgs, redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { rootRouteQueryKey } from "../root/queries";
import invariant from "tiny-invariant";
import { boardRouteQueryKey, deleteBoard, moveTask } from "./queries";

export type ActionPostRequestMoveTaskOperationJson = {
  operation: "move-task";
  taskId: string;
  boardColumnId: string;
  positionAfter: string;
};
export type ActionPostRequestJson = ActionPostRequestMoveTaskOperationJson;
export type ActionData = Awaited<ReturnType<ReturnType<typeof action>>>;

export const action =
  (queryClient: QueryClient) =>
  async ({ params, request }: ActionFunctionArgs) => {
    invariant(params.boardId, "Missing boardId param");
    const { boardId } = params;

    if (request.method === "DELETE") {
      const resp = await deleteBoard(boardId);

      if (resp.__typename === "NotFoundError") {
        throw new Response("Not found", { status: 404 });
      }

      await queryClient.invalidateQueries({
        queryKey: rootRouteQueryKey,
      });

      return redirect("/");
    } else if (request.method === "POST") {
      const data = (await request.json()) as ActionPostRequestJson;
      if (data.operation === "move-task") {
        const { taskId, boardColumnId, positionAfter } = data;

        const resp = await moveTask(taskId, {
          to: { boardColumnId, positionAfter },
        });

        if (resp.__typename !== "MoveTaskSuccess") {
          throw resp;
        }

        await queryClient.invalidateQueries({
          queryKey: boardRouteQueryKey(boardId),
        });
      }
    }

    return null;
  };
