import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { transactionColumns } from "./table/TransactionColumns";
import { transactionStatuses } from "./table/TransactionStatuses";
import { useGetTransactionsQuery } from "@/app/services/queries/transaction.queries";

const TransactionsPage = () => {
  const { data: transactions, isLoading } = useGetTransactionsQuery();

  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable
      columns={transactionColumns}
      statuses={transactionStatuses}
      data={transactions || []}
    />
  );
};

export default TransactionsPage;
