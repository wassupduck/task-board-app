import Button from "../Button";
import styles from "./BoardArea.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { Board } from "../Board/Board";
import { useState } from "react";
import TaskViewModal from "../TaskViewModal";

const BoardArea_BoardFragment = graphql(`
  fragment BoardArea_BoardFragment on Board {
    id
    columns {
      totalCount
    }
    ...Board_BoardFragment
    ...TaskViewModal_BoardFragment
  }
`);

export interface BoardAreaProps {
  currentBoard?: FragmentType<typeof BoardArea_BoardFragment>;
  invalidateBoardQuery: () => void;
}

export default function BoardArea(props: BoardAreaProps) {
  const [taskViewModal, setTaskViewModal] = useState<{
    openTaskId?: string;
  }>({
    openTaskId: undefined,
  });

  const board = getFragmentData(BoardArea_BoardFragment, props.currentBoard);

  return (
    <main className={styles.wrapper}>
      {board &&
        (board.columns.totalCount > 0 ? (
          <>
            <Board
              board={board}
              onTaskClick={(taskId) => setTaskViewModal({ openTaskId: taskId })}
            />
            {taskViewModal.openTaskId !== undefined && (
              <TaskViewModal
                board={board}
                taskId={taskViewModal.openTaskId}
                onClose={() => {
                  setTaskViewModal({ openTaskId: undefined });
                }}
                onTaskUpdate={props.invalidateBoardQuery}
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
      <Button size="large">Add New Column</Button>
    </div>
  );
}
