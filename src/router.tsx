import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import OwnerPage from "./pages/OwnerPage";
import AdminPage from "./pages/AdminPage";
import AdminLayout from "./layouts/AdminLayout";
import OwnerLayout from "./layouts/OwnerLayout";
import ApartmentsPage from "./pages/ApartmentsPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "home",
        element: <AdminPage />,
      },
    ],
  },
  {
    path: "owner",
    element: <OwnerLayout />,
    children: [
      {
        path: "home",
        element: <OwnerPage />,
      },
      {
        path: "apartments",
        element: <ApartmentsPage />,
      },
    ],
  },
]);

export default router;
