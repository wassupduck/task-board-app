/// <reference types="vite-plugin-svgr/client" />
import AddTaskMobileIcon from "../../assets/icon-add-task-mobile.svg?react";
import Button from "../Button";
import styles from "./Header.module.css";
import breakpoints from "../../breakpoints.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { useNavigate } from "react-router-dom";
import { useBoardRouteLoaderData } from "../../routes/board";
import clsx from "clsx";
import { Logo } from "../Logo/Logo";
import { BoardDeleteModal } from "../BoardDeleteModal/BoardDeleteModal";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import PopoverListMenu from "../PopoverListMenu/PopoverListMenu";

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
        <BoardActionsMenu board={board} />
      </div>
    </div>
  );
}

interface BoardActionsMenuProps {
  board: {
    id: string;
    name: string;
  };
}

function BoardActionsMenu(props: BoardActionsMenuProps) {
  const isTabletOrSmaller = useMediaQuery(breakpoints.tabletAndSmaller);
  const isMobileOrSmaller = useMediaQuery(breakpoints.mobileAndSmaller);

  return (
    <PopoverListMenu>
      <PopoverListMenu.Trigger label="Board actions" />
      <PopoverListMenu.List
        align="end"
        sideOffset={isMobileOrSmaller ? 24 : isTabletOrSmaller ? 28 : 32}
      >
        <PopoverListMenu.LinkItem to={`boards/${props.board.id}/edit`}>
          Edit Board
        </PopoverListMenu.LinkItem>
        <PopoverListMenu.ModalItem>
          {({ onOpenChange }) => (
            <BoardDeleteModal board={props.board} onOpenChange={onOpenChange}>
              <PopoverListMenu.Button variant="destructive">
                Delete Board
              </PopoverListMenu.Button>
            </BoardDeleteModal>
          )}
        </PopoverListMenu.ModalItem>
      </PopoverListMenu.List>
    </PopoverListMenu>
  );
}
