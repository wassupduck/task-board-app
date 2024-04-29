import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, useRouteLoaderData } from "react-router-dom";
import { boardRouteQuery } from "./queries";
import invariant from "tiny-invariant";

export type LoaderData = Awaited<ReturnType<ReturnType<typeof loader>>>;

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    invariant(params.boardId, "Missing boardId param");
    const resp = await queryClient.ensureQueryData(
      boardRouteQuery(params.boardId)
    );
    if (resp.board === null) {
      throw new Response("Not found", { status: 404 });
    }
    return resp;
  };

export const useBoardRouteLoaderData = () =>
  useRouteLoaderData("board") as LoaderData;
