/// <reference types="vite-plugin-svgr/client" />
import TextInput from "../TextInput";
import Button from "../Button";
import styles from "./LoginForm.module.css";
import { preventLeadingSpaces } from "../../utils";
import { UseLoginFormReturn, LoginFormFieldValues } from "./types";

export interface LoginFormProps {
  form: UseLoginFormReturn;
  onSubmit: (board: LoginFormFieldValues) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const { form } = props;
  const { register, handleSubmit, formState } = form;
  // Must read all formState values to subscribe to changes
  const { errors, isValid } = formState;

  return (
    <form className={styles.form} onSubmit={handleSubmit(props.onSubmit)}>
      {errors.root?.authorizedError && (
        <p className={styles.invalidFeedback} role="alert">
          {errors.root.authorizedError.message}
        </p>
      )}
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
      <Button type="submit" block={true} disabled={!isValid}>
        Login
      </Button>
    </form>
  );
}
