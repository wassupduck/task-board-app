import { useBoardForm } from "../../components/BoardForm/hook";
import Modal from "../../components/Modal";
import { getFragmentData, graphql } from "../../gql";
import BoardForm from "../../components/BoardForm/BoardForm";
import { useFetcher, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BoardFormData } from "../../components/BoardForm/types";
import { ActionData, ActionRequestJson } from "./action";
import {
  UpdateBoardColumnInput,
  UpdateBoardColumnsPatchAdditionInput,
  UpdateBoardColumnsPatchInput,
} from "../../gql/graphql";
import { useBoard } from "../board/context";

type FetcherData = Exclude<ActionData, Response>;

const EditBoardRoute_BoardFragment = graphql(`
  fragment EditBoardRoute_BoardFragment on Board {
    id
    name
    columns {
      nodes {
        id
        name
      }
    }
  }
`);

export function EditBoard() {
  const navigate = useNavigate();

  const board = getFragmentData(EditBoardRoute_BoardFragment, useBoard());

  const boardForm = useBoardForm({
    defaultValues: {
      name: board.name,
      columns:
        board.columns.nodes.length > 0
          ? board.columns.nodes
          : [{ name: "" }, { name: "" }],
    },
  });
  // Must read all formState values to subscribe to changes
  const { dirtyFields } = boardForm.formState;

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

  const handleSubmit = (editedBoard: BoardFormData) => {
    function updateColumnsPatch(): UpdateBoardColumnsPatchInput {
      const additions: UpdateBoardColumnsPatchAdditionInput[] = [];
      const updates: UpdateBoardColumnInput[] = [];
      const columnOrder: string[] = [];

      const editedBoardColumnIds = new Set<string>();
      editedBoard.columns.forEach((column, idx) => {
        const idAlias = `column.${idx}`;
        if (column.id === undefined) {
          additions.push({ column: { name: column.name }, idAlias });
        } else {
          editedBoardColumnIds.add(column.id);
          // TODO: Only update column if dirty
          updates.push({
            id: column.id,
            patch: { name: column.name },
          });
        }
        columnOrder.push(column.id ?? idAlias);
      });

      const deletions = board.columns.nodes
        .map(({ id }) => id)
        .filter((id) => !editedBoardColumnIds.has(id));

      return {
        additions,
        updates,
        deletions,
        columnOrder,
      };
    }

    const update: ActionRequestJson = {};
    if (dirtyFields.name) {
      update.board = {
        name: editedBoard.name,
      };
    }
    if (dirtyFields.columns) {
      update.columns = updateColumnsPatch();
    }

    fetcher.submit(update, {
      method: "post",
      encType: "application/json",
    });
  };

  return (
    <Modal defaultOpen={true} onOpenChange={() => navigate("..")}>
      <Modal.Trigger />
      <Modal.Content>
        <Modal.Title>Edit Board</Modal.Title>
        <BoardForm
          form={boardForm}
          onSubmit={handleSubmit}
          submitButtonText="Save Changes"
        />
      </Modal.Content>
    </Modal>
  );
}
