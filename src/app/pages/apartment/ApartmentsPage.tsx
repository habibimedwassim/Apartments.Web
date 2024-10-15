import { DataTable } from "@/components/data-table/data-table";
import { apartmentColumns } from "./table/ApartmentsColumns";
import { ApartmentModel } from "@/app/models/apartment.models";
import { useNavigate } from "react-router-dom";
import { apartmentStatuses } from "./table/ApartmentStatuses";
import { LoaderCircle } from "lucide-react";
import { useGetApartmentsQuery } from "@/app/services/queries/apartment.queries";

const ApartmentsPage = () => {
  const { data: apartments, isLoading } = useGetApartmentsQuery();
  const navigate = useNavigate();

  const handleAddApartment = () => {
    navigate("/apartments/new");
  };
  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable<ApartmentModel, any>
      columns={apartmentColumns}
      statuses={apartmentStatuses}
      data={(apartments ?? []) as ApartmentModel[]}
      newButtonLabel="Add Apartment"
      onNewButtonClick={handleAddApartment}
    />
  );
};

export default ApartmentsPage;
