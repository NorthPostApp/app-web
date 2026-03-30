import { createBrowserRouter } from "react-router";
import ProtectedRoute from "@/pages/layouts/ProtectedRoute";
import AppLayout from "@/pages/layouts/AppLayout";
import Home from "@/pages/Home";

export const router = createBrowserRouter([
  {
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: AppLayout,
        children: [{ index: true, Component: Home }],
      },
    ],
  },
]);
