import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { transactionColumns } from "./table/TransactionColumns";
import { transactionStatuses } from "./table/TransactionStatuses";
import { useGetTransactionsQuery } from "@/app/services/queries/transaction.queries";

const TransactionsPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTransactionsQuery({ pageNumber: 1 });

  const transactions = data?.pages.flatMap((page) => page.items) ?? [];
  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={transactionColumns()}
      statuses={transactionStatuses}
      data={transactions}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default TransactionsPage;
