import { RouteObject, Navigate } from "react-router-dom";
import RouteGuard from "@/components/common/route-guard";
import AuthLayout from "@/app/layouts/auth.layout";
import LoginPage from "@/app/pages/auth/LoginPage";
import ForgotPasswordPage from "@/app/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/app/pages/auth/ResetPasswordPage";

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
