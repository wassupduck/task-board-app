/// <reference types="vite-plugin-svgr/client" />
import ShowSidebarIcon from "../../assets/icon-show-sidebar.svg?react";
import styles from "./Root.module.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Navigate,
  Outlet,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BoardCreateModal from "../../components/BoardCreateModal";
import { LoaderData } from "./loader";
import clsx from "clsx";
import VisuallyHidden from "../../components/VisuallyHidden";
import useStickyState from "../../hooks/useStickyState";

export function Root() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSidebar, setShowSidebar] = useStickyState(true, "show-sidebar");

  const data = useLoaderData() as LoaderData;
  const { boards } = data;

  const params = useParams();
  const boardId = params.boardId;
  if (boards.length > 0 && boardId === undefined) {
    return <Navigate to={`/boards/${boards[0].id}`} />;
  }

  return (
    <div className={clsx(styles.wrapper, !showSidebar && styles.sidebarHidden)}>
      <Header sidebarHidden={!showSidebar} />
      {showSidebar ? (
        <Sidebar query={data} onHideSidebar={() => setShowSidebar(false)} />
      ) : (
        <ShowSidebarButton onClick={() => setShowSidebar(true)} />
      )}
      <main className={styles.main}>
        <Outlet />
      </main>
      {/* TODO: Prevent new board modal from showing if other modals open? */}
      {searchParams.get("new_board") && (
        <BoardCreateModal
          onClose={() =>
            setSearchParams(
              Object.fromEntries(
                [...searchParams.entries()].filter(
                  ([name]) => name !== "new_board"
                )
              )
            )
          }
        />
      )}
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
