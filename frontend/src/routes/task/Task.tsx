import { useLoaderData, useNavigate } from "react-router-dom";
import TaskViewModal from "../../components/TaskViewModal";
import { useBoardRouteLoaderData } from "../board";
import invariant from "tiny-invariant";
import { LoaderData } from "./loader";

export function Task() {
  const navigate = useNavigate();

  const data = useLoaderData() as LoaderData;
  const { task } = data;
  invariant(task, "Task not found");

  const boardRouteData = useBoardRouteLoaderData();
  const { board } = boardRouteData;
  invariant(board, "Board not found");

  return (
    <TaskViewModal
      board={board}
      task={task}
      onClose={() => navigate(`/boards/${board.id}`)}
    />
  );
}
