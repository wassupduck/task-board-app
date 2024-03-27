/// <reference types="vite-plugin-svgr/client" />
import LogoDark from "../../assets/logo-dark.svg?react";
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import Button from "../Button";
import styles from "./Header.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";

const Header_BoardFragment = graphql(`
  fragment Header_BoardFragment on Board {
    name
  }
`);

export interface HeaderProps {
  currentBoard: FragmentType<typeof Header_BoardFragment> | undefined;
}

export default function Header(props: HeaderProps) {
  const currentBoard = getFragmentData(
    Header_BoardFragment,
    props.currentBoard
  );
  return (
    <header className={styles.wrapper}>
      <HeaderLogo />
      <div className={styles.headerMain}>
        <h2 className={styles.heading}>{currentBoard?.name}</h2>
        {currentBoard && (
          <div className={styles.buttonGroup}>
            <Button disabled>Add New Task</Button>
            <button className={styles.boardActionsButton}>
              <VerticalEllipsisIcon />
            </button>
          </div>
        )}
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
