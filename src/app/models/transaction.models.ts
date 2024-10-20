import { OwnerModel } from "@/app/models/user.models";

export interface TransactionRequestModel {
  id: number;
  createdDate: string;
  apartmentId: number;
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
  rentAmount: number;
  dateFrom: string;
  dateTo?: string;
  status: string;
}

// Mapper for a list of transactions
export const mapToTransactionsList = async (
  responseModel: TransactionRequestModel[]
): Promise<TransactionModel[]> => {
  return Promise.all(responseModel.map(mapToTransactionModel));
};

// Mapper for a single transaction
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
        : undefined, // Map owner details if present
    },
    rentAmount: transaction.rentAmount,
    dateFrom: transaction.dateFrom,
    dateTo: transaction.dateTo,
    status: transaction.status,
  };

  return normalizeTransactionDates(result);
};

// Normalize date fields in the transaction
export const normalizeTransactionDates = (
  transaction: TransactionModel
): TransactionModel => {
  if (transaction.dateTo?.startsWith("0001-01-01")) {
    transaction.dateTo = "--";
  }
  return transaction;
};
