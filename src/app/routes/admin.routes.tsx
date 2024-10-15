import { RouteObject } from "react-router-dom";
import AdminPage from "@/app/pages/admin/AdminPage";
import RouteGuard from "@/components/common/route-guard";
import DashboardLayout from "@/app/layouts/dashboard.layout";
import PageLayout from "@/app/layouts/page.layout";
import AccountPage from "@/app/pages/account/AccountPage";

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
      path: "/admin",
      element: (
        <PageLayout title="Home">
          <AdminPage />
        </PageLayout>
      ),
    },
    {
      id: "admin-account",
      path: "/admin/account",
      element: (
        <PageLayout title="Home">
          <AccountPage />
        </PageLayout>
      ),
    },
  ],
};

export default adminRoutes;
