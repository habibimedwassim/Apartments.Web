import {
  getTenantTransactions,
  getTransactions,
} from "@/app/api/transaction.api";
import { TransactionRequestModel } from "@/app/models/transaction.models";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionsQuery = () => {
  return useQuery<TransactionRequestModel[]>({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetTenantTransactionsQuery = (id: number) => {
  return useQuery<TransactionRequestModel>({
    queryKey: ["transactions", id],
    queryFn: () => getTenantTransactions(id),
  });
};
