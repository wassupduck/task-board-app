import { FragmentType, getFragmentData, graphql } from "../../gql";
import styles from "./TaskCard.module.css";

const TaskCard_TaskFragment = graphql(`
  fragment TaskCard_TaskFragment on Task {
    title
    subtasks {
      totalCount
      completedCount
    }
  }
`);

interface TaskCardProps {
  task: FragmentType<typeof TaskCard_TaskFragment>;
  onClick: () => void;
}

export function TaskCard(props: TaskCardProps) {
  const task = getFragmentData(TaskCard_TaskFragment, props.task);

  return (
    <article className={styles.taskCard} onClick={props.onClick}>
      <h3 className={styles.title}>{task.title}</h3>
      {task.subtasks.totalCount > 0 && (
        <p className={styles.subtaskSummary}>
          {task.subtasks.completedCount} of {task.subtasks.totalCount} subtasks
        </p>
      )}
    </article>
  );
}
