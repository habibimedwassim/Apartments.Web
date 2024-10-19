import api from "@/app/api/base.api";
import {
  mapToTransactionsList,
  TransactionModel,
  TransactionRequestModel,
} from "@/app/models/transaction.models";

export const getTransactions = async (): Promise<TransactionModel[]> => {
  console.log("Transactions Api called");
  const response = await api.get<TransactionRequestModel[]>(
    `/users/me/transactions`
  );
  const result = await mapToTransactionsList(response.data);
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
