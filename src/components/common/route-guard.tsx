import { ReactNode } from "react";
import { useAuthStore } from "@/hooks/use-store";
import { Navigate, Outlet } from "react-router-dom";

interface RouteGuardProps {
  requiredRole?: string; // Role required to access the route
  guestOnly?: boolean; // If true, only guests (unauthenticated users) can access the route
  children?: ReactNode; // The children to render if the guard allows it
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  requiredRole,
  guestOnly,
  children,
}) => {
  const { isAuthenticated, role } = useAuthStore();

  // If guestOnly is true and user is authenticated, redirect based on role
  if (guestOnly && isAuthenticated) {
    return <Navigate to={role === "Admin" ? "/admin" : "/"} replace />;
  }

  // Protected routes: Check authentication and role requirements
  if (!guestOnly && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Show toast instead of redirecting to a forbidden page
    return <Navigate to={role === "Admin" ? "/admin" : "/"} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RouteGuard;
