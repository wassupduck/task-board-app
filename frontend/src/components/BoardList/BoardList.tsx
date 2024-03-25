/// <reference types="vite-plugin-svgr/client" />
import clsx from "clsx";
import BoardIcon from "../../assets/icon-board.svg?react";
import styles from "./BoardList.module.css";

export default function BoardList() {
  return (
    <nav>
      <h3 className={styles.heading}>All boards (3)</h3>
      <ul>
        <li>
          <a className={clsx(styles.boardItem, styles.selected)}>
            <BoardIcon />
            <span>Platform Launch</span>
          </a>
        </li>
        <li>
          <p className={styles.boardItem}>
            <BoardIcon />
            <span>Marketing Plan</span>
          </p>
        </li>
        <li>
          <a className={styles.boardItem}>
            <BoardIcon />
            <span>Roadmap</span>
          </a>
        </li>
        <li>
          <a className={clsx(styles.boardItem, styles.newBoardItem)}>
            <BoardIcon />
            <span>Create New Board</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
