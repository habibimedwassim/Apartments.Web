import { useGetDismissRequestsQuery } from "@/app/services/queries/apartment-request.queries";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { createRequestColumns } from "./table/RequestsColumns";
import { dismissRequestStatuses } from "./table/RequestStatuses";

const DismissRequestsPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetDismissRequestsQuery();

  const columns = createRequestColumns(dismissRequestStatuses);
  const requests = data?.pages.flatMap((page) => page.items) ?? [];

  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={columns}
      data={requests}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default DismissRequestsPage;
