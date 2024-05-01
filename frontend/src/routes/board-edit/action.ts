import { ActionFunctionArgs, redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { updateBoard, updateBoardColumns } from "./queries";
import { rootRouteQueryKey } from "../root/queries";
import { boardRouteQueryKey } from "../board/queries";
import {
  UpdateBoardColumnsPatchInput,
  UpdateBoardPatchInput,
} from "../../gql/graphql";

export type ActionRequestJson = {
  board?: UpdateBoardPatchInput;
  columns?: UpdateBoardColumnsPatchInput;
};
export type ActionData = Awaited<ReturnType<ReturnType<typeof action>>>;

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    invariant(params.boardId, "Missing boardId param");
    const { boardId } = params;
    const data = (await request.json()) as ActionRequestJson;

    if (data.board) {
      const resp = await updateBoard(boardId, data.board);
      if (resp.__typename === "BoardNameConflictError") {
        return resp;
      }
      if (resp.__typename !== "UpdateBoardSuccess") {
        if (resp.__typename === "NotFoundError") {
          throw new Response("Not found", { status: 404 });
        }
        throw resp; // TODO
      }
    }

    if (data.columns) {
      const resp = await updateBoardColumns(boardId, data.columns);
      if (resp.__typename !== "UpdateBoardColumnsSuccess") {
        throw resp; // TODO
      }
    }

    await queryClient.invalidateQueries({
      queryKey: rootRouteQueryKey,
      refetchType: "all",
    });
    await queryClient.invalidateQueries({
      queryKey: boardRouteQueryKey(boardId),
      refetchType: "all",
    });

    return redirect(`/boards/${boardId}`);
  };
