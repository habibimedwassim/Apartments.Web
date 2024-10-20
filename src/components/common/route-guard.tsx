import { ReactNode } from "react";
import { useAuthStore } from "@/hooks/use-store";
import { Navigate, Outlet } from "react-router-dom";

interface RouteGuardProps {
  requiredRole?: string;
  guestOnly?: boolean;
  children?: ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  requiredRole,
  guestOnly,
  children,
}) => {
  const { isAuthenticated, role } = useAuthStore();

  if (guestOnly && isAuthenticated) {
    return <Navigate to={role === "Admin" ? "/admin" : "/"} replace />;
  }

  if (!guestOnly && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "Admin" ? "/admin" : "/"} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RouteGuard;
