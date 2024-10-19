import {
  getTenantTransactions,
  getTransactions,
} from "@/app/api/transaction.api";
import {
  TransactionModel,
  TransactionRequestModel,
} from "@/app/models/transaction.models";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionsQuery = () => {
  return useQuery<TransactionModel[]>({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetTenantTransactionsQuery = (id: number) => {
  return useQuery<TransactionModel[]>({
    queryKey: ["transactions", id],
    queryFn: () => getTenantTransactions(id),
  });
};
