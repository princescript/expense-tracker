import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Transaction from "../pages/Transaction";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
       {
        path: "/transactions",
        element: <Transaction />,
      },

    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);