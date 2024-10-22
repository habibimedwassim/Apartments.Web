import { DataTable } from "@/components/data-table/data-table";
import { apartmentColumns } from "./table/ApartmentsColumns";
import { ApartmentModel } from "@/app/models/apartment.models";
import { useNavigate } from "react-router-dom";
import { apartmentStatuses } from "./table/ApartmentStatuses";
import { LoaderCircle } from "lucide-react";
import { useGetApartmentsQuery } from "@/app/services/queries/apartment.queries";

const ApartmentsPage = () => {
  const {
    data: apartmentsData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetApartmentsQuery();

  const apartments = apartmentsData?.pages.flatMap((page) => page.items) ?? [];
  const navigate = useNavigate();

  const handleAddApartment = () => {
    navigate("/apartments/new");
  };

  if (isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  if (isError) {
    return <div>Error loading apartments</div>;
  }

  return (
    <DataTable<ApartmentModel, any>
      columns={apartmentColumns}
      statuses={apartmentStatuses}
      data={apartments}
      newButtonLabel="Add Apartment"
      onNewButtonClick={handleAddApartment}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default ApartmentsPage;
