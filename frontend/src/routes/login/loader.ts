import { redirect } from "react-router-dom";
import { authProvider } from "../../auth/auth-provider";

export const loader = async () => {
  if (await authProvider.user()) {
    return redirect("/");
  }
  return null;
};
