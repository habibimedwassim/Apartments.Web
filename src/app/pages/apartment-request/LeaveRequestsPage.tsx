import { useGetLeaveRequestsQuery } from "@/app/services/queries/apartment-request.queries";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { createRequestColumns } from "./table/RequestsColumns";
import { leaveRequestStatuses } from "./table/RequestStatuses";

const LeaveRequestsPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetLeaveRequestsQuery();

  const columns = createRequestColumns(leaveRequestStatuses);
  const requests = data?.pages.flatMap((page) => page.items) ?? [];

  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={columns}
      statuses={leaveRequestStatuses}
      data={requests}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default LeaveRequestsPage;
