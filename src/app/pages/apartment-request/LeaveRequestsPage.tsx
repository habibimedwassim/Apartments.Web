import { useGetLeaveRequestsQuery } from "@/app/services/queries/apartment-request.queries";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { createRequestColumns } from "./table/RequestsColumns";
import { leaveRequestStatuses } from "./table/RequestStatuses";

const LeaveRequestsPage = () => {
  const { data: requests, isLoading } = useGetLeaveRequestsQuery();
  const columns = createRequestColumns(leaveRequestStatuses);
  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={columns}
      statuses={leaveRequestStatuses}
      data={requests || []}
    />
  );
};

export default LeaveRequestsPage;
