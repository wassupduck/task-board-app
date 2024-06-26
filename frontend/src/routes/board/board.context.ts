import { useOutletContext } from "react-router-dom";
import { LoaderData } from "./board.loader";

export type BoardRouteContext = {
  board: LoaderData["board"];
};

export function useBoard() {
  const { board } = useOutletContext<BoardRouteContext>();
  return board;
}
