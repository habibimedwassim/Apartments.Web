import { RouteObject } from "react-router-dom";
import RouteGuard from "@/components/common/route-guard";
import DashboardLayout from "@/app/layouts/dashboard.layout";
import PageLayout from "@/app/layouts/page.layout";
import apartmentRoutes from "@/app/routes/apartment.routes";
import AccountPage from "@/app/pages/account/AccountPage";
import apartmentRequestsRoutes from "./apartment-request.routes";
import tenantRoutes from "./tenant.routes";
import TransactionsPage from "../pages/transaction/TransactionsPage";
import { OwnerDashboard } from "../pages/dashboard/OwnerDashboardPage";

const ownerRoutes: RouteObject = {
  id: "owner",
  path: "",
  element: (
    <RouteGuard requiredRole="Owner">
      <DashboardLayout />
    </RouteGuard>
  ),
  children: [
    {
      id: "owner-home",
      path: "",
      element: (
        <PageLayout title="Home">
          <OwnerDashboard />
        </PageLayout>
      ),
    },
    {
      id: "owner-transactions",
      path: "/transactions",
      element: (
        <PageLayout title="Transactions">
          <TransactionsPage />
        </PageLayout>
      ),
    },
    {
      id: "owner-account",
      path: "/account",
      element: (
        <PageLayout title="Home">
          <AccountPage />
        </PageLayout>
      ),
    },
    ...tenantRoutes,
    ...apartmentRoutes,
    ...apartmentRequestsRoutes,
  ],
};

export default ownerRoutes;
