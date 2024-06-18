/// <reference types="vite-plugin-svgr/client" />
import TextInput from "../TextInput";
import Button from "../Button";
import styles from "./LoginForm.module.css";
import { preventLeadingSpaces } from "../../utils";
import { UseLoginFormReturn, LoginFormData } from "./types";

export interface LoginFormProps {
  form: UseLoginFormReturn;
  onSubmit: (board: LoginFormData) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const { form } = props;
  const { register, handleSubmit, formState } = form;
  // Must read all formState values to subscribe to changes
  const { errors } = formState;

  return (
    <form
      className={styles.form}
      onSubmit={(event) => void handleSubmit(props.onSubmit)(event)}
    >
      {errors.root?.authorizedError && (
        <p className="invalid-feedback" role="alert">
          {errors.root.authorizedError.message}
        </p>
      )}
      <div>
        <label htmlFor="username" className="form-label">
          Username
        </label>
        {errors.username && (
          <p className="invalid-feedback" role="alert">
            {errors.username.message}
          </p>
        )}
        <TextInput
          id="username"
          {...register("username")}
          aria-invalid={errors.username ? "true" : "false"}
          onKeyDown={preventLeadingSpaces}
        />
      </div>
      <div>
        <label htmlFor="password" className="form-label">
          Password
        </label>
        {errors.password && (
          <p className="invalid-feedback" role="alert">
            {errors.password.message}
          </p>
        )}
        <TextInput
          id="password"
          type="password"
          {...register("password")}
          aria-invalid={errors.password ? "true" : "false"}
        />
      </div>
      <Button type="submit" block={true}>
        Login
      </Button>
    </form>
  );
}
