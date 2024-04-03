import { FragmentType, getFragmentData, graphql } from "../../gql";
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./Board.module.css";

const Board_BoardFragment = graphql(`
  fragment Board_BoardFragment on Board {
    columns {
      id
      ...Column_BoardColumnFragment
    }
  }
`);

export interface BoardProps {
  board: FragmentType<typeof Board_BoardFragment>;
  onTaskClick: (taskId: string) => void;
}

export function Board(props: BoardProps) {
  const board = getFragmentData(Board_BoardFragment, props.board);

  return (
    <>
      <div className={styles.board}>
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onTaskClick={props.onTaskClick}
          />
        ))}
      </div>
    </>
  );
}

const Column_BoardColumnFragment = graphql(`
  fragment Column_BoardColumnFragment on BoardColumn {
    name
    tasks {
      id
      ...TaskCard_TaskFragment
    }
  }
`);

interface ColumnProps {
  column: FragmentType<typeof Column_BoardColumnFragment>;
  onTaskClick: (taskId: string) => void;
}

function Column(props: ColumnProps) {
  const column = getFragmentData(Column_BoardColumnFragment, props.column);
  return (
    <section className={styles.column}>
      <h2 className={styles.columnHeader}>
        {column.name} ({column.tasks.length})
      </h2>
      <div className={styles.columnTaskList}>
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => props.onTaskClick(task.id)}
          />
        ))}
      </div>
    </section>
  );
}
