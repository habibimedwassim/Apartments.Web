import { useGetReceivedReportsQuery } from "@/app/services/queries/report.queries";
import { reportColumns } from "@/app/pages/report/table/ReportColumns";
import { LoaderCircle } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { reportStatuses } from "./table/ReportStatuses";

const ReceivedReportsPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetReceivedReportsQuery();

  const requests = data?.pages.flatMap((page) => page.items) ?? [];

  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={reportColumns(false)}
      statuses={reportStatuses}
      data={requests}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default ReceivedReportsPage;
