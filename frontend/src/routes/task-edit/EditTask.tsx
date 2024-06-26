import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import Modal from "../../components/Modal";
import invariant from "tiny-invariant";
import { useBoard } from "../board";
import { useQuery } from "@tanstack/react-query";
import { getFragmentData, graphql } from "../../gql";
import { LoaderData } from "./edit-task.loader";
import { editTaskRouteQuery } from "./edit-task.queries";
import { TaskFormData, useTaskForm, TaskForm } from "../../components/TaskForm";
import { ActionRequestJson } from "./edit-task.action";
import {
  NewSubtaskInput,
  Subtask,
  UpdateTaskSubtaskInput,
} from "../../gql/graphql";

const EditTaskRoute_BoardFragment = graphql(`
  fragment EditTaskRoute_BoardFragment on Board {
    ...TaskForm_BoardFragment
  }
`);

export function EditTask() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const params = useParams();
  invariant(params.taskId, "Missing taskId param");
  invariant(params.boardId, "Missing boardId param");

  const initialData = useLoaderData() as LoaderData;
  const { data } = useQuery({
    ...editTaskRouteQuery(params.taskId),
    initialData,
  });
  const { task } = data;

  const board = getFragmentData(EditTaskRoute_BoardFragment, useBoard());

  const taskForm = useTaskForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      boardColumnId: task.column.id,
      subtasks:
        task.subtasks.nodes.length > 0
          ? task.subtasks.nodes
          : [{ title: "" }, { title: "" }],
    },
  });
  // Must read all formState values to subscribe to changes
  const { dirtyFields } = taskForm.formState;

  const submit = useSubmit();

  const handleSubmit = (formData: TaskFormData) => {
    function diffSubtasks(
      oldSubtasks: Pick<Subtask, "id" | "title">[],
      newSubtasks: TaskFormData["subtasks"]
    ) {
      const additions: NewSubtaskInput[] = [];
      const updates: UpdateTaskSubtaskInput[] = [];

      const oldSubtasksById = new Map(
        oldSubtasks.map((subtask) => [subtask.id, subtask])
      );
      for (const subtask of newSubtasks) {
        if (subtask.id === undefined) {
          additions.push({ title: subtask.title });
        } else {
          const oldSubtask = oldSubtasksById.get(subtask.id)!;
          if (subtask.title !== oldSubtask.title) {
            updates.push({ id: subtask.id, patch: { title: subtask.title } });
          }
        }
      }

      const newSubtaskIds = new Set(
        newSubtasks.map(({ id }) => id).filter((id) => id !== undefined)
      );
      const deletions: string[] = oldSubtasks
        .map(({ id }) => id)
        .filter((id) => !newSubtaskIds.has(id));

      return {
        additions,
        updates,
        deletions,
        noChange: !(
          additions.length > 0 ||
          updates.length > 0 ||
          deletions.length > 0
        ),
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { subtasks: _, ...dirtyTaskFields } = dirtyFields;

    let taskEdit: ActionRequestJson["task"] = undefined;
    const taskIsDirty = Object.values(dirtyTaskFields).some((v) => v === true);
    if (taskIsDirty) {
      taskEdit = {
        title: dirtyTaskFields.title ? formData.title : undefined,
        description: dirtyTaskFields.description
          ? formData.description
          : undefined,
        boardColumnId: dirtyTaskFields.boardColumnId
          ? formData.boardColumnId
          : undefined,
      };
    }

    const subtasksDiff = diffSubtasks(task.subtasks.nodes, formData.subtasks);
    const subtasksEdit: ActionRequestJson["subtasks"] = subtasksDiff.noChange
      ? undefined
      : {
          additions: subtasksDiff.additions.map((newSubtask) => ({
            subtask: newSubtask,
          })),
          updates: subtasksDiff.updates,
          deletions: subtasksDiff.deletions,
        };

    const edit: ActionRequestJson = {
      task: taskEdit,
      subtasks: subtasksEdit,
    };

    submit(edit, {
      method: "post",
      encType: "application/json",
    });
  };

  return (
    <Modal
      defaultOpen={true}
      onOpenChange={() => navigate("..", { relative: "path" })}
    >
      <Modal.Trigger />
      <Modal.Content>
        <Modal.Title>Edit Task</Modal.Title>
        <TaskForm
          board={board}
          form={taskForm}
          onSubmit={handleSubmit}
          submitButtonText={isSubmitting ? "Saving Changes..." : "Save Changes"}
          disableSubmit={isSubmitting}
        />
      </Modal.Content>
    </Modal>
  );
}
