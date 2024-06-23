import styles from "./Login.module.css";
import { Link, useActionData, useLocation, useSubmit } from "react-router-dom";
import { ActionData, ActionRequestJson } from "./login.action";
import {
  LoginFormData,
  useLoginForm,
  LoginForm,
} from "../../components/LoginForm";
import { useState } from "react";
import { Logo } from "../../components/Logo";

export function Login() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") ?? "/";

  const loginForm = useLoginForm();
  const submit = useSubmit();

  const actionData = useActionData() as ActionData;
  const [prevActionData, setPrevActionData] = useState(actionData);
  if (!Object.is(actionData, prevActionData)) {
    setPrevActionData(actionData);
    if (actionData) {
      if (actionData.__typename === "UnauthorizedError") {
        loginForm.setError("root.authorizedError", {
          type: "401",
          message: "Incorrect username and/or password",
        });
      }
    }
  }

  const handleSubmit = (credentials: LoginFormData) => {
    submit(
      {
        credentials,
        redirectTo: from,
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
        <LoginForm form={loginForm} onSubmit={handleSubmit} />
        <Link to={"/signup"} className={styles.signupLink}>
          Create an account
        </Link>
      </div>
    </div>
  );
}
