import { getRentTransactionsPaged } from "@/app/api/transaction.api";
import { RentTransactionQueryFilterModel } from "@/app/models/transaction.models";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetTransactionsQuery = (
  filter: RentTransactionQueryFilterModel
) => {
  return useInfiniteQuery({
    queryKey: ["transactions"],
    queryFn: ({ pageParam = 1 }) =>
      getRentTransactionsPaged({ ...filter, pageNumber: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetTenantTransactionsQuery = (
  id: number,
  filter: RentTransactionQueryFilterModel
) => {
  filter.userId = id;
  return useInfiniteQuery({
    queryKey: ["transactions", id],
    queryFn: ({ pageParam = 1 }) =>
      getRentTransactionsPaged({ ...filter, pageNumber: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};
