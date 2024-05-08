import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createBoard } from "./queries";
import { QueryClient } from "@tanstack/react-query";
import { rootRouteQueryKey } from "../root/queries";

export type ActionData = Awaited<ReturnType<ReturnType<typeof action>>>;

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const newBoard = await request.json();

    const resp = await createBoard(newBoard);
    if (resp.__typename !== "CreateBoardSuccess") {
      return resp;
    }

    await queryClient.invalidateQueries({
      queryKey: rootRouteQueryKey,
    });
    return redirect(`${resp.board.id}`);
  };
