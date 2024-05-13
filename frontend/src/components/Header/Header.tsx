/// <reference types="vite-plugin-svgr/client" />
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import Button from "../Button";
import styles from "./Header.module.css";
import { getFragmentData, graphql } from "../../gql";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBoardRouteLoaderData } from "../../routes/board";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { boardRouteQuery } from "../../routes/board/queries";
import { Logo } from "../Logo/Logo";
import * as Popover from "@radix-ui/react-popover";
import VisuallyHidden from "../VisuallyHidden";

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
          <Logo />
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
    id
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
  const navigate = useNavigate();

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
        <Button
          disabled={board.columns.totalCount === 0}
          size="large"
          onClick={() =>
            navigate(`boards/${board.id}/tasks/new`, { replace: true })
          }
        >
          Add New Task
        </Button>
        <BoardActionsPopover boardId={props.boardId} />
      </div>
    </>
  );
}

interface BoardAcionsPopoverProps {
  boardId: string;
}

function BoardActionsPopover(props: BoardAcionsPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.boardActionsButton}>
          <VisuallyHidden>Board Actions</VisuallyHidden>
          <VerticalEllipsisIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={16}
          className={styles.boardActionsPopoverContent}
        >
          <Link
            to={`boards/${props.boardId}/edit`}
            className={styles.boardActionButton}
          >
            Edit Board
          </Link>
          <button className={clsx(styles.boardActionButton, styles.danger)}>
            Delete Board
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
