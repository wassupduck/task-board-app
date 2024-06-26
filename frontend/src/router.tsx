import { createBrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { protectedLoader } from "./auth/protected-loader";
import * as root from "./routes/root";
import * as board from "./routes/board";
import * as boards from "./routes/boards";
import * as editBoard from "./routes/board-edit";
import * as task from "./routes/task";
import * as login from "./routes/login";
import * as logout from "./routes/logout";
import * as signup from "./routes/signup";
import * as newTask from "./routes/tasks-new";
import * as editTask from "./routes/task-edit";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <root.Component />,
      loader: protectedLoader(root.loader(queryClient)),
      errorElement: <root.ErrorBoundary />,
      children: [
        { index: true, element: <root.IndexComponent /> },
        {
          id: "boards",
          path: "boards",
          action: boards.action(queryClient),
        },
        {
          id: "board",
          path: "boards/:boardId",
          element: <board.Component />,
          loader: protectedLoader(board.loader(queryClient)),
          action: board.action(queryClient),
          children: [
            {
              path: "edit",
              element: <editBoard.Component />,
              action: editBoard.action(queryClient),
            },
            {
              path: "tasks/new",
              element: <newTask.Component />,
              action: newTask.action(queryClient),
            },
            {
              id: "task",
              path: "tasks/:taskId",
              element: <task.Component />,
              loader: protectedLoader(task.loader(queryClient)),
              action: task.action(queryClient),
            },
            {
              path: "tasks/:taskId/edit",
              element: <editTask.Component />,
              loader: protectedLoader(editTask.loader(queryClient)),
              action: editTask.action(queryClient),
            },
          ],
        },
      ],
    },
    {
      path: "/signup",
      element: <signup.Component />,
      loader: signup.loader,
      action: signup.action,
    },
    {
      path: "/login",
      element: <login.Component />,
      loader: login.loader,
      action: login.action,
    },
    {
      path: "/logout",
      action: logout.action,
    },
  ]);
