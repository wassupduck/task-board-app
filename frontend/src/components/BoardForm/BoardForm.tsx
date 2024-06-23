import styles from "./BoardForm.module.css";
import TextInput from "../TextInput";
import Button from "../Button";
import { preventLeadingSpaces } from "../../utils";
import { UseBoardFormReturn, BoardFormData } from "./board-form.types";
import { ColumnList } from "./ColumnList";

export interface BoardFormProps {
  form: UseBoardFormReturn;
  onSubmit: (board: BoardFormData) => void;
  submitButtonText: string;
}

export function BoardForm(props: BoardFormProps) {
  const { form } = props;
  const { register, handleSubmit, formState } = form;
  // Must read all formState values to subscribe to changes
  const { errors } = formState;

  return (
    <form
      className={styles.wrapper}
      onSubmit={(event) => void handleSubmit(props.onSubmit)(event)}
    >
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        {errors.name && (
          <p className="invalid-feedback" role="alert">
            {errors.name.message}
          </p>
        )}
        <TextInput
          id="name"
          placeholder="e.g. Web Design"
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
          onKeyDown={preventLeadingSpaces}
        />
      </div>
      <fieldset>
        <legend className="form-label">Columns</legend>
        <ColumnList form={form} />
      </fieldset>
      <Button type="submit" block={true}>
        {props.submitButtonText}
      </Button>
    </form>
  );
}

export default BoardForm;
