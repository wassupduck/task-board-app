import { QueryClient } from "@tanstack/react-query";
import { rootRouteQuery } from "./queries";

export type LoaderData = Awaited<ReturnType<ReturnType<typeof loader>>>;

export const loader = (queryClient: QueryClient) => async () => {
  return await queryClient.ensureQueryData(rootRouteQuery);
};
