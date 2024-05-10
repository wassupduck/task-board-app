import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../../auth/auth-provider";

type ActionRequestJson = {
  credentials: { username: string; password: string };
  redirectTo?: string;
};
export type ActionData =
  | Exclude<Awaited<ReturnType<typeof action>>, Response>
  | undefined;

export async function action({ request }: LoaderFunctionArgs) {
  const { credentials, redirectTo } =
    (await request.json()) as ActionRequestJson;

  const resp = await authProvider.login(
    credentials.username,
    credentials.password
  );
  if (resp.__typename !== "LoginSuccess") {
    return resp;
  }

  return redirect(redirectTo || "/");
}
