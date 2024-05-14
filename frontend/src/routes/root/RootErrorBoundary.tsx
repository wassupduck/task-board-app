import { Navigate, useLocation, useRouteError } from "react-router-dom";

export function RootErrorBoundary() {
  const location = useLocation();
  const error = useRouteError();

  if (error instanceof Response && error.status === 401) {
    const params = new URLSearchParams();
    params.set("from", location.pathname);
    return <Navigate to={"/login?" + params.toString()} />;
  }

  console.log(error);

  return <h1>Something went wrong</h1>;
}
