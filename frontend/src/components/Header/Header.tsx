/// <reference types="vite-plugin-svgr/client" />
import LogoDark from "../../assets/logo-dark.svg?react";
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import Button from "../Button";
import styles from "./Header.module.css";
import { getFragmentData, graphql } from "../../gql";
import { Link, useParams } from "react-router-dom";
import invariant from "tiny-invariant";
import { useBoardRouteLoaderData } from "../../routes/board";
import clsx from "clsx";

interface HeaderProps {
  sidebarHidden: boolean;
}

export default function Header(props: HeaderProps) {
  const onBoardRoute = "boardId" in useParams();
  return (
    <header className={styles.wrapper}>
      <div
        className={clsx(
          styles.headerLeft,
          props.sidebarHidden && styles.sidebarHidden
        )}
      >
        <Link to="/" className={styles.siteLogo}>
          <LogoDark />
        </Link>
      </div>
      <div className={styles.headerMain}>{onBoardRoute && <BoardHeader />}</div>
    </header>
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
      <h2 className={styles.boardHeading}>{board.name}</h2>
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
