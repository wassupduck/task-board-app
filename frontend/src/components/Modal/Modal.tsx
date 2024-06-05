/// <reference types="vite-plugin-svgr/client" />
import CrossIcon from "../../assets/icon-cross.svg?react";
import clsx from "clsx";
import styles from "./Modal.module.css";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps extends Dialog.DialogProps {}

const Modal = (props: ModalProps) => <Dialog.Root {...props}></Dialog.Root>;

interface ModalContentProps {
  variant?: "destructive";
  children: React.ReactNode;
  hidden?: boolean;
  overlay?: boolean;
}

Modal.Content = (props: ModalContentProps) => (
  <Dialog.Portal>
    {(props.overlay ?? true) && <Dialog.Overlay className={styles.overlay} />}
    <Dialog.Content
      className={clsx(
        styles.modal,
        props.variant && styles[props.variant],
        props.hidden && styles.hidden
      )}
    >
      <article className={styles.content}>{props.children}</article>
      <Dialog.Close asChild>
        <button className={styles.closeButton} aria-label="Close">
          <CrossIcon />
        </button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
);

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

Modal.Trigger = Dialog.Trigger;
Modal.Close = Dialog.Close;

export default Modal;
