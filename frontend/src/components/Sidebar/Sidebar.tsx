/// <reference types="vite-plugin-svgr/client" />
import HideSidebarIcon from "../../assets/icon-hide-sidebar.svg?react";
import BoardList from "../BoardList";
import ThemeSelector from "../ThemeSelector";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.wrapper}>
      <BoardList />
      <div className={styles.buttonGroup}>
        <div className={styles.themeSelectorWrapper}>
          <ThemeSelector />
        </div>
        <button className={styles.hideSidebarButton}>
          <HideSidebarIcon />
          Hide Sidebar
        </button>
      </div>
    </aside>
  );
}
