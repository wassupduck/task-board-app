import { redirect } from "react-router-dom";
import { authProvider } from "../../auth/auth-provider";

export const action = async () => {
  await authProvider.logout();
  return redirect("/");
};
