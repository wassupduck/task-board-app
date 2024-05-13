/// <reference types="vite-plugin-svgr/client" />
import LogoDark from "../../assets/logo-dark.svg?react";
import LogoLight from "../../assets/logo-light.svg?react";
import useTheme from "../../hooks/useTheme";

export function Logo() {
  const [theme] = useTheme();
  return theme === "light" ? <LogoDark /> : <LogoLight />;
}
