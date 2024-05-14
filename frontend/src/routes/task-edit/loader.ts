import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import invariant from "tiny-invariant";
import { editTaskRouteQuery } from "./queries";

export type LoaderData = Awaited<ReturnType<ReturnType<typeof loader>>>;

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    invariant(params.taskId, "Missing taskId param");
    return await queryClient.ensureQueryData(editTaskRouteQuery(params.taskId));
  };
