export interface MessageResponseModel {
  message: string;
  errors: string[];
}

export interface PagedResult<T> {
  items: T[];
  totalPages: number;
  totalCount: number;
  itemsFrom: number;
  itemsTo: number;
}
