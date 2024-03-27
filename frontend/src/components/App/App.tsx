import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import request from "graphql-request";
import styles from "./App.module.css";
import BoardArea from "../BoardArea";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { graphql } from "../../gql";
import { AllBoardsQueryQuery } from "../../gql/graphql";

const allBoardsQuery = graphql(`
  query allBoardsQuery {
    boards {
      id
      ...BoardList_BoardFragment
      ...Header_BoardFragment
    }
  }
`);

function App() {
  // Todo: pending and error handling
  const { data } = useQuery({
    queryKey: ["boards"],
    queryFn: async () =>
      request(import.meta.env.VITE_BACKEND_GRAPHQL_URL, allBoardsQuery),
  });
  const [currentBoardId, setCurrentBoardId] = useState<string | undefined>(
    undefined
  );

  // Update currentBoardId state while rendering to skip rendering of stale state
  const [prevData, setPrevData] = useState<AllBoardsQueryQuery | undefined>(
    undefined
  );
  if (data !== prevData) {
    setPrevData(data);
    if (data === undefined || data.boards.length === 0) {
      setCurrentBoardId(undefined);
    } else {
      if (
        currentBoardId === undefined ||
        data.boards.findIndex((board) => board.id === currentBoardId) < 0
      ) {
        setCurrentBoardId(data.boards[0].id);
      }
    }
  }

  const boards = data?.boards ?? [];
  const currentBoard = boards.find((board) => board.id === currentBoardId);

  return (
    <div className={styles.wrapper}>
      <Header currentBoard={currentBoard} />
      <Sidebar
        boards={boards}
        selectedBoardId={currentBoardId}
        onChangeBoard={(boardId) => setCurrentBoardId(boardId)}
      />
      <BoardArea />
    </div>
  );
}

export default App;
