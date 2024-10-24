import { useGetSentReportsQuery } from "@/app/services/queries/report.queries";
import { reportColumns } from "@/app/pages/report/table/ReportColumns";
import { LoaderCircle } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { reportStatuses } from "./table/ReportStatuses";
import { AddReportDialog } from "./components/AddReportDialog";
import { useState } from "react";

const SentReportsPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetSentReportsQuery();

  const requests = data?.pages.flatMap((page) => page.items) ?? [];
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddReport = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <DataTable
          columns={reportColumns()}
          statuses={reportStatuses}
          newButtonLabel="Send Report"
          onNewButtonClick={handleAddReport}
          data={requests}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
      <AddReportDialog
        onSuccess={handleDialogClose}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
};

export default SentReportsPage;
