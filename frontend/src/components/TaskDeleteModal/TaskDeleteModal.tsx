import { Form, useNavigation } from "react-router-dom";
import styles from "./TaskDeleteModal.module.css";
import Button from "../Button";
import Modal from "../Modal";

interface TaskDeleteModalProps {
  task: {
    id: string;
    title: string;
  };
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  overlay?: boolean;
}

export function TaskDeleteModal(props: TaskDeleteModalProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Modal onOpenChange={props.onOpenChange}>
      <Modal.Trigger asChild>{props.children}</Modal.Trigger>
      <Modal.Content variant="destructive" overlay={props.overlay}>
        <Modal.Title>Delete this task?</Modal.Title>
        <p>
          Are you sure you want to delete the &ldquo;{props.task.title}&rdquo;
          task and it&apos;s subtasks? This action cannot be reversed.
        </p>
        <Form method="DELETE" className={styles.form}>
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

export default TaskDeleteModal;
