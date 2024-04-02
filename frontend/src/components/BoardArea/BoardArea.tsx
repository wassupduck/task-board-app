import Button from "../Button";
import styles from "./BoardArea.module.css";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { Board } from "../Board/Board";

const BoardArea_BoardFragment = graphql(`
  fragment BoardArea_BoardFragment on Board {
    columns {
      id
    }
    ...Board_BoardFragment
  }
`);

export interface BoardAreaProps {
  board?: FragmentType<typeof BoardArea_BoardFragment>;
}

export default function BoardArea(props: BoardAreaProps) {
  const board = getFragmentData(BoardArea_BoardFragment, props.board);
  return (
    <main className={styles.wrapper}>
      {board &&
        (board.columns.length > 0 ? <Board board={board} /> : <EmptyBoard />)}
    </main>
  );
}

function EmptyBoard() {
  return (
    <div className={styles.emptyBoardWrapper}>
      <p className={styles.emptyBoardMessage}>
        This board is empty. Create a new column to get started.
      </p>
      <Button>Add New Column</Button>
    </div>
  );
}
