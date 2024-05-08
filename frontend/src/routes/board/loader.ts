import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, useRouteLoaderData } from "react-router-dom";
import { boardRouteQuery } from "./queries";
import invariant from "tiny-invariant";

export type LoaderData = Awaited<ReturnType<ReturnType<typeof loader>>>;

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    invariant(params.boardId, "Missing boardId param");
    return await queryClient.ensureQueryData({
      ...boardRouteQuery(params.boardId),
    });
  };

export const useBoardRouteLoaderData = () =>
  useRouteLoaderData("board") as LoaderData;
