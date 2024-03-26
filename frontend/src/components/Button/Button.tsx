import styles from "./Button.module.css";

export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ children, disabled = false }: ButtonProps) {
  return (
    <button className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
}
