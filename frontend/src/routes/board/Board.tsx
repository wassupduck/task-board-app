import Button from "../../components/Button";
import styles from "./Board.module.css";
import { Board as BoardMain } from "../../components/Board";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { LoaderData } from "./board.loader";
import { useQuery } from "@tanstack/react-query";
import { boardRouteQuery } from "./board.queries";
import { ActionPostRequestJson } from "./board.action";
import { BoardRouteContext } from "./board.context";
import { moveTask } from "./Board.helpers";

export function Board() {
  const fetcher = useFetcher();

  const initialData = useLoaderData() as LoaderData;
  const { data } = useQuery({
    ...boardRouteQuery(initialData.board.id),
    initialData,
  });
  let { board } = data;

  const handleTaskMove = (taskId: string, columnId: string, index: number) => {
    let positionAfter = "0";
    if (index > 0) {
      const srcColumn = board.columns.nodes.find(
        ({ tasks }) => tasks.nodes.findIndex(({ id }) => id === taskId) >= 0
      );
      const destColumn = board.columns.nodes.find(({ id }) => id === columnId);
      const currIndex =
        srcColumn?.tasks.nodes.findIndex(({ id }) => id === taskId) ?? -1;
      if (!destColumn || !srcColumn || currIndex < 0) {
        console.log("task or column not found");
        return;
      }

      const positionAfterIndex =
        destColumn.id !== srcColumn.id || index <= currIndex
          ? index - 1
          : index;
      if (
        positionAfterIndex < 0 ||
        positionAfterIndex >= destColumn.tasks.nodes.length
      ) {
        console.log("task move index out of bounds");
        return;
      }
      positionAfter = destColumn.tasks.nodes[positionAfterIndex].position;
    }

    const data: ActionPostRequestJson = {
      operation: "move-task",
      taskId,
      boardColumnId: columnId,
      positionAfter,
    };

    fetcher.submit(data, {
      method: "post",
      encType: "application/json",
    });
  };

  if (
    fetcher.state === "submitting" &&
    fetcher.formMethod === "post" &&
    fetcher.json
  ) {
    const fetcherData = fetcher.json as ActionPostRequestJson;
    if (fetcherData.operation === "move-task") {
      // Optimistically update board
      const nextColumnsNodes = moveTask(
        fetcherData.taskId,
        {
          boardColumnId: fetcherData.boardColumnId,
          positionAfter: fetcherData.positionAfter,
        },
        board.columns.nodes
      );
      board = {
        ...board,
        columns: {
          ...board.columns,
          nodes: nextColumnsNodes,
        },
      };
    }
  }

  return (
    <div className={styles.wrapper}>
      {board.columns.totalCount > 0 ? (
        <BoardMain board={board} onTaskMove={handleTaskMove} />
      ) : (
        <EmptyBoard />
      )}
      <Outlet context={{ board } satisfies BoardRouteContext} />
    </div>
  );
}

function EmptyBoard() {
  const navigate = useNavigate();

  return (
    <div className={styles.emptyBoardWrapper}>
      <p className={styles.emptyBoardMessage}>
        This board is empty. Create a new column to get started.
      </p>
      <Button size="large" onClick={() => navigate("edit")}>
        Add New Column
      </Button>
    </div>
  );
}
