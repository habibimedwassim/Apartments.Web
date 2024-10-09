import { RouteObject } from "react-router-dom";
import RouteGuard from "@/components/common/route-guard";
import DashboardLayout from "@/app/layouts/dashboard.layout";
import PageLayout from "@/app/layouts/page.layout";
import ApartmentsPage from "@/app/pages/apartment/ApartmentsPage";
import CreateApartmentPage from "@/app/pages/apartment/CreateApartmentPage";
import EditApartmentPage from "../pages/apartment/EditApartmentPage";

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
          <CreateApartmentPage />
        </PageLayout>
      ),
    },
    {
      id: "apartments-edit",
      path: "apartments/edit/:apId",
      element: (
        <PageLayout title="Edit Apartment">
          <EditApartmentPage />
        </PageLayout>
      ),
    },
  ],
};

export default ownerRoutes;
