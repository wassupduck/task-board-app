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

export function Root() {
  const [searchParams, setSearchParams] = useSearchParams();

  const data = useLoaderData() as LoaderData;
  const { boards } = data;

  const params = useParams();
  const boardId = params.boardId;
  if (boards.length > 0 && boardId === undefined) {
    return <Navigate to={`/boards/${boards[0].id}`} />;
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <Sidebar query={data} />
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
