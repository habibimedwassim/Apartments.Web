import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import adminRoutes from "./admin.routes";
import authRoutes from "./auth.routes";
import ownerRoutes from "./owner.routes";
import { useAuthStore } from "@/hooks/use-store";

const RootRedirect = () => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role === "Admin") {
    return <Navigate to="/admin" replace />;
  }

  if (role === "Owner") {
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/auth/login" replace />;
};

const rootRoutes: RouteObject = {
  id: "root-redirect",
  path: "*",
  element: <RootRedirect />,
};

const router = createBrowserRouter([
  authRoutes,
  adminRoutes,
  ownerRoutes,
  rootRoutes,
]);

export default router;
