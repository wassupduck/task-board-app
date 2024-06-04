/// <reference types="vite-plugin-svgr/client" />
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import styles from "./Task.module.css";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useFetcher,
} from "react-router-dom";
import VisuallyHidden from "../../components/VisuallyHidden";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import clsx from "clsx";
import Checkbox from "../../components/Checkbox";
import { Select, SelectItem } from "../../components/Select";
import Modal from "../../components/Modal";
import { useBoard } from "../board";
import invariant from "tiny-invariant";
import { LoaderData } from "./loader";
import { useQuery } from "@tanstack/react-query";
import { taskRouteQuery } from "./queries";

const TaskRoute_BoardFragment = graphql(`
  fragment TaskRoute_BoardFragment on Board {
    columns {
      nodes {
        ...TaskColumnSelect_BoardColumnFragment
      }
    }
  }
`);

export function Task() {
  const navigate = useNavigate();
  const params = useParams();
  invariant(params.taskId, "Missing taskId param");

  const initialData = useLoaderData() as LoaderData;
  const { data } = useQuery({
    ...taskRouteQuery(params.taskId),
    initialData,
  });
  const { task } = data;

  const board = getFragmentData(TaskRoute_BoardFragment, useBoard());

  const fetcher = useFetcher();

  function handleSubtaskCompletedChange(subtaskId: string, completed: boolean) {
    fetcher.submit(
      {
        intent: "update-subtask-completed",
        patch: { subtaskId, completed },
      },
      { method: "patch", encType: "application/json" }
    );
  }

  function handleColumnChange(boardColumnId: string) {
    fetcher.submit(
      { intent: "update-task", patch: { boardColumnId } },
      { method: "patch", encType: "application/json" }
    );
  }

  return (
    <Modal defaultOpen={true} onOpenChange={() => navigate("..")}>
      <Modal.Trigger />
      <Modal.Content>
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
              onSubtaskCompletedChange={handleSubtaskCompletedChange}
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
            onColumnChange={handleColumnChange}
          />
        </div>
      </Modal.Content>
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
      <Checkbox id={`subtask-${subtask.id}`} checked={subtask.completed} />
      <label
        htmlFor={`subtask-${subtask.id}`}
        className={clsx(styles.subtaskListItemLabel, {
          [styles.completed]: subtask.completed,
        })}
      >
        {subtask.title}
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
