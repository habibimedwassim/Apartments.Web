import { useGetRentRequestsQuery } from "@/app/services/queries/apartment-request.queries";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { requestColumns } from "./table/RequestsColumns";
import { requestStatuses } from "./table/RequestStatuses";

const RentalRequestsPage = () => {
  const { data: requests, isLoading } = useGetRentRequestsQuery();

  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={requestColumns}
      statuses={requestStatuses}
      data={requests || []}
    />
  );
};

export default RentalRequestsPage;
