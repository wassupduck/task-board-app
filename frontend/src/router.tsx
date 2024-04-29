import { Root, rootRouteLoader } from "./routes/root";
import { Board, boardRouteLoader } from "./routes/board";
import { boardsRouteAction } from "./routes/boards";
import { Task, taskRouteAction, taskRouteLoader } from "./routes/task";
import { createBrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: rootRouteLoader(queryClient),
      children: [
        {
          id: "boards",
          path: "boards",
          action: boardsRouteAction(queryClient),
        },
        {
          id: "board",
          path: "boards/:boardId",
          element: <Board />,
          loader: boardRouteLoader(queryClient),
          children: [
            {
              path: "tasks/:taskId",
              element: <Task />,
              loader: taskRouteLoader(queryClient),
              action: taskRouteAction(queryClient),
            },
          ],
        },
      ],
    },
  ]);
