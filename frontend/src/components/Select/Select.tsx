/// <reference types="vite-plugin-svgr/client" />
import ChevronDownIcon from "../../assets/icon-chevron-down.svg?react";
import * as RadixSelect from "@radix-ui/react-select";
import styles from "./Select.module.css";

interface SelectProps {
  value: string;
  options: {
    value: string;
    text: string;
  }[];
  onValueChange: (value: string) => void;
}

export default function Select(props: SelectProps) {
  return (
    <div className={styles.wrapper}>
      <RadixSelect.Root value={props.value} onValueChange={props.onValueChange}>
        <RadixSelect.Trigger className={styles.trigger}>
          <RadixSelect.Value />
          <RadixSelect.Icon>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className={styles.content}
            position="popper"
            sideOffset={8}
          >
            <RadixSelect.Viewport>
              {props.options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  className={styles.item}
                  value={option.value}
                >
                  <RadixSelect.ItemText>{option.text}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}
