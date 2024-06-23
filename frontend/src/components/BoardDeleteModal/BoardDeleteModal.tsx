import { Form, useNavigation } from "react-router-dom";
import styles from "./BoardDeleteModal.module.css";
import Button from "../Button";
import Modal from "../Modal";

interface BoardDeleteModalProps {
  board: {
    id: string;
    name: string;
  };
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function BoardDeleteModal(props: BoardDeleteModalProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Modal onOpenChange={props.onOpenChange}>
      <Modal.Trigger asChild>{props.children}</Modal.Trigger>
      <Modal.Content variant="destructive">
        <Modal.Title>Delete this board?</Modal.Title>
        <p>
          Are you sure you want to delete the &ldquo;{props.board.name}&rdquo;
          board? This action will remove all columns and tasks and cannot be
          reversed.
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
          <Modal.Close asChild>
            <Button
              type="button"
              variant="secondary"
              block
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </Modal.Close>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default BoardDeleteModal;
