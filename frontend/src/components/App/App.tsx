import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import request from "graphql-request";
import styles from "./App.module.css";
import BoardArea from "../BoardArea";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { graphql } from "../../gql";
import { AllBoardsQueryQuery } from "../../gql/graphql";

const allBoardsQueryKey = ["boards"] as const;

const allBoardsQuery = graphql(`
  query AllBoardsQuery {
    boards {
      id
      ...BoardList_BoardFragment
    }
  }
`);

const boardQueryKey = (boardId: string) => ["boards", boardId] as const;

const boardQuery = graphql(`
  query BoardQuery($id: ID!) {
    board(id: $id) {
      id
      ...Header_BoardFragment
      ...BoardArea_BoardFragment
    }
  }
`);

function App() {
  const queryClient = useQueryClient();

  // Todo: pending and error handling
  const { data: allBoardsQueryData } = useQuery({
    queryKey: allBoardsQueryKey,
    queryFn: async () =>
      request(import.meta.env.VITE_BACKEND_GRAPHQL_URL, allBoardsQuery),
  });

  const [currentBoardId, setCurrentBoardId] = useState<string | undefined>(
    undefined
  );
  // Update currentBoardId state while rendering to skip rendering of stale state
  const [prevAllBoardsQueryData, setPrevAllBoardsQueryData] = useState<
    AllBoardsQueryQuery | undefined
  >(undefined);
  if (allBoardsQueryData !== prevAllBoardsQueryData) {
    setPrevAllBoardsQueryData(allBoardsQueryData);
    if (
      allBoardsQueryData === undefined ||
      allBoardsQueryData.boards.length === 0
    ) {
      setCurrentBoardId(undefined);
    } else {
      if (
        currentBoardId === undefined ||
        allBoardsQueryData.boards.findIndex(
          (board) => board.id === currentBoardId
        ) < 0
      ) {
        setCurrentBoardId(allBoardsQueryData.boards[0].id);
      }
    }
  }

  // TODO: pending and error handling
  const { data: currentBoardQueryData } = useQuery({
    queryKey: boardQueryKey(currentBoardId!),
    queryFn: async () =>
      request(import.meta.env.VITE_BACKEND_GRAPHQL_URL, boardQuery, {
        id: currentBoardId!,
      }),
    enabled: currentBoardId !== undefined,
  });

  const boards = allBoardsQueryData?.boards ?? [];
  const currentBoard = currentBoardQueryData?.board ?? undefined;

  return (
    <div className={styles.wrapper}>
      <Header currentBoard={currentBoard} />
      <Sidebar
        boards={boards}
        selectedBoardId={currentBoardId}
        onChangeBoard={(boardId) => setCurrentBoardId(boardId)}
      />
      <BoardArea
        currentBoard={currentBoard}
        invalidateBoardQuery={() =>
          currentBoard &&
          queryClient.invalidateQueries({
            queryKey: boardQueryKey(currentBoard.id),
          })
        }
      />
    </div>
  );
}

export default App;
