/// <reference types="vite-plugin-svgr/client" />
import ShowSidebarIcon from "../../assets/icon-show-sidebar.svg?react";
import styles from "./Root.module.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Outlet, useLoaderData } from "react-router-dom";
import { LoaderData } from "./root.loader";
import clsx from "clsx";
import VisuallyHidden from "../../components/VisuallyHidden";
import { useQuery } from "@tanstack/react-query";
import { rootRouteQuery } from "./root.queries";
import { useLocalStorage, useMediaQuery } from "@uidotdev/usehooks";
import breakpoints from "../../breakpoints.module.css";

export function Root() {
  const [showSidebar, setShowSidebar] = useLocalStorage("show-sidebar", true);
  const isMobile = useMediaQuery(breakpoints.mobileAndSmaller);

  const initialData = useLoaderData() as LoaderData;
  const { data } = useQuery({
    ...rootRouteQuery,
    initialData,
  });

  return (
    <div className={clsx(styles.wrapper, !showSidebar && styles.sidebarHidden)}>
      <Header query={data} sidebarHidden={!showSidebar} />
      {!isMobile &&
        (showSidebar ? (
          <Sidebar query={data} onHideSidebar={() => setShowSidebar(false)} />
        ) : (
          <ShowSidebarButton onClick={() => setShowSidebar(true)} />
        ))}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

function ShowSidebarButton(props: { onClick: () => void }) {
  return (
    <button className={styles.showSidebarButton} onClick={props.onClick}>
      <ShowSidebarIcon />
      <VisuallyHidden>Show sidebar</VisuallyHidden>
    </button>
  );
}
