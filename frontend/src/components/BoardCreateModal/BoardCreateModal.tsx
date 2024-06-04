import Modal from "../Modal";
import { useFetcher } from "react-router-dom";
import React, { useState } from "react";
import { BoardsRouteActionData } from "../../routes/boards";
import { useBoardForm } from "../BoardForm/hook";
import { BoardFormData } from "../BoardForm/types";
import BoardForm from "../BoardForm/BoardForm";

type FetcherData = Exclude<BoardsRouteActionData, Response>;

interface BoardCreateModalProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export default function BoardCreateModal(props: BoardCreateModalProps) {
  const boardForm = useBoardForm({
    defaultValues: {
      columns: [{ name: "" }, { name: "" }],
    },
  });

  const fetcher = useFetcher<FetcherData>();

  const [prevFetcherData, setPrevFetcherData] = useState(fetcher.data);
  if (!Object.is(fetcher.data, prevFetcherData)) {
    setPrevFetcherData(fetcher.data);
    if (fetcher.data) {
      if (fetcher.data.__typename === "BoardNameConflictError") {
        const boardName = boardForm.getValues("name");
        boardForm.setError("name", {
          type: "conflict",
          message: `Board with name "${boardName}" already exists`,
        });
      }
    }
  }

  const handleSubmit = (board: BoardFormData) => {
    fetcher.submit(board, {
      method: "post",
      action: "boards",
      encType: "application/json",
    });
  };

  return (
    <Modal onOpenChange={props.onOpenChange}>
      <Modal.Trigger asChild>{props.children}</Modal.Trigger>
      <Modal.Content>
        <Modal.Title>Add New Board</Modal.Title>
        <BoardForm
          form={boardForm}
          onSubmit={handleSubmit}
          submitButtonText="Create New Board"
        />
      </Modal.Content>
    </Modal>
  );
}
