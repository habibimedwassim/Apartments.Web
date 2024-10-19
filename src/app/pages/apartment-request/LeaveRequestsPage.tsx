import { useGetLeaveRequestsQuery } from "@/app/services/queries/apartment-request.queries";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { requestColumns } from "./table/RequestsColumns";
import { requestStatuses } from "./table/RequestStatuses";

const LeaveRequestsPage = () => {
  const { data: requests, isLoading } = useGetLeaveRequestsQuery();

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

export default LeaveRequestsPage;
