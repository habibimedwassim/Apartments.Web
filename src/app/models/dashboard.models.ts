import { ApartmentRequestModel } from "./apartment-request.models";

export interface OwnerDashboardData {
  totalOwnedApartments: number;
  occupiedApartments: number;
  availableApartments: number;
  totalTenants: number;
  totalRevenue: number;
  recentTransactions: DashboardTransactionModel[];
  recentRequests: ApartmentRequestModel[];
  revenueByMonth: RevenueByMonthModel[];
}

export interface DashboardTransactionModel {
  id: number;
  createdDate: string;
  apartmentId: number;
  rentAmount: number;
  dateFrom: string;
  dateTo?: string;
  status: string;
}

export interface RequestModel {
  id: number;
  requestType: string;
  status: string;
  requestDate: string;
  reason?: string;
}

export interface RevenueByMonthModel {
  month: string;
  revenue: number;
}
