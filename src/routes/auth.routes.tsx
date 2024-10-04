import { RouteObject, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import RouteGuard from "@/components/common/RouteGuard";

const authRoutes: RouteObject = {
  id: "auth",
  path: "auth",
  element: (
    <RouteGuard guestOnly>
      <AuthLayout />
    </RouteGuard>
  ),
  children: [
    { id: "auth-redirect", path: "", element: <Navigate to="login" replace /> },
    { id: "login", path: "login", element: <LoginPage /> },
    {
      id: "forgot-password",
      path: "forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      id: "reset-password",
      path: "reset-password",
      element: <ResetPasswordPage />,
    },
  ],
};

export default authRoutes;
