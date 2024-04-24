/// <reference types="vite-plugin-svgr/client" />
import CrossIcon from "../../assets/icon-cross.svg?react";
import ChevronUpIcon from "../../assets/icon-chevron-up.svg?react";
import ChevronDownIcon from "../../assets/icon-chevron-down.svg?react";
import TextInput from "../TextInput";
import Button from "../Button";
import Modal from "../Modal";
import VisuallyHidden from "../VisuallyHidden";
import styles from "./BoardCreateModal.module.css";
import { graphql } from "../../gql";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateBoardMutationMutation, NewBoardInput } from "../../gql/graphql";
import request from "graphql-request";
import clsx from "clsx";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createBoardMutationDocument = graphql(`
  mutation CreateBoardMutation($board: NewBoardInput!) {
    createBoard(input: { board: $board }) {
      __typename
      ... on ErrorResponse {
        message
      }
    }
  }
`);

function useCreateBoardMutation(props: {
  onSuccess?: (data: CreateBoardMutationMutation["createBoard"]) => void;
}): UseMutationResult<
  CreateBoardMutationMutation["createBoard"],
  Error,
  NewBoardInput
> {
  return useMutation({
    mutationFn: async (board: NewBoardInput) => {
      const resp = await request(
        import.meta.env.VITE_BACKEND_GRAPHQL_URL,
        createBoardMutationDocument,
        { board }
      );
      return resp.createBoard;
    },
    onSuccess: (data) => {
      props.onSuccess?.(data);
    },
  });
}

const createBoardFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name must be less than 20 characters" }),
  columns: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .max(20, { message: "Name must be less than 20 characters" }),
      })
    )
    .superRefine((columns, ctx) => {
      // Validate no duplicate column names
      // Exclude empty columns
      const seen = new Set<string>();
      for (const [idx, column] of columns.entries()) {
        if (column.name.length === 0) {
          continue;
        }
        if (seen.has(column.name)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Duplicate column",
            path: [idx, "name"],
          });
        } else {
          seen.add(column.name);
        }
      }
    })
    .superRefine((columns, ctx) => {
      // Validate no interspersed empty columns
      const lastNonEmptyColumnIdx = columns.findLastIndex(
        ({ name }) => name.length > 0
      );

      const invalidEmptyColumnIdxs = columns
        .slice(0, lastNonEmptyColumnIdx + 1)
        .map(({ name }, idx) => (name.length === 0 ? idx : null))
        .filter((i) => i !== null);

      for (const idx of invalidEmptyColumnIdxs) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: true,
          message: "Name is required",
          path: [idx, "name"],
        });
      }
    })
    .transform((columns) => columns.filter(({ name }) => name.length > 0)),
});

function preventLeadingSpaces(event: React.KeyboardEvent<HTMLInputElement>) {
  const target = event.target as HTMLInputElement;
  if (event.key === " " && target.selectionStart === 0) {
    event.preventDefault();
  }
}

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

  const createBoardMutation = useCreateBoardMutation({
    onSuccess: (data) => {
      if (data.__typename === "CreateBoardSuccess") {
        // TODO: Navigate to new board
        props.onClose();
        return;
      }
      if (data.__typename === "BoardNameConflictError") {
        const boardName = form.getValues("name");
        form.setError("name", {
          type: "conflict",
          message: `Board with name "${boardName}" already exists`,
        });
      }
    },
  });

  const handleSubmit: SubmitHandler<NewBoardInput> = (board) => {
    createBoardMutation.mutate(board);
  };

  return (
    <Modal onClose={props.onClose}>
      <Modal.Title>Add New Board</Modal.Title>
      <form className={styles.form} onSubmit={form.handleSubmit(handleSubmit)}>
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
