/// <reference types="vite-plugin-svgr/client" />
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import styles from "./TaskViewModal.module.css";
import VisuallyHidden from "../VisuallyHidden";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import clsx from "clsx";
import Checkbox from "../Checkbox";
import Select from "../Select";
import Modal from "../Modal";

const taskQueryKey = (taskId: string) => ["tasks", taskId] as const;

const taskQueryDocument = graphql(`
  query TaskQuery($id: ID!) {
    task(id: $id) {
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
  }
`);

const updateSubtaskCompletedMutationDocument = graphql(`
  mutation UpdateSubtaskCompletedMutation(
    $input: UpdateSubtaskCompletedInput!
  ) {
    updateSubtaskCompleted(input: $input) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

const updateTaskColumnMutationDocument = graphql(`
  mutation UpdateTaskColumnMutation($id: ID!, $boardColumnId: ID!) {
    updateTask(input: { id: $id, patch: { boardColumnId: $boardColumnId } }) {
      __typename
      ... on ErrorResponse {
        message
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
  taskId: string;
  onClose: () => void;
  onTaskUpdate: () => void;
}

export default function TaskViewModal(props: TaskViewModalProps) {
  const board = getFragmentData(TaskViewModal_BoardFragment, props.board);

  const taskQuery = useQuery({
    queryKey: taskQueryKey(props.taskId),
    queryFn: async () =>
      request(import.meta.env.VITE_BACKEND_GRAPHQL_URL, taskQueryDocument, {
        id: props.taskId,
      }),
  });

  const queryClient = useQueryClient();

  const updateSubtaskCompletedMutation = useMutation({
    mutationFn: async ({
      subtaskId,
      completed,
    }: {
      subtaskId: string;
      completed: boolean;
    }) => {
      const resp = await request(
        import.meta.env.VITE_BACKEND_GRAPHQL_URL,
        updateSubtaskCompletedMutationDocument,
        {
          input: {
            id: subtaskId,
            completed,
          },
        }
      );
      if (
        resp.updateSubtaskCompleted.__typename !==
        "UpdateSubtaskCompletedSuccess"
      ) {
        // TODO: Error handling
        throw new Error(resp.updateSubtaskCompleted.message);
      }
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKey(props.taskId),
      });
      props.onTaskUpdate();
    },
  });

  const updateTaskColumnMutation = useMutation({
    mutationFn: async ({
      id,
      boardColumnId,
    }: {
      id: string;
      boardColumnId: string;
    }) => {
      const resp = await request(
        import.meta.env.VITE_BACKEND_GRAPHQL_URL,
        updateTaskColumnMutationDocument,
        { id, boardColumnId }
      );
      if (resp.updateTask.__typename !== "UpdateTaskSuccess") {
        // TODO: Error handling
        throw new Error(resp.updateTask.message);
      }
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKey(props.taskId),
      });
      props.onTaskUpdate();
    },
  });

  let content;
  if (taskQuery.isPending) {
    content = null;
  } else if (taskQuery.isError) {
    // TODO: Better error handling
    content = <span>Error: {taskQuery.error.message}</span>;
  } else if (!taskQuery.data || !taskQuery.data.task) {
    content = <span>Error: Something went wrong</span>;
  } else {
    const task = taskQuery.data.task;
    content = (
      <>
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
            <legend>
              <h4 className={styles.sectionHeading}>
                Subtasks ({task.subtasks.completedCount} of{" "}
                {task.subtasks.totalCount})
              </h4>
            </legend>
            <SubtasksList
              subtasks={task.subtasks.nodes}
              onSubtaskCompletedChange={(subtaskId, completed) =>
                updateSubtaskCompletedMutation.mutate({
                  subtaskId,
                  completed,
                })
              }
            />
          </fieldset>
        )}
        <div>
          <label>
            <h4 className={styles.sectionHeading}>Current Status</h4>
            <TaskColumnSelect
              selectedColumnId={task.column.id}
              boardColumns={board.columns.nodes}
              onColumnChange={(boardColumnId) =>
                updateTaskColumnMutation.mutate({
                  id: props.taskId,
                  boardColumnId,
                })
              }
            />
          </label>
        </div>
      </>
    );
  }

  return <Modal onClose={props.onClose}>{content}</Modal>;
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
      value={props.selectedColumnId}
      options={boardColumns.map((column) => ({
        value: column.id,
        text: column.name,
      }))}
      onValueChange={props.onColumnChange}
    />
  );
}
