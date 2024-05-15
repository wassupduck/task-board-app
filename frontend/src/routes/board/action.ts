import { ActionFunctionArgs, redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { rootRouteQueryKey } from "../root/queries";
import invariant from "tiny-invariant";
import { deleteBoard } from "./queries";

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
    }

    return null;
  };
