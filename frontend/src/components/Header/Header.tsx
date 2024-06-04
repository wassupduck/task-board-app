/// <reference types="vite-plugin-svgr/client" />
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg?react";
import AddTaskMobileIcon from "../../assets/icon-add-task-mobile.svg?react";
import Button from "../Button";
import styles from "./Header.module.css";
import breakpoints from "../../breakpoints.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { Link, useNavigate } from "react-router-dom";
import { useBoardRouteLoaderData } from "../../routes/board";
import clsx from "clsx";
import { Logo } from "../Logo/Logo";
import * as Popover from "@radix-ui/react-popover";
import VisuallyHidden from "../VisuallyHidden";
import { BoardDeleteModal } from "../BoardDeleteModal/BoardDeleteModal";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useState } from "react";

const Header_QueryFragment = graphql(`
  fragment Header_QueryFragment on Query {
    ...MobileMenu_QueryFragment
    ...BoardHeader_QueryFragment
  }
`);

interface HeaderProps {
  sidebarHidden: boolean;
  query: FragmentType<typeof Header_QueryFragment>;
}

export default function Header(props: HeaderProps) {
  const isMobile = useMediaQuery(breakpoints.mobileAndSmaller);

  const query = getFragmentData(Header_QueryFragment, props.query);

  const boardRouteData = useBoardRouteLoaderData();
  const board = boardRouteData?.board;

  return (
    <header className={styles.wrapper}>
      <div
        className={clsx(
          styles.sidebarHeader,
          props.sidebarHidden && styles.sidebarHidden
        )}
      >
        <div className={styles.siteLogo}>
          <Logo />
        </div>
      </div>
      <div className={styles.mainHeader}>
        <div className={styles.mobileSiteLogo}>
          <Logo mobile={true} />
        </div>
        {board ? (
          <BoardHeader board={board} query={query} />
        ) : (
          isMobile && <MobileMenu query={query}>Menu</MobileMenu>
        )}
      </div>
    </header>
  );
}

const BoardHeader_QueryFragment = graphql(`
  fragment BoardHeader_QueryFragment on Query {
    ...MobileMenu_QueryFragment
  }
`);

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
  board: FragmentType<typeof BoardHeader_BoardFragment>;
  query: FragmentType<typeof BoardHeader_QueryFragment>;
}

function BoardHeader(props: BoardHeaderProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(breakpoints.mobileAndSmaller);

  const board = getFragmentData(BoardHeader_BoardFragment, props.board);
  const query = getFragmentData(BoardHeader_QueryFragment, props.query);

  const heading = <h2 className={styles.boardHeading}>{board.name}</h2>;
  return (
    <div className={styles.boardHeaderWrapper}>
      {isMobile ? <MobileMenu query={query}>{heading}</MobileMenu> : heading}
      <div className={styles.buttonGroup}>
        <Button
          disabled={board.columns.totalCount === 0}
          size={isMobile ? "small" : "large"}
          onClick={() =>
            navigate(`boards/${board.id}/tasks/new`, { replace: true })
          }
          style={{ whiteSpace: "nowrap" }}
        >
          {isMobile ? (
            <AddTaskMobileIcon style={{ minWidth: "12px" }} />
          ) : (
            "Add New Task"
          )}
        </Button>
        <BoardActionsPopover board={board} />
      </div>
    </div>
  );
}

interface BoardActionsPopoverProps {
  board: {
    id: string;
    name: string;
  };
}

function BoardActionsPopover(props: BoardActionsPopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hasOpenModal, setHasOpenModal] = useState(false);
  const isTabletOrSmaller = useMediaQuery(breakpoints.tabletAndSmaller);
  const isMobileOrSmaller = useMediaQuery(breakpoints.mobileAndSmaller);

  function handleModalActionOpenChange(open: boolean) {
    setHasOpenModal(open);
    if (open === false) {
      setPopoverOpen(false);
    }
  }

  return (
    <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
      <Popover.Trigger asChild>
        <button className={styles.boardActionsButton}>
          <VisuallyHidden>Board Actions</VisuallyHidden>
          <VerticalEllipsisIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={isMobileOrSmaller ? 24 : isTabletOrSmaller ? 28 : 32}
          className={clsx(
            styles.boardActionsPopoverContent,
            hasOpenModal && styles.hidden
          )}
        >
          <ul className={styles.boardActionList}>
            <li>
              <Link
                to={`boards/${props.board.id}/edit`}
                className={styles.boardActionButton}
              >
                Edit Board
              </Link>
            </li>
            <li>
              <BoardDeleteModal
                board={props.board}
                onOpenChange={handleModalActionOpenChange}
              >
                <button
                  className={clsx(styles.boardActionButton, styles.danger)}
                >
                  Delete Board
                </button>
              </BoardDeleteModal>
            </li>
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
