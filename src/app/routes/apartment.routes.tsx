import { RouteObject } from "react-router-dom";
import PageLayout from "@/app/layouts/page.layout";
import ApartmentsPage from "@/app/pages/apartment/ApartmentsPage";
import CreateApartmentPage from "@/app/pages/apartment/CreateApartmentPage";
import EditApartmentPage from "@/app/pages/apartment/EditApartmentPage";
import ApartmentDetailsPage from "@/app/pages/apartment/ApartmentDetailsPage";

const apartmentRoutes: RouteObject[] = [
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
    id: "apartments-details",
    path: "apartments/details",
    element: (
      <PageLayout title="Apartment Details">
        <ApartmentDetailsPage />
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
    path: "apartments/edit/",
    element: (
      <PageLayout title="Edit Apartment">
        <EditApartmentPage />
      </PageLayout>
    ),
  },
];

export default apartmentRoutes;
