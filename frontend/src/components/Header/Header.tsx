/// <reference types="vite-plugin-svgr/client" />
import LogoDark from "../../assets/logo-dark.svg?react";
import Button from "../Button";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <HeaderLogo />
      <div className={styles.headerMain}>
        <h2 className={styles.heading}>Platform Launch</h2>
        <Button>Add New Task</Button>
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
