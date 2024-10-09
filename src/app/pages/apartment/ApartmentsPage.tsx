import { DataTable } from "@/components/data-table/data-table";
import { apartmentColumns } from "./ApartmentsColumns";
import { ApartmentModel } from "@/app/models/apartment.models";
import { useApartments } from "@/app/services/apartment.services";
import { useNavigate } from "react-router-dom";

const ApartmentsPage = () => {
  const { data: apartments, isLoading } = useApartments();
  const navigate = useNavigate();

  const handleAddApartment = () => {
    navigate("/apartments/new");
  };
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <DataTable<ApartmentModel, any>
      columns={apartmentColumns}
      data={(apartments ?? []) as ApartmentModel[]}
      newButtonLabel="Add Apartment"
      onNewButtonClick={handleAddApartment}
    />
  );
};

export default ApartmentsPage;
