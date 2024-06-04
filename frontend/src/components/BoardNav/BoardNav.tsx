/// <reference types="vite-plugin-svgr/client" />
import BoardIcon from "../../assets/icon-board.svg?react";
import styles from "./BoardNav.module.css";
import clsx from "clsx";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { NavLink } from "react-router-dom";
import BoardCreateModal from "../BoardCreateModal";
import { CSSProperties } from "react";

const BoardNav_QueryFragment = graphql(`
  fragment BoardNav_QueryFragment on Query {
    boards {
      id
      name
    }
  }
`);

export interface BoardNavProps {
  query: FragmentType<typeof BoardNav_QueryFragment>;
  onModalOpenChange?: (open: boolean) => void;
  activeLinkOffset?: string;
}

export default function BoardNav(props: BoardNavProps) {
  const query = getFragmentData(BoardNav_QueryFragment, props.query);
  const boards = query.boards;

  return (
    <nav>
      <h3 className={styles.heading}>All boards ({boards.length})</h3>
      <ul className={styles.boardList}>
        {boards.map((board) => (
          <li key={board.id}>
            <NavLink
              to={`boards/${board.id}`}
              className={({ isActive }) =>
                clsx(styles.boardItem, isActive && styles.active)
              }
              style={
                {
                  "--board-item-active-offset": props.activeLinkOffset,
                } as CSSProperties
              }
            >
              <BoardIcon />
              <span>{board.name}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <BoardCreateModal onOpenChange={props.onModalOpenChange}>
            <button className={clsx(styles.createBoardButton)}>
              <div className={styles.boardItem}>
                <BoardIcon />
                <span>Create New Board</span>
              </div>
            </button>
          </BoardCreateModal>
        </li>
      </ul>
    </nav>
  );
}
