import { createBrowserRouter } from "react-router";
import ProtectedRoute from "@/pages/layouts/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    Component: ProtectedRoute,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/",
        Component: Home,
        children: [{ index: true, Component: Home }],
      },
    ],
  },
]);
