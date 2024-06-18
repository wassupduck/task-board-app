/// <reference types="vite-plugin-svgr/client" />
import CrossIcon from "../../assets/icon-cross.svg?react";
import styles from "./TaskForm.module.css";
import TextInput from "../TextInput";
import Button from "../Button";
import VisuallyHidden from "../VisuallyHidden";
import { Controller, useFieldArray } from "react-hook-form";
import { preventLeadingSpaces } from "../../utils";
import { TaskFormData, UseTaskFormReturn } from "./types";
import { Select, SelectItem } from "../Select";
import { FragmentType, getFragmentData, graphql } from "../../gql";

const TaskForm_BoardFragment = graphql(`
  fragment TaskForm_BoardFragment on Board {
    columns {
      nodes {
        id
        name
      }
    }
  }
`);

export interface TaskFormProps {
  form: UseTaskFormReturn;
  board: FragmentType<typeof TaskForm_BoardFragment>;
  onSubmit: (task: TaskFormData) => void;
  submitButtonText: string;
  disableSubmit?: boolean;
}

export default function TaskForm(props: TaskFormProps) {
  const { form } = props;
  const { register, control, handleSubmit, formState } = form;
  // Must read all formState values to subscribe to changes
  const { errors } = formState;
  // const isValid = formState.isValid && Object.keys(errors).length === 0;

  const board = getFragmentData(TaskForm_BoardFragment, props.board);

  return (
    <form
      className={styles.form}
      onSubmit={(event) => void handleSubmit(props.onSubmit)(event)}
    >
      <div>
        <label htmlFor="title" className="form-label">
          Title
        </label>
        {errors.title && (
          <p className="invalid-feedback" role="alert">
            {errors.title.message}
          </p>
        )}
        <TextInput
          id="title"
          placeholder="e.g. Take coffee break"
          {...register("title")}
          aria-invalid={errors.title ? "true" : "false"}
          onKeyDown={preventLeadingSpaces}
        />
      </div>
      <div>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        {errors.description && (
          <p className="invalid-feedback" role="alert">
            {errors.description.message}
          </p>
        )}
        <textarea
          id="description"
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          {...register("description")}
          aria-invalid={errors.description ? "true" : "false"}
          onKeyDown={preventLeadingSpaces}
          className={styles.description}
        />
      </div>
      <fieldset>
        <legend className="form-label">Subtasks</legend>
        <SubtasksList form={form} />
      </fieldset>
      <div>
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <Controller
          name="boardColumnId"
          control={control}
          render={({ field }) => (
            <Select id="status" {...field} onValueChange={field.onChange}>
              {board.columns.nodes.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.name}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      <Button type="submit" block={true} disabled={props.disableSubmit}>
        {props.submitButtonText}
      </Button>
    </form>
  );
}

interface SubtasksListProps {
  form: UseTaskFormReturn;
}

function SubtasksList(props: SubtasksListProps) {
  const { form } = props;
  const { register, trigger, setValue, watch, control, formState } = form;
  // Must read all formState values to subscribe to changes
  const { isSubmitted, errors } = formState;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "subtasks",
  });
  const watchSubtask0Title = watch("subtasks.0.title");

  return (
    <>
      <div className={styles.subtaskListContainer}>
        <ol className={styles.subtaskList}>
          {fields.map((field, idx) => {
            const fieldName = `subtasks.${idx}.title` as const;
            const fieldProps = register(fieldName);
            return (
              <li key={field.id} className={styles.subtaskListItem}>
                <label style={{ flex: 1 }}>
                  <VisuallyHidden>Subtask {idx + 1}</VisuallyHidden>
                  {errors.subtasks?.[idx]?.title && (
                    <p className="invalid-feedback" role="alert">
                      {errors.subtasks[idx]?.title?.message}
                    </p>
                  )}
                  <TextInput
                    {...fieldProps}
                    onChange={(e) => {
                      void (async () => {
                        await fieldProps.onChange(e);
                        isSubmitted && void trigger("subtasks");
                      })();
                    }}
                    placeholder={
                      ["e.g. Make coffee", "e.g. Drink coffee & smile"][idx] ??
                      "e.g. Back to work"
                    }
                    aria-invalid={
                      errors.subtasks?.[idx]?.title ? "true" : "false"
                    }
                    onKeyDown={preventLeadingSpaces}
                  />
                </label>
                <button
                  type="button"
                  className={styles.deleteSubtaskButton}
                  disabled={fields.length === 1 && watchSubtask0Title === ""}
                  onClick={() => {
                    fields.length === 1
                      ? setValue(fieldName, "", { shouldDirty: true })
                      : remove(idx);
                    isSubmitted && void trigger("subtasks");
                  }}
                >
                  <CrossIcon width="15" />
                  <VisuallyHidden>Delete subtask</VisuallyHidden>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <Button
        type="button"
        block={true}
        variant="secondary"
        onClick={() => append({ title: "" })}
      >
        Add New Subtask
      </Button>
    </>
  );
}
