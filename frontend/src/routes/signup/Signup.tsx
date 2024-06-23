import styles from "./Signup.module.css";
import { Link, useActionData, useSubmit } from "react-router-dom";
import {
  SignupFormData,
  useSignupForm,
  SignupForm,
} from "../../components/SignupForm";
import { useState } from "react";
import { ActionData, ActionRequestJson } from "./signup.action";
import { Logo } from "../../components/Logo";

export function Signup() {
  const signupForm = useSignupForm();
  const submit = useSubmit();

  const actionData = useActionData() as ActionData;
  const [prevActionData, setPrevActionData] = useState(actionData);
  if (!Object.is(actionData, prevActionData)) {
    setPrevActionData(actionData);
    if (actionData) {
      if (actionData.__typename === "UserUsernameConflictError") {
        signupForm.setError("username", {
          type: "conflict",
          message: "Username already taken",
        });
      } else {
        // TODO
        throw actionData;
      }
    }
  }

  const handleSubmit = ({ username, password }: SignupFormData) => {
    submit(
      {
        username,
        password,
      } satisfies ActionRequestJson,
      {
        method: "post",
        replace: true,
        encType: "application/json",
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <header className={styles.header}>
          <Logo />
        </header>
        <SignupForm form={signupForm} onSubmit={handleSubmit} />
        <Link to={"/login"} className={styles.loginLink}>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
