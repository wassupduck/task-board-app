/// <reference types="vite-plugin-svgr/client" />
import HideSidebarIcon from "../../assets/icon-hide-sidebar.svg?react";
import BoardList from "../BoardList";
import ThemeSelector from "../ThemeSelector";
import styles from "./Sidebar.module.css";
import { BoardListProps } from "../BoardList/BoardList";

interface SidebarProps extends BoardListProps {}

export default function Sidebar(props: SidebarProps) {
  return (
    <aside className={styles.wrapper}>
      <BoardList
        boards={props.boards}
        selectedBoardId={props.selectedBoardId}
        onChangeBoard={props.onChangeBoard}
      />
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
