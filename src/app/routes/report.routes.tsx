import { RouteObject } from "react-router-dom";
import PageLayout from "../layouts/page.layout";
import SentReportsPage from "../pages/report/SentReportsPage";
import ReceivedReportsPage from "../pages/report/ReceivedReports";

const reportsRoutes: RouteObject[] = [
  {
    id: "sent-reports",
    path: "sent-reports",
    element: (
      <PageLayout title="Sent Reports">
        <SentReportsPage />
      </PageLayout>
    ),
  },
  {
    id: "received-reports",
    path: "received-reports",
    element: (
      <PageLayout title="Received Reports">
        <ReceivedReportsPage />
      </PageLayout>
    ),
  },
];

export default reportsRoutes;
