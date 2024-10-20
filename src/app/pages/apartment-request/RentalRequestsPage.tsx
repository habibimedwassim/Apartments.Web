import { useGetRentRequestsQuery } from "@/app/services/queries/apartment-request.queries";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { createRequestColumns } from "./table/RequestsColumns";
import { requestStatuses } from "./table/RequestStatuses";

const RentalRequestsPage = () => {
  const { data: requests, isLoading } = useGetRentRequestsQuery();
  const columns = createRequestColumns(requestStatuses);
  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={columns}
      statuses={requestStatuses}
      data={requests || []}
    />
  );
};

export default RentalRequestsPage;
