import { DataTable } from "@/components/data-table/data-table";
import { apartmentColumns } from "./ApartmentsColumns";
import { ApartmentModel } from "@/app/models/apartment.models";
import { useApartments } from "@/app/services/apartment.services";

const ApartmentsPage = () => {
  const { data: apartments } = useApartments();
  console.log(apartments);
  return (
    <DataTable<ApartmentModel, any>
      columns={apartmentColumns}
      data={(apartments ?? []) as ApartmentModel[]}
    />
  );
};

export default ApartmentsPage;
