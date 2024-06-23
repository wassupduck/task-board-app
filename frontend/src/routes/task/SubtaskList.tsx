import styles from "./SubtaskList.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import clsx from "clsx";
import Checkbox from "../../components/Checkbox";

const SubtaskList_SubtaskFragment = graphql(`
  fragment SubtaskList_SubtaskFragment on Subtask {
    id
    ...SubtaskListItem_SubtaskFragment
  }
`);

interface SubtaskListProps {
  subtasks: FragmentType<typeof SubtaskList_SubtaskFragment>[];
  onSubtaskCompletedChange: (subtaskId: string, completed: boolean) => void;
}

export function SubtaskList(props: SubtaskListProps) {
  const subtasks = getFragmentData(SubtaskList_SubtaskFragment, props.subtasks);
  return (
    <ul className={styles.wrapper}>
      {subtasks.map((subtask) => (
        <SubtaskListItem
          key={subtask.id}
          subtask={subtask}
          onCompletedChange={(completed) =>
            props.onSubtaskCompletedChange(subtask.id, completed)
          }
        />
      ))}
    </ul>
  );
}

const SubtaskListItem_SubtaskFragment = graphql(`
  fragment SubtaskListItem_SubtaskFragment on Subtask {
    id
    title
    completed
  }
`);

interface SubtaskListItemProps {
  subtask: FragmentType<typeof SubtaskListItem_SubtaskFragment>;
  onCompletedChange: (completed: boolean) => void;
}

function SubtaskListItem(props: SubtaskListItemProps) {
  const subtask = getFragmentData(
    SubtaskListItem_SubtaskFragment,
    props.subtask
  );

  return (
    <li
      className={styles.listItem}
      onClick={() => props.onCompletedChange(!subtask.completed)}
    >
      <Checkbox id={`subtask-${subtask.id}`} checked={subtask.completed} />
      <label
        htmlFor={`subtask-${subtask.id}`}
        className={clsx(styles.listItemLabel, {
          [styles.completed]: subtask.completed,
        })}
      >
        {subtask.title}
      </label>
    </li>
  );
}
