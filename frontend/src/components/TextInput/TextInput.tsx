import React from "react";
import styles from "./TextInput.module.css";

interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  type?: "text";
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props: TextInputProps, ref) => {
    return <input type="text" ref={ref} className={styles.input} {...props} />;
  }
);

export default TextInput;
