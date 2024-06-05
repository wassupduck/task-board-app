/// <reference types="vite-plugin-svgr/client" />
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import styles from "./PopoverListMenu.module.css";
import * as Popover from "@radix-ui/react-popover";
import React, { createContext, useContext, useState } from "react";
import VisuallyHidden from "../VisuallyHidden";
import clsx from "clsx";
import { Link, LinkProps } from "react-router-dom";

interface PopoverListMenuContextType {
  hasOpenModal: boolean;
  onModalItemOpenChange: (open: boolean) => void;
}

const PopoverListMenuContext = createContext<
  PopoverListMenuContextType | undefined
>(undefined);

function usePopoverListMenuContext() {
  const context = useContext(PopoverListMenuContext);
  if (context === undefined) {
    throw new Error(
      "usePopoverListMenuContext must be used within a PopoverListMenuContext.Provider"
    );
  }
  return context;
}

interface PopoverListMenuProps {
  children: React.ReactNode;
  onModalItemOpenChange?: (open: boolean) => void;
}

function PopoverListMenu(props: PopoverListMenuProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hasOpenModal, setHasOpenModal] = useState(false);

  function onModalItemOpenChange(open: boolean) {
    setHasOpenModal(open);
    if (open === false) {
      setPopoverOpen(false);
    }
    props.onModalItemOpenChange?.(open);
  }

  return (
    <PopoverListMenuContext.Provider
      value={{ hasOpenModal, onModalItemOpenChange }}
    >
      <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
        {props.children}
      </Popover.Root>
    </PopoverListMenuContext.Provider>
  );
}

interface TriggerProps {
  label: string;
}

function Trigger(props: TriggerProps) {
  return (
    <Popover.Trigger asChild>
      <button className={styles.triggerButton}>
        <VisuallyHidden>{props.label}</VisuallyHidden>
        <VerticalEllipsisIcon style={{ minWidth: 20, minHeight: 5 }} />
      </button>
    </Popover.Trigger>
  );
}

interface ContentProps extends Popover.PopoverContentProps {}

function List(props: ContentProps) {
  const { hasOpenModal } = usePopoverListMenuContext();
  const hidden = hasOpenModal;

  return (
    <Popover.Content
      {...props}
      className={clsx(styles.content, hidden && styles.hidden)}
    >
      <ul className={styles.list}>{props.children}</ul>
    </Popover.Content>
  );
}

interface LinkItemProps extends LinkProps {}

function LinkItem(props: LinkItemProps) {
  return (
    <li>
      <Link className={styles.itemButton} {...props}>
        {props.children}
      </Link>
    </li>
  );
}

interface ModalItemProps {
  children: (props: {
    onOpenChange: (open: boolean) => void;
  }) => React.ReactNode;
}

function ModalItem(props: ModalItemProps) {
  const { onModalItemOpenChange } = usePopoverListMenuContext();
  return <li>{props.children({ onOpenChange: onModalItemOpenChange })}</li>;
}

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "destructive";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const { variant, children, ...rest } = props;
    return (
      <button
        ref={ref}
        className={clsx(styles.itemButton, variant && styles[variant])}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

PopoverListMenu.Trigger = Trigger;
PopoverListMenu.List = List;
PopoverListMenu.LinkItem = LinkItem;
PopoverListMenu.ModalItem = ModalItem;
PopoverListMenu.Button = Button;

export default PopoverListMenu;
