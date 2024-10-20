import { OwnerModel } from "@/app/models/user.models";

export interface TransactionRequestModel {
  id: number;
  createdDate: string;
  apartmentId: number;
  tenantId: number;
  rentAmount: number;
  dateFrom: string;
  dateTo?: string;
  status: string;
  apartment: {
    id: number;
    title: string;
    city: string;
    street: string;
    postalCode: string;
    rentAmount: number;
    owner?: OwnerModel;
  };
}

export interface TransactionModel {
  id: number;
  createdDate: string;
  apartment: {
    id: number;
    title: string;
    city: string;
    street: string;
    postalCode: string;
    rentAmount: number;
    owner?: OwnerModel;
  };
  tenant: number;
  rentAmount: number;
  dateFrom: string;
  dateTo?: string;
  status: string;
}

export const mapToTransactionsList = async (
  responseModel: TransactionRequestModel[]
): Promise<TransactionModel[]> => {
  return Promise.all(responseModel.map(mapToTransactionModel));
};

export const mapToTransactionModel = async (
  transaction: TransactionRequestModel
): Promise<TransactionModel> => {
  const result: TransactionModel = {
    id: transaction.id,
    createdDate: transaction.createdDate,
    apartment: {
      id: transaction.apartment.id,
      title: transaction.apartment.title,
      city: transaction.apartment.city,
      street: transaction.apartment.street,
      postalCode: transaction.apartment.postalCode,
      rentAmount: transaction.apartment.rentAmount,
      owner: transaction.apartment.owner
        ? {
            fullName: transaction.apartment.owner.fullName,
            email: transaction.apartment.owner.email,
            phoneNumber: transaction.apartment.owner.phoneNumber,
          }
        : undefined,
    },
    tenant: transaction.tenantId,
    rentAmount: transaction.rentAmount,
    dateFrom: transaction.dateFrom,
    dateTo: transaction.dateTo,
    status: transaction.status,
  };

  return normalizeTransactionDates(result);
};

export const normalizeTransactionDates = (
  transaction: TransactionModel
): TransactionModel => {
  if (transaction.dateTo?.startsWith("0001")) {
    transaction.dateTo = "--";
  }
  return transaction;
};
