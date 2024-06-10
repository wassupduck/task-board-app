import { useFetcher } from "react-router-dom";

export default function useLogout() {
  const fetcher = useFetcher();
  return () => {
    fetcher.submit(null, {
      method: "post",
      action: "/logout",
    });
  };
}
