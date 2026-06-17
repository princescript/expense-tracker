import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "../layouts/AppLayout";
import NotFound from "../pages/NotFound";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Transaction = lazy(() => import("../pages/Transaction"));

const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<div className="h-screen flex items-center justify-center text-muted">Loading...</div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/transactions",
        element: withSuspense(Transaction),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);