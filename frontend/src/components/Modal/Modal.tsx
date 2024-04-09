import * as Dialog from "@radix-ui/react-dialog";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  return (
    <Dialog.Root open={true} onOpenChange={props.onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        {props.children && (
          <Dialog.Content className={styles.content}>
            {props.children}
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface ModalTitleProps {
  children: React.ReactNode;
}

Modal.Title = ({ children }: ModalTitleProps) => {
  return <Dialog.Title>{children}</Dialog.Title>;
};
