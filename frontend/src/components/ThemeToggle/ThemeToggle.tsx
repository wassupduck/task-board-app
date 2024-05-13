/// <reference types="vite-plugin-svgr/client" />
import styles from "./ThemeToggle.module.css";
import LightThemeIcon from "../../assets/icon-light-theme.svg?react";
import DarkThemeIcon from "../../assets/icon-dark-theme.svg?react";
import VisuallyHidden from "../VisuallyHidden";
import { useEffect } from "react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
  const [activeTheme, setActiveTheme] = useTheme();
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  return (
    <div className={styles.wrapper}>
      <LightThemeIcon />
      <label className={styles.themeToggle}>
        <VisuallyHidden>Toggle Light/Dark theme</VisuallyHidden>
        <input
          name="toggleTheme"
          type="checkbox"
          defaultChecked={activeTheme === "dark"}
          onClick={() => setActiveTheme(inactiveTheme)}
        />
        <div className={styles.themeToggleIndicator}></div>
      </label>
      <DarkThemeIcon />
    </div>
  );
}
