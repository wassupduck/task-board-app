import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createBoard } from "./queries";
import { QueryClient } from "@tanstack/react-query";
import { rootRouteQueryKey } from "../root/queries";
import invariant from "tiny-invariant";

export type ActionData = Awaited<ReturnType<ReturnType<typeof action>>>;

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const newBoard = await request.json();
    invariant(newBoard, "Missing new board data");
    const resp = await createBoard(newBoard);
    if (resp.__typename === "CreateBoardSuccess") {
      await queryClient.invalidateQueries({
        queryKey: rootRouteQueryKey,
        refetchType: "all",
      });
      return redirect(`/boards/${resp.board.id}`);
    } else {
      return resp;
    }
  };
