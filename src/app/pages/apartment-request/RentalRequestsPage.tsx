import { useGetRentRequestsQuery } from "@/app/services/queries/apartment-request.queries";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { createRequestColumns } from "./table/RequestsColumns";
import { requestStatuses } from "./table/RequestStatuses";

const RentalRequestsPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRentRequestsQuery();

  const columns = createRequestColumns(requestStatuses, true);
  const requests = data?.pages.flatMap((page) => page.items) ?? [];

  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={columns}
      statuses={requestStatuses}
      data={requests}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default RentalRequestsPage;
