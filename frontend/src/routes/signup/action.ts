import { ActionFunctionArgs, redirect } from "react-router-dom";
import { signup } from "./queries";
import { authProvider } from "../../auth/auth-provider";
import { NewUserInput } from "../../gql/graphql";

export type ActionRequestJson = NewUserInput;
export type ActionData =
  | Exclude<Awaited<ReturnType<typeof action>>, Response>
  | undefined;

export const action = async ({ request }: ActionFunctionArgs) => {
  const newUser = (await request.json()) as ActionRequestJson;

  const resp = await signup(newUser);
  if (resp.__typename !== "SignupSuccess") {
    return resp;
  }

  authProvider.setUser(resp.user);
  return redirect("/");
};
