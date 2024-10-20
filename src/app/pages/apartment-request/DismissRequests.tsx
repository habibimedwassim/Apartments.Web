import { useGetDismissRequestsQuery } from "@/app/services/queries/apartment-request.queries";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { createRequestColumns } from "./table/RequestsColumns";
import { dismissRequestStatuses } from "./table/RequestStatuses";

const DismissRequestsPage = () => {
  const { data: requests, isLoading } = useGetDismissRequestsQuery();
  const columns = createRequestColumns(dismissRequestStatuses);
  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={columns}
      statuses={dismissRequestStatuses}
      data={requests || []}
    />
  );
};

export default DismissRequestsPage;
