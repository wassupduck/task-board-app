import Button from "../../components/Button";
import styles from "./Board.module.css";
import { Board as BoardMain } from "../../components/Board/Board";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { LoaderData } from "./loader";
import invariant from "tiny-invariant";

export function Board() {
  const navigate = useNavigate();

  const data = useLoaderData() as LoaderData;
  const { board } = data;
  invariant(board, "Board not found");

  return (
    <div className={styles.wrapper}>
      {board.columns.totalCount > 0 ? (
        <BoardMain
          board={board}
          onTaskClick={(taskId) => {
            navigate(`/boards/${board.id}/tasks/${taskId}`);
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
      <Button size="large" onClick={() => navigate("./edit")}>
        Add New Column
      </Button>
    </div>
  );
}
