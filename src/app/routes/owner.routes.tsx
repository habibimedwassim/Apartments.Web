import { RouteObject } from "react-router-dom";
import RouteGuard from "@/components/common/route-guard";
import DashboardLayout from "@/app/layouts/dashboard.layout";
import PageLayout from "@/app/layouts/page.layout";
import apartmentRoutes from "./apartment.routes";

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
    ...apartmentRoutes,
  ],
};

export default ownerRoutes;
