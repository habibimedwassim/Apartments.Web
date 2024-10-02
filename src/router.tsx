import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/Auth/LoginPage";
import OwnerPage from "./pages/Owner/OwnerPage";
import AdminPage from "./pages/Admin/AdminPage";
import AdminLayout from "./layouts/AdminLayout";
import OwnerLayout from "./layouts/OwnerLayout";
import ApartmentsPage from "./pages/Owner/ApartmentsPage";
import AuthLayout from "./layouts/AuthLayout";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
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
