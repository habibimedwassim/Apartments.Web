import api from "@/app/api/base.api";
import {
  mapToTransactionsList,
  TransactionModel,
  TransactionRequestModel,
} from "@/app/models/transaction.models";
import { MessageResponseModel } from "../models/api.models";

export const getTransactions = async (): Promise<TransactionModel[]> => {
  console.log("Transactions Api called");
  const response = await api.get<TransactionRequestModel[]>(
    `/users/me/transactions`
  );
  const result = await mapToTransactionsList(response.data);
  console.log("Transactions Api result", result);
  return result;
};

export const getTenantTransactions = async (
  id: number
): Promise<TransactionModel[]> => {
  const response = await api.get<TransactionRequestModel[]>(
    `/users/${id}/transactions`
  );
  return await mapToTransactionsList(response.data);
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
