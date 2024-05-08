import { LoaderFunction, LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "./auth-provider";

function redirectToLogin(request: Request) {
  const params = new URLSearchParams();
  params.set("from", new URL(request.url).pathname);
  return redirect("/login?" + params.toString());
}

export const protectedLoader = <Context = unknown>(
  loader: LoaderFunction<Context>
): LoaderFunction<Context> => {
  return async (args: LoaderFunctionArgs<Context>, handlerCtx?: unknown) => {
    const { request } = args;

    if (!(await authProvider.user())) {
      return redirectToLogin(request);
    }

    let resp,
      caught = false;
    try {
      resp = await loader(args, handlerCtx);
    } catch (error) {
      resp = error;
      caught = true;
    }

    if (resp instanceof Response && resp.status === 401) {
      return redirectToLogin(request);
    }

    if (caught) {
      throw resp;
    }
    return resp;
  };
};
