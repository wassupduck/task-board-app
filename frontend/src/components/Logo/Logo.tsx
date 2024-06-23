/// <reference types="vite-plugin-svgr/client" />
import LogoDark from "../../assets/logo-dark.svg?react";
import LogoLight from "../../assets/logo-light.svg?react";
import LogoMobile from "../../assets/logo-mobile.svg?react";
import useTheme from "../../hooks/use-theme.hook";

interface LogoProps {
  mobile?: boolean;
}

export function Logo({ mobile = false }: LogoProps) {
  const [theme] = useTheme();
  return mobile ? (
    <LogoMobile />
  ) : theme === "light" ? (
    <LogoDark />
  ) : (
    <LogoLight />
  );
}

export default Logo;
