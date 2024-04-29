/// <reference types="vite-plugin-svgr/client" />
import CrossIcon from "../../assets/icon-cross.svg?react";
import ChevronUpIcon from "../../assets/icon-chevron-up.svg?react";
import ChevronDownIcon from "../../assets/icon-chevron-down.svg?react";
import TextInput from "../TextInput";
import Button from "../Button";
import Modal from "../Modal";
import VisuallyHidden from "../VisuallyHidden";
import styles from "./BoardCreateModal.module.css";
import { NewBoardInput } from "../../gql/graphql";
import clsx from "clsx";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBoardFormSchema } from "./schema";
import { useFetcher } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { preventLeadingSpaces } from "../../utils";
import { BoardsRouteActionData } from "../../routes/boards";

type FetcherData = Exclude<BoardsRouteActionData, Response>;

interface BoardCreateModalProps {
  onClose: () => void;
}

export default function BoardCreateModal(props: BoardCreateModalProps) {
  const form = useForm<NewBoardInput>({
    resolver: zodResolver(createBoardFormSchema),
    defaultValues: {
      columns: [{ name: "" }, { name: "" }],
    },
  });
  const { formState } = form;
  const fetcher = useFetcher<FetcherData>();

  const [prevFetcherData, setPrevFetcherData] = useState(fetcher.data);
  if (!Object.is(fetcher.data, prevFetcherData)) {
    setPrevFetcherData(fetcher.data);
    if (fetcher.data) {
      if (fetcher.data.__typename === "BoardNameConflictError") {
        const boardName = form.getValues("name");
        form.setError("name", {
          type: "conflict",
          message: `Board with name "${boardName}" already exists`,
        });
      }
    }
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    if (form.formState.isSubmitted && !form.formState.isValid) {
      return e.preventDefault();
    }
    return form.handleSubmit((board) => {
      fetcher.submit(board, {
        method: "post",
        action: "/boards",
        encType: "application/json",
      });
    })(e);
  };

  return (
    <Modal onClose={props.onClose}>
      <Modal.Title>Add New Board</Modal.Title>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <h4 className={styles.label}>Name</h4>
          {formState.errors.name && (
            <p className={styles.invalidFeedback} role="alert">
              {formState.errors.name.message}
            </p>
          )}
          <TextInput
            checked={true}
            placeholder="e.g. Web Design"
            {...form.register("name")}
            aria-invalid={formState.errors.name ? "true" : "false"}
            onKeyDown={preventLeadingSpaces}
          />
        </label>
        <fieldset>
          <legend>
            <h4 className={styles.label}>Columns</h4>
          </legend>
          <BoardColumnsList form={form} />
        </fieldset>
        <Button type="submit" block={true}>
          Create New Board
        </Button>
      </form>
    </Modal>
  );
}

interface BoardColumnsListProps {
  form: UseFormReturn<NewBoardInput>;
}

function BoardColumnsList(props: BoardColumnsListProps) {
  const form = props.form;
  const { formState } = form;
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "columns",
  });
  const watchColumn0Name = form.watch("columns.0.name");

  return (
    <div>
      <ol className={styles.newColumnList}>
        {fields.map((field, idx) => {
          const fieldName = `columns.${idx}.name` as const;
          return (
            <li key={field.id} className={styles.newColumn}>
              <label style={{ flex: 1 }}>
                <VisuallyHidden>Column 1</VisuallyHidden>
                {formState.errors.columns?.[idx]?.name && (
                  <p className={styles.invalidFeedback} role="alert">
                    {formState.errors.columns[idx].name.message}
                  </p>
                )}
                <TextInput
                  {...form.register(fieldName)}
                  placeholder={
                    ["e.g. Todo", "e.g. Doing", "e.g. Done"][idx] ??
                    "e.g. Archive"
                  }
                  aria-invalid={
                    formState.errors.columns?.[idx]?.name ? "true" : "false"
                  }
                  onKeyDown={preventLeadingSpaces}
                />
              </label>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.columnButton}
                  disabled={idx === 0}
                  onClick={() => {
                    move(idx, idx - 1);
                    formState.isSubmitted && form.trigger("columns");
                  }}
                >
                  <ChevronUpIcon width="15" height="15" />
                  <VisuallyHidden>Move column up</VisuallyHidden>
                </button>
                <button
                  type="button"
                  className={styles.columnButton}
                  disabled={idx === fields.length - 1}
                  onClick={() => {
                    move(idx, idx + 1);
                    formState.isSubmitted && form.trigger("columns");
                  }}
                >
                  <ChevronDownIcon width="15" height="15" />
                  <VisuallyHidden>Move column down</VisuallyHidden>
                </button>
                <button
                  type="button"
                  className={clsx(
                    styles.columnButton,
                    styles.deleteColumnButton
                  )}
                  disabled={fields.length === 1 && watchColumn0Name === ""}
                  onClick={() => {
                    fields.length === 1
                      ? form.resetField(fieldName)
                      : remove(idx);
                    formState.isSubmitted && form.trigger("columns");
                  }}
                >
                  <CrossIcon width="15" />
                  <VisuallyHidden>Delete column</VisuallyHidden>
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <Button
        type="button"
        block={true}
        variant="secondary"
        onClick={() => append({ name: "" })}
      >
        Add New Column
      </Button>
    </div>
  );
}
