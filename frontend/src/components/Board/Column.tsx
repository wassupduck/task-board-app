import { useDroppable } from "@dnd-kit/core";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import styles from "./Column.module.css";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTaskCard } from "../SortableTaskCard";
import { CSSProperties } from "react";
import { columnIndicatorColor } from "./Column.helpers";

const Column_BoardColumnFragment = graphql(`
  fragment Column_BoardColumnFragment on BoardColumn {
    id
    name
    tasks {
      totalCount
      nodes {
        id
        ...SortableTaskCard_TaskFragment
      }
    }
  }
`);

interface ColumnProps {
  column: FragmentType<typeof Column_BoardColumnFragment>;
}

export function Column(props: ColumnProps) {
  const column = getFragmentData(Column_BoardColumnFragment, props.column);

  const { setNodeRef } = useDroppable({
    id: `column:${column.id}`,
  });

  const tasks = column.tasks.nodes;

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div
          className={styles.indicator}
          style={
            { "--color": columnIndicatorColor(column.id) } as CSSProperties
          }
        ></div>
        <h2 className={styles.heading}>
          {column.name} ({column.tasks.totalCount})
        </h2>
      </header>
      <ol ref={setNodeRef} className={styles.taskList}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </ol>
    </section>
  );
}
