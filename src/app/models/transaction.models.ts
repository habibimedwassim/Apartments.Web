export interface TransactionRequestModel {
  id: number;
  createdDate: string;
  apartmentId: number;
  rentAmount: number;
  dateFrom: string;
  dateTo?: string;
  status: string;
}

export interface TransactionModel {
  id: number;
  createdDate: string;
  apartment: number;
  rentAmount: number;
  dateFrom: string;
  dateTo?: string;
  status: string;
}
// Mapper for a list of apartments
export const mapToTransactionsList = async (
  responseModel: TransactionRequestModel[]
): Promise<TransactionModel[]> => {
  return Promise.all(responseModel.map(mapToTransactionModel));
};

// Mapper for a single apartment
export const mapToTransactionModel = async (
  transaction: TransactionRequestModel
): Promise<TransactionModel> => {
  var result = {
    id: transaction.id,
    createdDate: transaction.createdDate,
    apartment: transaction.apartmentId,
    rentAmount: transaction.rentAmount,
    dateFrom: transaction.dateFrom,
    dateTo: transaction.dateTo,
    status: transaction.status,
  };

  return result;
};
