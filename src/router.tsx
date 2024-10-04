import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import adminRoutes from "@/routes/admin.routes";
import authRoutes from "@/routes/auth.routes";
import ownerRoutes from "@/routes/owner.routes";
import { useAuthStore } from "@/store";

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

// import LoginPage from "@/pages/Auth/LoginPage";
// import OwnerPage from "./pages/Owner/OwnerPage";
// import AdminPage from "./pages/Admin/AdminPage";
// import AdminLayout from "./layouts/AdminLayout";
// import OwnerLayout from "./layouts/OwnerLayout";
// import ApartmentsPage from "./pages/Owner/ApartmentsPage";
// import AuthLayout from "./layouts/AuthLayout";
// import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
// import RouteGuard from "./components/common/RouteGuard";
// import { useAuthStore } from "@/store";

// const RootRedirect = () => {
//   const { isAuthenticated, role } = useAuthStore();

//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   if (role === "Admin") {
//     return <Navigate to="/admin" replace />;
//   }

//   if (role === "Owner") {
//     return <Navigate to="/" replace />;
//   }

//   return <Navigate to="/auth/login" replace />;
// };

// const router = createBrowserRouter([
//   {
//     path: "auth",
//     element: (
//       <RouteGuard guestOnly>
//         <AuthLayout />
//       </RouteGuard>
//     ),
//     children: [
//       { path: "login", element: <LoginPage /> },
//       { path: "forgot-password", element: <ForgotPasswordPage /> },
//       { path: "reset-password", element: <ResetPasswordPage /> },
//     ],
//   },
//   {
//     path: "admin",
//     element: (
//       <RouteGuard requiredRole="Admin">
//         <AdminLayout />
//       </RouteGuard>
//     ),
//     children: [{ path: "", element: <AdminPage /> }],
//   },
//   {
//     path: "", // Base path for owners
//     element: (
//       <RouteGuard requiredRole="Owner">
//         <OwnerLayout />
//       </RouteGuard>
//     ),
//     children: [
//       { path: "", element: <OwnerPage /> },
//       { path: "apartments", element: <ApartmentsPage /> },
//     ],
//   },
//   {
//     path: "*",
//     element: <RootRedirect />,
//   },
// ]);

// export default router;
