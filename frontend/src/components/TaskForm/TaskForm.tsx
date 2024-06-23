import styles from "./TaskForm.module.css";
import TextInput from "../TextInput";
import Button from "../Button";
import { Controller } from "react-hook-form";
import { preventLeadingSpaces } from "../../utils";
import { TaskFormData, UseTaskFormReturn } from "./task-form.types";
import Select from "../Select";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { SubtaskList } from "./SubtaskList";

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

export function TaskForm(props: TaskFormProps) {
  const { form } = props;
  const { register, control, handleSubmit, formState } = form;
  // Must read all formState values to subscribe to changes
  const { errors } = formState;
  // const isValid = formState.isValid && Object.keys(errors).length === 0;

  const board = getFragmentData(TaskForm_BoardFragment, props.board);

  return (
    <form
      className={styles.wrapper}
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
        <SubtaskList form={form} />
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
                <Select.Item key={column.id} value={column.id}>
                  {column.name}
                </Select.Item>
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

export default TaskForm;
