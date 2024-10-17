import { RouteObject } from "react-router-dom";
import PageLayout from "../layouts/page.layout";
import TenantsPage from "../pages/tenant/TenantsPage";
import TenantDetailsPage from "../pages/tenant/TenantDetailsPage";

const tenantRoutes: RouteObject[] = [
  {
    id: "tenants",
    path: "tenants",
    element: (
      <PageLayout title="Tenants">
        <TenantsPage />
      </PageLayout>
    ),
  },
  {
    id: "tenants-details",
    path: "/tenants/details",
    element: (
      <PageLayout title="Tenant Details">
        <TenantDetailsPage />
      </PageLayout>
    ),
  },
];

export default tenantRoutes;
