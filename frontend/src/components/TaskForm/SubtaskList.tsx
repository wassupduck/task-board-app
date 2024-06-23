/// <reference types="vite-plugin-svgr/client" />
import CrossIcon from "../../assets/icon-cross.svg?react";
import styles from "./SubtaskList.module.css";
import TextInput from "../TextInput";
import Button from "../Button";
import VisuallyHidden from "../VisuallyHidden";
import { useFieldArray } from "react-hook-form";
import { preventLeadingSpaces } from "../../utils";
import { UseTaskFormReturn } from "./task-form.types";

interface SubtaskListProps {
  form: UseTaskFormReturn;
}

export function SubtaskList(props: SubtaskListProps) {
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
      <div className={styles.listWrapper}>
        <ol className={styles.list}>
          {fields.map((field, idx) => {
            const fieldName = `subtasks.${idx}.title` as const;
            const fieldProps = register(fieldName);
            return (
              <li key={field.id} className={styles.listItem}>
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
                  className={styles.deleteItemButton}
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
