import React, { useEffect } from "react";
import { useGetChangeLogsQuery } from "@/app/services/queries/changelog.queries";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { format } from "date-fns";
import { changeLogColumns } from "./ChangeLogsColumns";

interface ChangeLogsTableProps {
  entity: string;
  dateFrom: Date;
  dateTo: Date;
  setIsLoading: (loading: boolean) => void;
}

const ChangeLogsTable: React.FC<ChangeLogsTableProps> = ({
  entity,
  dateFrom,
  dateTo,
  setIsLoading,
}) => {
  const [filter, _] = React.useState({ pageNumber: 1 });

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchStatus,
  } = useGetChangeLogsQuery(
    {
      entityName: entity,
      startDate: format(dateFrom, "yyyy-MM-dd"),
      endDate: format(dateTo, "yyyy-MM-dd"),
    },
    filter
  );

  useEffect(() => {
    setIsLoading(fetchStatus == "fetching");
  }, [fetchStatus, setIsLoading]);

  const changeLogs = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div>
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <DataTable
          columns={changeLogColumns}
          data={changeLogs}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};

export default ChangeLogsTable;
