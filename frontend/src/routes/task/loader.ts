import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import invariant from "tiny-invariant";
import { taskRouteQuery } from "./queries";

export type LoaderData = Awaited<ReturnType<ReturnType<typeof loader>>>;

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    invariant(params.taskId, "Missing taskId param");
    const resp = await queryClient.ensureQueryData(
      taskRouteQuery(params.taskId)
    );
    if (resp.task === null) {
      throw new Response("Not found", { status: 404 });
    }
    return resp;
  };
