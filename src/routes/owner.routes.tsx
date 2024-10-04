import { RouteObject } from "react-router-dom";
import OwnerLayout from "@/layouts/OwnerLayout";
import OwnerPage from "@/pages/owner/OwnerPage";
import ApartmentsPage from "@/pages/owner/ApartmentsPage";
import RouteGuard from "@/components/common/RouteGuard";
import BaseLayout from "@/layouts/BaseLayout";

const ownerRoutes: RouteObject = {
  id: "owner",
  path: "",
  element: (
    <RouteGuard requiredRole="Owner">
      <BaseLayout />
    </RouteGuard>
  ),
  children: [
    { id: "owner-home", path: "", element: <OwnerPage /> },
    { id: "apartments", path: "apartments", element: <ApartmentsPage /> },
  ],
};

export default ownerRoutes;
