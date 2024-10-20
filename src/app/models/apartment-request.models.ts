export interface ApartmentRequestModel {
  id: number;
  createdDate: string;
  apartmentId: number;
  tenantId: number;
  avatar?: string;
  requestDate?: string;
  reason?: string;
  status: string;
  requestType: string;
  isDeleted: boolean;
}

export interface UpdateApartmentRequestModel {
  requestDate?: string;
  reason?: string;
  status?: string;
}

export interface ApartmentRequestQueryFilterModel {
  type: string;
  sortBy?: string;
  sortDirection?: 0 | 1; // 0 = Ascending, 1 = Descending
  apartmentId?: number;
  status?: string;
}

export type RequestType = "rent" | "leave" | "payment" | "dismiss";
