/// <reference types="vite-plugin-svgr/client" />
import HideSidebarIcon from "../../assets/icon-hide-sidebar.svg?react";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import BoardNav from "../BoardNav";
import ThemeSelector from "../ThemeSelector";
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
  return (
    <aside className={styles.wrapper}>
      <BoardNav query={query} />
      <div className={styles.buttonGroup}>
        <div className={styles.themeSelectorWrapper}>
          <ThemeSelector />
        </div>
        <button
          className={styles.hideSidebarButton}
          onClick={props.onHideSidebar}
        >
          <HideSidebarIcon />
          Hide Sidebar
        </button>
      </div>
    </aside>
  );
}
