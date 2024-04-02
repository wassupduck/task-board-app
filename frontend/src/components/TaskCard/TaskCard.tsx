import { FragmentType, getFragmentData, graphql } from "../../gql";
import styles from "./TaskCard.module.css";

const TaskCard_TaskFragment = graphql(`
  fragment TaskCard_TaskFragment on Task {
    title
  }
`);

interface TaskCardProps {
  task: FragmentType<typeof TaskCard_TaskFragment>;
}

export function TaskCard(props: TaskCardProps) {
  const task = getFragmentData(TaskCard_TaskFragment, props.task);
  return (
    <article className={styles.wrapper}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.subtaskSummary}>0 of 3 subtasks</p>
    </article>
  );
}
