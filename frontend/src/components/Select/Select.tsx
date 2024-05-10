/// <reference types="vite-plugin-svgr/client" />
import ChevronDownIcon from "../../assets/icon-chevron-down.svg?react";
import * as SelectPrimitive from "@radix-ui/react-select";
import styles from "./Select.module.css";
import React, { ComponentPropsWithoutRef } from "react";

interface SelectProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger className={styles.trigger} ref={forwardedRef}>
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
);

interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
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
