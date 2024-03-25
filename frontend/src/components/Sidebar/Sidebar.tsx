import BoardList from "../BoardList";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.wrapper}>
      <BoardList />
    </aside>
  );
}
