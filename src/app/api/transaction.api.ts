import api from "@/app/api/base.api";
import {
  mapToTransactionsList,
  RentTransactionQueryFilterModel,
  TransactionModel,
  TransactionRequestModel,
} from "@/app/models/transaction.models";
import { MessageResponseModel, PagedResult } from "@/app/models/api.models";

export const getRentTransactionsPaged = async (
  filters: RentTransactionQueryFilterModel
): Promise<PagedResult<TransactionModel>> => {
  console.log("api transaction called");
  const url = filters.userId
    ? `/users/${filters.userId}/transactions`
    : `/users/me/transactions`;
  const response = await api.get<PagedResult<TransactionRequestModel>>(url, {
    params: filters,
  });

  // Map the items using the existing mapper function
  const mappedItems = mapToTransactionsList(response.data.items);

  // Return the paged result with the mapped items
  return {
    ...response.data,
    items: mappedItems,
  };
};

export const updateRentTransaction = async (
  id: number,
  action: string
): Promise<MessageResponseModel> => {
  const response = await api.patch<MessageResponseModel>(
    `/transactions/${id}`,
    null,
    {
      params: { action },
    }
  );
  return response.data;
};
