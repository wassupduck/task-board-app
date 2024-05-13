/// <reference types="vite-plugin-svgr/client" />
import { useFetcher } from "react-router-dom";
import HideSidebarIcon from "../../assets/icon-hide-sidebar.svg?react";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import BoardNav from "../BoardNav";
import ThemeToggle from "../ThemeToggle";
import styles from "./Sidebar.module.css";

const Sidebar_QueryFragment = graphql(`
  fragment Sidebar_QueryFragment on Query {
    ...BoardNav_QueryFragment
  }
`);

interface SidebarProps {
  query: FragmentType<typeof Sidebar_QueryFragment>;
  onHideSidebar: () => void;
}

export default function Sidebar(props: SidebarProps) {
  const query = getFragmentData(Sidebar_QueryFragment, props.query);

  const fetcher = useFetcher();
  const handleLogout = () => {
    fetcher.submit(null, {
      method: "post",
      action: "/logout",
    });
  };

  return (
    <aside className={styles.wrapper}>
      <BoardNav query={query} />
      <div className={styles.bottomButtonGroup}>
        <div className={styles.themeToggleWrapper}>
          <ThemeToggle />
        </div>
        <button className={styles.sidebarButton} onClick={props.onHideSidebar}>
          <HideSidebarIcon />
          Hide Sidebar
        </button>
        <button className={styles.sidebarButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
