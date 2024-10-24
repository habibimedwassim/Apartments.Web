import { RouteObject } from "react-router-dom";
import AdminPage from "@/app/pages/admin/AdminPage";
import RouteGuard from "@/components/common/route-guard";
import DashboardLayout from "@/app/layouts/dashboard.layout";
import PageLayout from "@/app/layouts/page.layout";
import AccountPage from "@/app/pages/account/AccountPage";
import ReceivedReportsPage from "../pages/report/ReceivedReports";
import TenantDetailsPage from "../pages/tenant/TenantDetailsPage";
import OwnerDetailsPage from "../pages/tenant/OwnerDetails";
import UsersPage from "../pages/users/UsersPage";
import AdminsPage from "../pages/users/AdminsPage";
import OwnersPage from "../pages/users/OwnersPage";
import TenantsListPage from "../pages/users/TenantsListPage";
import AdminDetailsPage from "../pages/users/AdminDetails";

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
      id: "users-all",
      path: "/admin/users",
      element: (
        <PageLayout title="Users">
          <UsersPage />
        </PageLayout>
      ),
    },
    {
      id: "users-admins",
      path: "/admin/admins",
      element: (
        <PageLayout title="Admins">
          <AdminsPage />
        </PageLayout>
      ),
    },
    {
      id: "users-owners",
      path: "/admin/owners",
      element: (
        <PageLayout title="Owners">
          <OwnersPage />
        </PageLayout>
      ),
    },
    {
      id: "users-tenants",
      path: "/admin/tenants",
      element: (
        <PageLayout title="Tenants">
          <TenantsListPage />
        </PageLayout>
      ),
    },
    {
      id: "reports",
      path: "/admin/reports",
      element: (
        <PageLayout title="Reports">
          <ReceivedReportsPage />
        </PageLayout>
      ),
    },
    {
      id: "admin-tenants-details",
      path: "/admin/tenants/details",
      element: (
        <PageLayout title="Tenant Details">
          <TenantDetailsPage />
        </PageLayout>
      ),
    },
    {
      id: "admin-owners-details",
      path: "/admin/owners/details",
      element: (
        <PageLayout title="Owner Details">
          <OwnerDetailsPage />
        </PageLayout>
      ),
    },
    {
      id: "admin-admin-details",
      path: "/admin/admins/details",
      element: (
        <PageLayout title="Owner Details">
          <AdminDetailsPage />
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
