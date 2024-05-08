/// <reference types="vite-plugin-svgr/client" />
import TextInput from "../TextInput";
import Button from "../Button";
import styles from "./SignupForm.module.css";
import { preventLeadingSpaces } from "../../utils";
import { UseSignupFormReturn, SignupFormFieldValues } from "./types";

export interface SignupFormProps {
  form: UseSignupFormReturn;
  onSubmit: (board: SignupFormFieldValues) => void;
}

export default function SignupForm(props: SignupFormProps) {
  const { form } = props;
  const { register, handleSubmit, formState } = form;
  // Must read all formState values to subscribe to changes
  const { errors } = formState;
  const isValid = formState.isValid && Object.keys(errors).length === 0;

  return (
    <form className={styles.form} onSubmit={handleSubmit(props.onSubmit)}>
      <label>
        <h4 className={styles.label}>Username</h4>
        {errors.username && (
          <p className={styles.invalidFeedback} role="alert">
            {errors.username.message}
          </p>
        )}
        <TextInput
          {...register("username")}
          aria-invalid={errors.username ? "true" : "false"}
          onKeyDown={preventLeadingSpaces}
        />
      </label>
      <label>
        <h4 className={styles.label}>Password</h4>
        {errors.password && (
          <p className={styles.invalidFeedback} role="alert">
            {errors.password.message}
          </p>
        )}
        <TextInput
          type="password"
          {...register("password")}
          aria-invalid={errors.password ? "true" : "false"}
        />
      </label>
      <label>
        <h4 className={styles.label}>Confirm password</h4>
        {errors.confirm && (
          <p className={styles.invalidFeedback} role="alert">
            {errors.confirm.message}
          </p>
        )}
        <TextInput
          type="password"
          {...register("confirm")}
          aria-invalid={errors.confirm ? "true" : "false"}
        />
      </label>
      <Button type="submit" block={true} disabled={!isValid}>
        Signup
      </Button>
    </form>
  );
}
