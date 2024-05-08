/// <reference types="vite-plugin-svgr/client" />
import CrossIcon from "../../assets/icon-cross.svg?react";
import ChevronUpIcon from "../../assets/icon-chevron-up.svg?react";
import ChevronDownIcon from "../../assets/icon-chevron-down.svg?react";
import TextInput from "../TextInput";
import Button from "../Button";
import VisuallyHidden from "../VisuallyHidden";
import styles from "./BoardForm.module.css";
import clsx from "clsx";
import { useFieldArray } from "react-hook-form";
import { preventLeadingSpaces } from "../../utils";
import { UseBoardFormReturn, BoardFormFieldValues } from "./types";

export interface BoardFormProps {
  form: UseBoardFormReturn;
  onSubmit: (board: BoardFormFieldValues) => void;
  submitButtonText: string;
}

export default function BoardForm(props: BoardFormProps) {
  const { form } = props;
  const { register, handleSubmit, formState } = form;
  // Must read all formState values to subscribe to changes
  const { errors } = formState;
  const isValid = formState.isValid && Object.keys(errors).length === 0;

  return (
    <form className={styles.form} onSubmit={handleSubmit(props.onSubmit)}>
      <label>
        <h4 className={styles.label}>Name</h4>
        {errors.name && (
          <p className={styles.invalidFeedback} role="alert">
            {errors.name.message}
          </p>
        )}
        <TextInput
          placeholder="e.g. Web Design"
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
          onKeyDown={preventLeadingSpaces}
        />
      </label>
      <fieldset>
        <legend>
          <h4 className={styles.label}>Columns</h4>
        </legend>
        <BoardColumnsList form={form} />
      </fieldset>
      <Button type="submit" block={true} disabled={!isValid}>
        {props.submitButtonText}
      </Button>
    </form>
  );
}

interface BoardColumnsListProps {
  form: UseBoardFormReturn;
}

function BoardColumnsList(props: BoardColumnsListProps) {
  const { form } = props;
  const { register, trigger, setValue, watch, control, formState } = form;
  // Must read all formState values to subscribe to changes
  const { isSubmitted, errors } = formState;

  const { fields, append, remove, swap } = useFieldArray({
    control: control,
    name: "columns",
  });
  const watchColumn0Name = watch("columns.0.name");

  return (
    <div>
      <ol className={styles.newColumnList}>
        {fields.map((field, idx) => {
          const fieldName = `columns.${idx}.name` as const;
          return (
            <li key={field.id} className={styles.newColumn}>
              <label style={{ flex: 1 }}>
                <VisuallyHidden>Column 1</VisuallyHidden>
                {errors.columns?.[idx]?.name && (
                  <p className={styles.invalidFeedback} role="alert">
                    {errors.columns[idx].name.message}
                  </p>
                )}
                <TextInput
                  {...register(fieldName)}
                  placeholder={
                    ["e.g. Todo", "e.g. Doing", "e.g. Done"][idx] ??
                    "e.g. Archive"
                  }
                  aria-invalid={errors.columns?.[idx]?.name ? "true" : "false"}
                  onKeyDown={preventLeadingSpaces}
                />
              </label>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.columnButton}
                  disabled={idx === 0}
                  onClick={() => {
                    swap(idx, idx - 1);
                    isSubmitted && trigger("columns");
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
                    swap(idx, idx + 1);
                    isSubmitted && trigger("columns");
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
                      ? setValue(fieldName, "", { shouldDirty: true })
                      : remove(idx);
                    isSubmitted && trigger("columns");
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
