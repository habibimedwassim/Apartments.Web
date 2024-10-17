import { useGetRentRequestsQuery } from "@/app/services/queries/apartment-request.queries";
import { DataTable } from "@/components/data-table/data-table"; // Reusing your DataTable component
// Columns specific to requests
import { LoaderCircle } from "lucide-react"; // Assuming you use this for loading indicator
import { requestColumns } from "./table/RequestsColumns";
import { requestStatuses } from "./table/RequestStatuses";

const RentalRequestsPage = () => {
  const { data: requests, isLoading } = useGetRentRequestsQuery();

  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={requestColumns} // Use the request columns created earlier
      statuses={requestStatuses}
      data={requests || []} // Pass the rental requests to the table
    />
  );
};

export default RentalRequestsPage;
