import { Navigate, useLoaderData, useParams } from "react-router-dom";
import { LoaderData } from "./root.loader";
import { useQuery } from "@tanstack/react-query";
import { rootRouteQuery } from "./root.queries";

export function RootIndex() {
  const initialData = useLoaderData() as LoaderData;
  const { data } = useQuery({
    ...rootRouteQuery,
    initialData,
  });
  const { boards } = data;

  const params = useParams();
  const boardId = params.boardId;
  if (boards.length > 0 && boardId === undefined) {
    return <Navigate to={`boards/${boards[0].id}`} />;
  }

  return null;
}
