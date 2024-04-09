import styles from "./Modal.module.css";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal(props: ModalProps) {
  return (
    <Dialog.Root open={true} onOpenChange={props.onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        {props.children && (
          <Dialog.Content className={styles.modal}>
            <article className={styles.content}>{props.children}</article>
          </Dialog.Content>
        )}
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

interface ModalDescriptionProps {
  children: React.ReactNode;
}

Modal.Description = (props: ModalDescriptionProps) => {
  return <p className={styles.description}>{props.children}</p>;
};

interface ModalSectionProps {
  children: React.ReactNode;
}

Modal.Section = (props: ModalSectionProps) => {
  return <section>{props.children}</section>;
};

interface ModalSectionHeadingProps {
  children: React.ReactNode;
}

Modal.SectionHeading = (props: ModalSectionHeadingProps) => {
  return <h4 className={styles.sectionHeading}>{props.children}</h4>;
};
