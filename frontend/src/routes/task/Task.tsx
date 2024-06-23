import styles from "./Task.module.css";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useFetcher,
} from "react-router-dom";
import { getFragmentData, graphql } from "../../gql";
import Modal from "../../components/Modal";
import { useBoard } from "../board";
import invariant from "tiny-invariant";
import { LoaderData } from "./task.loader";
import { useQuery } from "@tanstack/react-query";
import { taskRouteQuery } from "./task.queries";
import { useState } from "react";
import { ActionPatchRequestJson } from "./task.action";
import { TaskActionsMenu } from "./TaskActionsMenu";
import { SubtaskList } from "./SubtaskList";
import { TaskColumnSelect } from "./TaskColumnSelect";

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
        operation: "update-subtask-completed",
        patch: { id: subtaskId, completed },
      } satisfies ActionPatchRequestJson,
      { method: "patch", encType: "application/json" }
    );
  }

  function handleColumnChange(boardColumnId: string) {
    fetcher.submit(
      {
        operation: "update-task",
        patch: { boardColumnId },
      } satisfies ActionPatchRequestJson,
      { method: "patch", encType: "application/json" }
    );
  }

  const [hasOpenModal, setHasOpenModal] = useState(false);

  return (
    <Modal defaultOpen={true} onOpenChange={() => navigate("..")}>
      <Modal.Trigger />
      <Modal.Content hidden={hasOpenModal}>
        <header className={styles.header}>
          <Modal.Title>{task.title}</Modal.Title>
          <div className={styles.taskActionsMenuButton}>
            <TaskActionsMenu task={task} onModalOpenChange={setHasOpenModal} />
          </div>
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
            <SubtaskList
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
