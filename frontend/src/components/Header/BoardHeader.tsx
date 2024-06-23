/// <reference types="vite-plugin-svgr/client" />
import AddTaskMobileIcon from "../../assets/icon-add-task-mobile.svg?react";
import Button from "../Button";
import styles from "./BoardHeader.module.css";
import breakpoints from "../../breakpoints.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MobileMenu } from "../MobileMenu";
import { BoardActionsMenu } from "./BoardActionsMenu";

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

export function BoardHeader(props: BoardHeaderProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(breakpoints.mobileAndSmaller);

  const board = getFragmentData(BoardHeader_BoardFragment, props.board);
  const query = getFragmentData(BoardHeader_QueryFragment, props.query);

  const heading = <h2 className={styles.heading}>{board.name}</h2>;
  return (
    <div className={styles.wrapper}>
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
