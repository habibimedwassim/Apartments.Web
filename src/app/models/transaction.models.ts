export interface TransactionRequestModel {
  id: number;
  createdDate: string;
  apartmentId: number;
  rentAmount: number;
  datefrom: string;
  dateTo?: string;
  status: string;
}
