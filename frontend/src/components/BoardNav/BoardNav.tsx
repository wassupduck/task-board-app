/// <reference types="vite-plugin-svgr/client" />
import clsx from "clsx";
import BoardIcon from "../../assets/icon-board.svg?react";
import styles from "./BoardNav.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { NavLink, useNavigate } from "react-router-dom";

const BoardNav_BoardFragment = graphql(`
  fragment BoardNav_QueryFragment on Query {
    boards {
      id
      name
    }
  }
`);

export interface BoardNavProps {
  query: FragmentType<typeof BoardNav_BoardFragment>;
}

export default function BoardNav(props: BoardNavProps) {
  const navigate = useNavigate();
  const query = getFragmentData(BoardNav_BoardFragment, props.query);
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
                clsx(styles.boardItem, isActive && styles.selected)
              }
            >
              <BoardIcon />
              <span>{board.name}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <button
            className={clsx(styles.boardItem, styles.createBoardItem)}
            onClick={() => navigate("?new_board=true")}
          >
            <BoardIcon />
            <span>Create New Board</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
