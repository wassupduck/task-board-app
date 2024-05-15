import { Form, useNavigation } from "react-router-dom";
import styles from "./BoardDeleteModal.module.css";
import Button from "../Button";
import Modal from "../Modal";

interface BoardDeleteModalProps {
  board: {
    id: string;
    name: string;
  };
  onCloseOrCancel: () => void;
}

export function BoardDeleteModal(props: BoardDeleteModalProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Modal onClose={props.onCloseOrCancel} variant="destructive">
      <Modal.Title>Delete this board?</Modal.Title>
      <p>
        Are you sure you want to delete the "{props.board.name}" board? This
        action will remove all columns and tasks and cannot be reversed.
      </p>
      <Form
        action={`/boards/${props.board.id}`}
        method="DELETE"
        className={styles.form}
      >
        <Button
          type="submit"
          variant="destructive"
          block
          disabled={isSubmitting}
        >
          {isSubmitting ? "Deleting..." : "Delete"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          block
          onClick={props.onCloseOrCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </Form>
    </Modal>
  );
}
