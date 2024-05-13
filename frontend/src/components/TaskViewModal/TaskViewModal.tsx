/// <reference types="vite-plugin-svgr/client" />
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import styles from "./TaskViewModal.module.css";
import VisuallyHidden from "../VisuallyHidden";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import clsx from "clsx";
import Checkbox from "../Checkbox";
import { Select, SelectItem } from "../Select";
import Modal from "../Modal";
import { useFetcher } from "react-router-dom";

const TaskViewModal_TaskFragment = graphql(`
  fragment TaskViewModal_TaskFragment on Task {
    id
    title
    description
    column {
      id
      name
    }
    subtasks {
      totalCount
      completedCount
      nodes {
        ...SubtaskList_SubtaskFragment
      }
    }
  }
`);

const TaskViewModal_BoardFragment = graphql(`
  fragment TaskViewModal_BoardFragment on Board {
    columns {
      nodes {
        ...TaskColumnSelect_BoardColumnFragment
      }
    }
  }
`);

interface TaskViewModalProps {
  board: FragmentType<typeof TaskViewModal_BoardFragment>;
  task: FragmentType<typeof TaskViewModal_TaskFragment>;
  onClose: () => void;
}

export default function TaskViewModal(props: TaskViewModalProps) {
  const fetcher = useFetcher();

  const board = getFragmentData(TaskViewModal_BoardFragment, props.board);
  const task = getFragmentData(TaskViewModal_TaskFragment, props.task);

  return (
    <Modal onClose={props.onClose}>
      <header className={styles.header}>
        <Modal.Title>{task.title}</Modal.Title>
        <button className={styles.taskActionsButton}>
          <VerticalEllipsisIcon />
          <VisuallyHidden>Task actions</VisuallyHidden>
        </button>
      </header>
      {task.description.length > 0 && (
        <p className={styles.description}>{task.description}</p>
      )}
      {task.subtasks.totalCount > 0 && (
        <fieldset>
          <legend className="form-label">
            Subtasks ({task.subtasks.completedCount} of{" "}
            {task.subtasks.totalCount})
          </legend>
          <SubtasksList
            subtasks={task.subtasks.nodes}
            onSubtaskCompletedChange={(subtaskId, completed) =>
              fetcher.submit(
                {
                  intent: "update-subtask-completed",
                  patch: { subtaskId, completed },
                },
                { method: "patch", encType: "application/json" }
              )
            }
          />
        </fieldset>
      )}
      <div>
        <label htmlFor="status" className="form-label">
          Current Status
        </label>
        <TaskColumnSelect
          selectedColumnId={task.column.id}
          boardColumns={board.columns.nodes}
          onColumnChange={(boardColumnId) =>
            fetcher.submit(
              { intent: "update-task", patch: { boardColumnId } },
              { method: "patch", encType: "application/json" }
            )
          }
        />
      </div>
    </Modal>
  );
}

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

function SubtasksList(props: SubtaskListProps) {
  const subtasks = getFragmentData(SubtaskList_SubtaskFragment, props.subtasks);
  return (
    <ul className={styles.subtaskList}>
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
      className={styles.subtaskListItem}
      onClick={() => props.onCompletedChange(!subtask.completed)}
    >
      <label className={styles.subtaskListItemLabel}>
        <Checkbox checked={subtask.completed} />
        <p className={clsx({ [styles.completed]: subtask.completed })}>
          {subtask.title}
        </p>
      </label>
    </li>
  );
}

const TaskColumnSelect_BoardColumnFragment = graphql(`
  fragment TaskColumnSelect_BoardColumnFragment on BoardColumn {
    id
    name
  }
`);

interface TaskColumnSelectProps {
  selectedColumnId: string;
  boardColumns: FragmentType<typeof TaskColumnSelect_BoardColumnFragment>[];
  onColumnChange: (columnId: string) => void;
}

function TaskColumnSelect(props: TaskColumnSelectProps) {
  const boardColumns = getFragmentData(
    TaskColumnSelect_BoardColumnFragment,
    props.boardColumns
  );
  return (
    <Select
      id="status"
      value={props.selectedColumnId}
      onValueChange={props.onColumnChange}
    >
      {boardColumns.map((column) => (
        <SelectItem key={column.id} value={column.id}>
          {column.name}
        </SelectItem>
      ))}
    </Select>
  );
}
