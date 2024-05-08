import { ActionFunctionArgs, redirect } from "react-router-dom";
import { signup } from "./queries";
import { authProvider } from "../../auth/auth-provider";

export type ActionData = Awaited<ReturnType<typeof action>>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const newUser = await request.json();

  const resp = await signup(newUser);
  if (resp.__typename !== "SignupSuccess") {
    return resp;
  }

  authProvider.setUser(resp.user);
  return redirect("/");
};
