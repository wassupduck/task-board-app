/// <reference types="vite-plugin-svgr/client" />
import TextInput from "../TextInput";
import Button from "../Button";
import styles from "./SignupForm.module.css";
import { preventLeadingSpaces } from "../../utils";
import { UseSignupFormReturn, SignupFormData } from "./types";

export interface SignupFormProps {
  form: UseSignupFormReturn;
  onSubmit: (board: SignupFormData) => void;
}

export default function SignupForm(props: SignupFormProps) {
  const { form } = props;
  const { register, handleSubmit, formState } = form;
  // Must read all formState values to subscribe to changes
  const { errors } = formState;

  return (
    <form className={styles.form} onSubmit={handleSubmit(props.onSubmit)}>
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
      <div>
        <label htmlFor="confirm" className="form-label">
          Confirm password
        </label>
        {errors.confirm && (
          <p className="invalid-feedback" role="alert">
            {errors.confirm.message}
          </p>
        )}
        <TextInput
          id="confirm"
          type="password"
          {...register("confirm")}
          aria-invalid={errors.confirm ? "true" : "false"}
        />
      </div>
      <Button type="submit" block={true}>
        Signup
      </Button>
    </form>
  );
}
