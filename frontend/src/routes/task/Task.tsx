import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import TaskViewModal from "../../components/TaskViewModal";
import { useBoardRouteLoaderData } from "../board";
import invariant from "tiny-invariant";
import { LoaderData } from "./loader";
import { useQuery } from "@tanstack/react-query";
import { taskRouteQuery } from "./queries";
import { boardRouteQuery } from "../board/queries";

export function Task() {
  const navigate = useNavigate();
  const params = useParams();
  invariant(params.taskId, "Missing taskId param");
  invariant(params.boardId, "Missing taskId param");

  const initialData = useLoaderData() as LoaderData;
  const { data } = useQuery({
    ...taskRouteQuery(params.taskId),
    initialData,
  });
  const { task } = data;

  const initialBoardRouteData = useBoardRouteLoaderData();
  const { data: boardRouteData } = useQuery({
    ...boardRouteQuery(params.boardId),
    initialData: initialBoardRouteData,
  });
  const { board } = boardRouteData;

  return (
    <TaskViewModal board={board} task={task} onClose={() => navigate(`..`)} />
  );
}
