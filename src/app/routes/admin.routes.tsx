import { RouteObject } from "react-router-dom";
import AdminPage from "@/app/pages/admin/AdminPage";
import RouteGuard from "@/components/common/route-guard";
import DashboardLayout from "@/app/layouts/dashboard.layout";
import PageLayout from "@/app/layouts/page.layout";

const adminRoutes: RouteObject = {
  id: "admin",
  path: "admin",
  element: (
    <RouteGuard requiredRole="Admin">
      <DashboardLayout />
    </RouteGuard>
  ),
  children: [
    {
      id: "admin-home",
      path: "",
      element: (
        <PageLayout title="Home">
          <AdminPage />
        </PageLayout>
      ),
    },
  ],
};

export default adminRoutes;
