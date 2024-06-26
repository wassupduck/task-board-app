/// <reference types="vite-plugin-svgr/client" />
import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import CheckIcon from "../../assets/icon-check.svg?react";
import styles from "./Checkbox.module.css";

interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithRef<typeof RadixCheckbox.Root>,
    "className" | "children"
  > {}

export function Checkbox(props: CheckboxProps) {
  return (
    <RadixCheckbox.Root {...props} className={styles.wrapper}>
      <RadixCheckbox.Indicator>
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}

export default Checkbox;
