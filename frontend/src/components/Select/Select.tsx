/// <reference types="vite-plugin-svgr/client" />
import ChevronDownIcon from "../../assets/icon-chevron-down.svg?react";
import * as SelectPrimitive from "@radix-ui/react-select";
import styles from "./Select.module.css";
import React, { ComponentPropsWithoutRef } from "react";

type SelectType = React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLButtonElement>
> & {
  Item: typeof Item;
};

interface SelectProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  id?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          id={props.id}
          className={styles.trigger}
          ref={forwardedRef}
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={styles.content}
            position="popper"
            sideOffset={8}
          >
            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
) as SelectType;

interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

const Item = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        {...props}
        className={styles.item}
        ref={forwardedRef}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  }
);

Select.Item = Item;

export default Select;
