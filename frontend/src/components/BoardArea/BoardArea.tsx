import Button from "../Button";
import styles from "./BoardArea.module.css";

export default function BoardArea() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.emptyBoardWrapper}>
        <p className={styles.emptyBoardMessage}>
          This board is empty. Create a new column to get started.
        </p>
        <Button>Add New Column</Button>
      </div>
    </main>
  );
}
