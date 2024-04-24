/// <reference types="vite-plugin-svgr/client" />
import clsx from "clsx";
import BoardIcon from "../../assets/icon-board.svg?react";
import styles from "./BoardList.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { useState } from "react";
import BoardCreateModal from "../BoardCreateModal";

const BoardList_BoardFragment = graphql(`
  fragment BoardList_BoardFragment on Board {
    id
    name
  }
`);

export interface BoardListProps {
  boards: FragmentType<typeof BoardList_BoardFragment>[];
  selectedBoardId: string | undefined;
  onChangeBoard: (boardId: string) => void;
}

export default function BoardList(props: BoardListProps) {
  const boards = getFragmentData(BoardList_BoardFragment, props.boards);

  // TODO: Move to better place - just for testing
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);

  return (
    <nav>
      <h3 className={styles.heading}>All boards ({boards.length})</h3>
      <ul className={styles.boardList}>
        {boards.map((board) => (
          <li key={board.id}>
            <a
              className={clsx(
                styles.boardItem,
                board.id === props.selectedBoardId && styles.selected
              )}
              onClick={() => props.onChangeBoard(board.id)}
            >
              <BoardIcon />
              <span>{board.name}</span>
            </a>
          </li>
        ))}
        <li>
          <button
            className={clsx(styles.boardItem, styles.createBoardItem)}
            onClick={() => setIsCreateBoardModalOpen(true)}
          >
            <BoardIcon />
            <span>Create New Board</span>
          </button>
        </li>
      </ul>
      {/* TODO: Move to better place - just for testing! */}
      {isCreateBoardModalOpen && (
        <BoardCreateModal onClose={() => setIsCreateBoardModalOpen(false)} />
      )}
    </nav>
  );
}
