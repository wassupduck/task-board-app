import styles from "./App.module.css";
import BoardArea from "./components/BoardArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Sidebar />
      <BoardArea />
    </div>
  );
}

export default App;
