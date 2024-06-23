import { QueryClient, skipToken, useQuery } from "@tanstack/react-query";
import { LoaderFunctionArgs, useRouteLoaderData } from "react-router-dom";
import {
  boardRouteQuery,
  boardRouteQueryKey,
  fetchBoardRouteData,
} from "./board.queries";
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

export const useBoardRouteLoaderData = () => {
  const loaderData = useRouteLoaderData("board") as LoaderData | undefined;
  const { data } = useQuery({
    queryKey: loaderData ? boardRouteQueryKey(loaderData.board.id) : [],
    queryFn: loaderData
      ? () => fetchBoardRouteData(loaderData.board.id)
      : skipToken,
    initialData: loaderData,
    throwOnError: false,
  });
  return data;
};
