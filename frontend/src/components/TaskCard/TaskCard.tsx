import { forwardRef, ComponentPropsWithoutRef } from "react";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import styles from "./TaskCard.module.css";
import clsx from "clsx";

const TaskCard_TaskFragment = graphql(`
  fragment TaskCard_TaskFragment on Task {
    title
    subtasks {
      totalCount
      completedCount
    }
  }
`);

export interface TaskCardProps extends ComponentPropsWithoutRef<"li"> {
  task: FragmentType<typeof TaskCard_TaskFragment>;
  isPlaceholder?: boolean;
  isDragging?: boolean;
}

export const TaskCard = forwardRef<HTMLLIElement, TaskCardProps>(
  (props: TaskCardProps, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { task: _, isPlaceholder, isDragging, ...rest } = props;
    const task = getFragmentData(TaskCard_TaskFragment, props.task);

    return (
      <li
        ref={ref}
        {...rest}
        className={clsx(
          styles.wrapper,
          isPlaceholder && styles.placeholder,
          isDragging && styles.dragging
        )}
      >
        <h3 className={styles.title}>{task.title}</h3>
        {task.subtasks.totalCount > 0 && (
          <p className={styles.subtaskSummary}>
            {task.subtasks.completedCount} of {task.subtasks.totalCount}{" "}
            subtasks
          </p>
        )}
      </li>
    );
  }
);
