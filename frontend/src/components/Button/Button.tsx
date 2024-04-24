import clsx from "clsx";
import styles from "./Button.module.css";
import React from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  block?: boolean;
  variant?: "primary" | "secondary";
  size?: "large";
}

export default function Button(props: ButtonProps) {
  const { block, size, variant, children, ...rest } = props;
  return (
    <button
      className={clsx(
        styles.button,
        block && styles.block,
        styles[variant || "primary"],
        size && styles[size]
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
