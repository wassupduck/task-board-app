import { useNavigate, useNavigation, useSubmit } from "react-router-dom";
import Modal from "../../components/Modal";
import { useBoard } from "../board";
import { getFragmentData, graphql } from "../../gql";
import { TaskFormData, useTaskForm, TaskForm } from "../../components/TaskForm";
import { ActionRequestJson } from "./new-task.action";

const NewTaskRoute_BoardFragment = graphql(`
  fragment NewTaskRoute_BoardFragment on Board {
    columns {
      nodes {
        id
      }
    }
    ...TaskForm_BoardFragment
  }
`);

export function NewTask() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const board = getFragmentData(NewTaskRoute_BoardFragment, useBoard());

  const taskForm = useTaskForm({
    // Recommended to use default values for entire form
    defaultValues: {
      title: "",
      description: "",
      subtasks: [{ title: "" }, { title: "" }],
      boardColumnId: board.columns.nodes[0].id,
    },
  });
  const submit = useSubmit();

  const handleSubmit = (task: TaskFormData) => {
    submit(task satisfies ActionRequestJson, {
      method: "post",
      encType: "application/json",
    });
  };

  return (
    <Modal
      defaultOpen={true}
      onOpenChange={() => navigate("..", { replace: true })}
    >
      <Modal.Trigger />
      <Modal.Content>
        <Modal.Title>Add New Task</Modal.Title>
        <TaskForm
          form={taskForm}
          board={board}
          onSubmit={handleSubmit}
          submitButtonText={isSubmitting ? "Creating Task..." : "Create Task"}
          disableSubmit={isSubmitting}
        />
      </Modal.Content>
    </Modal>
  );
}
