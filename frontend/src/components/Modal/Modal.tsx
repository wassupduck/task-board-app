import clsx from "clsx";
import styles from "./Modal.module.css";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  variant?: "destructive";
}

export default function Modal(props: ModalProps) {
  return (
    <Dialog.Root open={true} onOpenChange={props.onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={clsx(styles.modal, props.variant && styles[props.variant])}
        >
          <article className={styles.content}>{props.children}</article>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface ModalTitleProps extends Dialog.DialogTitleProps {}

Modal.Title = (props: ModalTitleProps) => {
  return (
    <Dialog.Title
      {...props}
      asChild={props.asChild === undefined ? true : props.asChild}
    >
      {props.asChild ? (
        props.children
      ) : (
        <h3 className={styles.title}>{props.children}</h3>
      )}
    </Dialog.Title>
  );
};
