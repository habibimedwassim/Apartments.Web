import { RouteObject } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import AdminPage from "@/pages/admin/AdminPage";
import RouteGuard from "@/components/common/RouteGuard";

const adminRoutes: RouteObject = {
  id: "admin",
  path: "admin",
  element: (
    <RouteGuard requiredRole="Admin">
      <AdminLayout />
    </RouteGuard>
  ),
  children: [{ id: "admin-home", path: "", element: <AdminPage /> }],
};

export default adminRoutes;
