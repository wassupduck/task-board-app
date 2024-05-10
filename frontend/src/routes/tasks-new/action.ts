import { ActionFunctionArgs, redirect } from "react-router-dom";
import invariant from "tiny-invariant";
import { QueryClient } from "@tanstack/react-query";
import { boardRouteQueryKey } from "../board/queries";
import { createTask } from "./queries";

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    invariant(params.boardId, "Missing boardId param");
    const { boardId } = params;
    const newTask = await request.json();

    const resp = await createTask(newTask);
    if (resp.__typename !== "CreateTaskSuccess") {
      throw resp;
    }

    await queryClient.invalidateQueries({
      queryKey: boardRouteQueryKey(boardId),
    });
    return redirect("..");
  };
