import Button from "../../components/Button";
import styles from "./Board.module.css";
import { Board as BoardMain } from "../../components/Board/Board";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { LoaderData } from "./loader";
import { useQuery } from "@tanstack/react-query";
import { boardRouteQuery } from "./queries";

export function Board() {
  const navigate = useNavigate();

  const initialData = useLoaderData() as LoaderData;
  const { data } = useQuery({
    ...boardRouteQuery(initialData.board.id),
    initialData,
  });

  const { board } = data;

  return (
    <div className={styles.wrapper}>
      {board.columns.totalCount > 0 ? (
        <BoardMain
          board={board}
          onTaskClick={(taskId) => {
            navigate(`tasks/${taskId}`);
          }}
        />
      ) : (
        <EmptyBoard />
      )}
      <Outlet />
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
