import { RouteObject } from "react-router-dom";
import RouteGuard from "@/components/common/route-guard";
import DashboardLayout from "@/app/layouts/dashboard.layout";
import PageLayout from "@/app/layouts/page.layout";
import ApartmentsPage from "@/app/pages/apartment/ApartmentsPage";

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
      id: "apartments",
      path: "apartments",
      element: (
        <PageLayout title="Apartments">
          <ApartmentsPage />
        </PageLayout>
      ),
    },
    {
      id: "apartments-new",
      path: "apartments/new",
      element: (
        <PageLayout title="New Apartment">
          <ApartmentsPage />
        </PageLayout>
      ),
    },
  ],
};

export default ownerRoutes;
