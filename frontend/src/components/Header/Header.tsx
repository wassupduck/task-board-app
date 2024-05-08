/// <reference types="vite-plugin-svgr/client" />
import LogoDark from "../../assets/logo-dark.svg?react";
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import Button from "../Button";
import styles from "./Header.module.css";
import { getFragmentData, graphql } from "../../gql";
import { Link, useParams } from "react-router-dom";
import { useBoardRouteLoaderData } from "../../routes/board";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { boardRouteQuery } from "../../routes/board/queries";

interface HeaderProps {
  sidebarHidden: boolean;
}

export default function Header(props: HeaderProps) {
  const params = useParams();

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
      <div className={styles.headerMain}>
        {params.boardId && <BoardHeader boardId={params.boardId} />}
      </div>
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

interface BoardHeaderProps {
  boardId: string;
}

function BoardHeader(props: BoardHeaderProps) {
  const initialData = useBoardRouteLoaderData();
  const { data, isError } = useQuery({
    ...boardRouteQuery(props.boardId),
    initialData,
    throwOnError: false,
  });
  if (isError) return null;

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
