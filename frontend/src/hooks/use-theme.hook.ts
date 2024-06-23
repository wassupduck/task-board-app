import { useLocalStorage } from "@uidotdev/usehooks";

export default function useTheme() {
  return useLocalStorage("theme", "light");
}
