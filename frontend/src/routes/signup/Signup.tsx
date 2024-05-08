/// <reference types="vite-plugin-svgr/client" />
import LogoDark from "../../assets/logo-dark.svg?react";
import styles from "./Signup.module.css";
import SignupForm from "../../components/SignupForm/SignupForm";
import { useSignupForm } from "../../components/SignupForm/hook";
import { Link, useActionData, useSubmit } from "react-router-dom";
import { SignupFormFieldValues } from "../../components/SignupForm/types";
import { useState } from "react";
import { ActionData } from "./action";

export function Signup() {
  const signupForm = useSignupForm();
  const submit = useSubmit();

  const actionData = useActionData() as
    | Exclude<ActionData, Response>
    | undefined;

  const [prevActionData, setPrevActionData] = useState(actionData);
  if (!Object.is(actionData, prevActionData)) {
    setPrevActionData(actionData);
    if (actionData) {
      if (actionData.__typename === "UserUsernameConflictError") {
        signupForm.setError("username", {
          type: "conflict",
          message: "Username already taken",
        });
      }
    }
  }

  const handleSubmit = (values: SignupFormFieldValues) => {
    const newUser = { username: values.username, password: values.password };
    submit(newUser, {
      method: "post",
      replace: true,
      encType: "application/json",
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <header className={styles.header}>
          <LogoDark />
        </header>
        <SignupForm form={signupForm} onSubmit={handleSubmit} />
        <Link to={"/login"} className={styles.loginLink}>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
