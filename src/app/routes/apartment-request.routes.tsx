import { RouteObject } from "react-router-dom";
import PageLayout from "../layouts/page.layout";
import RentalRequestsPage from "../pages/apartment-request/RentalRequestsPage";
import LeaveRequestsPage from "../pages/apartment-request/LeaveRequestsPage";
import DismissRequestsPage from "../pages/apartment-request/DismissRequests";

const apartmentRequestsRoutes: RouteObject[] = [
  {
    id: "rental",
    path: "rental-requests",
    element: (
      <PageLayout title="Rental Requests">
        <RentalRequestsPage />
      </PageLayout>
    ),
  },
  {
    id: "leave",
    path: "leave-requests",
    element: (
      <PageLayout title="Leave Requests">
        <LeaveRequestsPage />
      </PageLayout>
    ),
  },
  {
    id: "dismiss",
    path: "dismiss-requests",
    element: (
      <PageLayout title="Dismiss Requests">
        <DismissRequestsPage />
      </PageLayout>
    ),
  },
];

export default apartmentRequestsRoutes;
