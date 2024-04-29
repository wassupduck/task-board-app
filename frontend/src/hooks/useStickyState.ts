import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useStickyState<S>(
  defaultValue: S,
  key: string
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? (JSON.parse(stickyValue) as S) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
