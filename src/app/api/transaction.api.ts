import api from "@/app/api/base.api";
import { TransactionRequestModel } from "@/app/models/transaction.models";

export const getTransactions = async (): Promise<TransactionRequestModel[]> => {
  console.log("Transactions Api called");
  const response = await api.get<TransactionRequestModel[]>(
    `/users/me/transactions`
  );
  return response.data;
};

export const getTenantTransactions = async (
  id: number
): Promise<TransactionRequestModel> => {
  const response = await api.get<TransactionRequestModel>(
    `/users/${id}/transactions`
  );
  console.log(id);
  return response.data;
};
