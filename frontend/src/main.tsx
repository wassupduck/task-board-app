import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./global.module.css";

import { Root, rootRouteLoader } from "./routes/root";
import { Board, boardRouteLoader } from "./routes/board";
import { boardsRouteAction } from "./routes/boards";
import { Task, taskRouteAction, taskRouteLoader } from "./routes/task";

const queryClient = new QueryClient();

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
