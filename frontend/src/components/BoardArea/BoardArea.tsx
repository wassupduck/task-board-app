import Button from "../Button";
import styles from "./BoardArea.module.css";
import { getFragmentData, graphql } from "../../gql";
import { Board } from "../Board/Board";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { useState } from "react";
import TaskDialog from "../TaskDialog";

const boardQueryKey = (boardId: string) => ["boards", boardId] as const;

const boardQuery = graphql(`
  query BoardQuery($id: ID!) {
    board(id: $id) {
      ...BoardArea_BoardFragment
    }
  }
`);

const BoardArea_BoardFragment = graphql(`
  fragment BoardArea_BoardFragment on Board {
    id
    columns {
      id
    }
    ...Board_BoardFragment
    ...TaskDialog_BoardFragment
  }
`);

export interface BoardAreaProps {
  currentBoardId?: string;
}

export default function BoardArea(props: BoardAreaProps) {
  // Todo: pending and error handling
  const { data: currentBoardQueryData } = useQuery({
    queryKey: boardQueryKey(props.currentBoardId!),
    queryFn: async () =>
      request(import.meta.env.VITE_BACKEND_GRAPHQL_URL, boardQuery, {
        id: props.currentBoardId!,
      }),
    enabled: props.currentBoardId !== undefined,
  });
  const queryClient = useQueryClient();

  const [taskDialog, setTaskDialog] = useState<{
    openTaskId?: string;
  }>({
    openTaskId: undefined,
  });

  const board =
    currentBoardQueryData &&
    getFragmentData(BoardArea_BoardFragment, currentBoardQueryData.board);

  return (
    <main className={styles.wrapper}>
      {board &&
        (board.columns.length > 0 ? (
          <>
            <Board
              board={board}
              onTaskClick={(taskId) => setTaskDialog({ openTaskId: taskId })}
            />
            {taskDialog.openTaskId !== undefined && (
              <TaskDialog
                board={board}
                taskId={taskDialog.openTaskId}
                onClose={() => {
                  setTaskDialog({ openTaskId: undefined });
                }}
                onTaskUpdate={() => {
                  queryClient.invalidateQueries({
                    queryKey: boardQueryKey(board.id),
                  });
                }}
              />
            )}
          </>
        ) : (
          <EmptyBoard />
        ))}
    </main>
  );
}

function EmptyBoard() {
  return (
    <div className={styles.emptyBoardWrapper}>
      <p className={styles.emptyBoardMessage}>
        This board is empty. Create a new column to get started.
      </p>
      <Button>Add New Column</Button>
    </div>
  );
}
