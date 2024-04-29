/// <reference types="vite-plugin-svgr/client" />
import LogoDark from "../../assets/logo-dark.svg?react";
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import Button from "../Button";
import styles from "./Header.module.css";
import { getFragmentData, graphql } from "../../gql";
import { useParams } from "react-router-dom";
import invariant from "tiny-invariant";
import { useBoardRouteLoaderData } from "../../routes/board";

export default function Header() {
  const onBoardRoute = "boardId" in useParams();
  return (
    <header className={styles.wrapper}>
      <HeaderLogo />
      <div className={styles.headerMain}>{onBoardRoute && <BoardHeader />}</div>
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

const BoardHeader_BoardFragment = graphql(`
  fragment BoardHeader_BoardFragment on Board {
    name
    columns {
      totalCount
    }
  }
`);

function BoardHeader() {
  const data = useBoardRouteLoaderData();
  invariant(data.board, "Board not found");
  const board = getFragmentData(BoardHeader_BoardFragment, data.board);

  return (
    <>
      <h2 className={styles.heading}>{board.name}</h2>
      <div className={styles.buttonGroup}>
        <Button disabled={board.columns.totalCount === 0} size="large">
          Add New Task
        </Button>
        <button className={styles.boardActionsButton}>
          <VerticalEllipsisIcon />
        </button>
      </div>
    </>
  );
}
