import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createBoard } from "./boards.queries";
import { QueryClient } from "@tanstack/react-query";
import { rootRouteQueryKey } from "../root";
import { NewBoardInput } from "../../gql/graphql";

export type ActionRequestJson = NewBoardInput;
export type ActionData = Awaited<ReturnType<ReturnType<typeof action>>>;

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const newBoard = (await request.json()) as ActionRequestJson;

    const resp = await createBoard(newBoard);
    if (resp.__typename !== "CreateBoardSuccess") {
      return resp;
    }

    await queryClient.invalidateQueries({
      queryKey: rootRouteQueryKey,
    });
    return redirect(`/boards/${resp.board.id}`);
  };
