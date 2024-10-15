import { RouteObject } from "react-router-dom";
import RouteGuard from "@/components/common/route-guard";
import DashboardLayout from "@/app/layouts/dashboard.layout";
import PageLayout from "@/app/layouts/page.layout";
import apartmentRoutes from "@/app/routes/apartment.routes";
import AccountPage from "@/app/pages/account/AccountPage";

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
          <h1>Home Page</h1>
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
    ...apartmentRoutes,
  ],
};

export default ownerRoutes;
