import {
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import Modal from "../../components/Modal";
import { useTaskForm } from "../../components/TaskForm/hook";
import TaskForm from "../../components/TaskForm/TaskForm";
import invariant from "tiny-invariant";
import { useBoardRouteLoaderData } from "../board";
import { useQuery } from "@tanstack/react-query";
import { boardRouteQuery } from "../board/queries";
import { getFragmentData, graphql } from "../../gql";
import { TaskFormData } from "../../components/TaskForm/types";

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

  const params = useParams();
  invariant(params.boardId, "Missing boardId param");

  const initialBoardRouteData = useBoardRouteLoaderData();
  const { data: boardRouteData } = useQuery({
    ...boardRouteQuery(params.boardId),
    initialData: initialBoardRouteData,
  });
  const board = getFragmentData(
    NewTaskRoute_BoardFragment,
    boardRouteData.board
  );

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
    submit(task, {
      method: "post",
      encType: "application/json",
    });
  };

  return (
    <Modal onClose={() => navigate("..", { replace: true })}>
      <Modal.Title>Add New Task</Modal.Title>
      <TaskForm
        form={taskForm}
        board={board}
        onSubmit={handleSubmit}
        submitButtonText={isSubmitting ? "Creating Task..." : "Create Task"}
        disableSubmit={isSubmitting}
      />
    </Modal>
  );
}
