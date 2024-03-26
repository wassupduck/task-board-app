/// <reference types="vite-plugin-svgr/client" />
import LogoDark from "../../assets/logo-dark.svg?react";
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import Button from "../Button";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <HeaderLogo />
      <div className={styles.headerMain}>
        <h2 className={styles.heading}>Platform Launch</h2>
        <div className={styles.buttonGroup}>
          <Button disabled>Add New Task</Button>
          <button className={styles.boardActionsButton}>
            <VerticalEllipsisIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

function HeaderLogo() {
  return (
    <a className={styles.headerLogo}>
      <LogoDark />
    </a>
  );
}
