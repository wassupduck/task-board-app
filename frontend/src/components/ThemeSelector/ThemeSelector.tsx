/// <reference types="vite-plugin-svgr/client" />
import styles from "./ThemeSelector.module.css";
import LightThemeIcon from "../../assets/icon-light-theme.svg?react";
import DarkThemeIcon from "../../assets/icon-dark-theme.svg?react";
import VisuallyHidden from "../VisuallyHidden";

export default function ThemeSelector() {
  return (
    <div className={styles.wrapper}>
      <LightThemeIcon />
      <label className={styles.themeToggle}>
        <VisuallyHidden>Toggle Light/Dark theme</VisuallyHidden>
        <input type="checkbox" />
        <div className={styles.themeToggleIndicator}></div>
      </label>
      <DarkThemeIcon />
    </div>
  );
}
