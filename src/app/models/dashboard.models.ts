export interface OwnerDashboardData {
  totalOwnedApartments: number;
  occupiedApartments: number;
  availableApartments: number;
  totalTenants: number;
  totalRevenue: number;
  recentTransactions: DashboardTransactionModel[];
  recentRentRequests: RequestModel[];
  recentLeaveRequests: RequestModel[];
  recentDismissRequests: RequestModel[];
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

// Function to map and normalize OwnerDashboardData
export const mapToOwnerDashboardData = (
  data: OwnerDashboardData
): OwnerDashboardData => {
  return {
    ...data,
    recentTransactions: normalizeTransactionList(data.recentTransactions),
  };
};

// Function to normalize a list of transactions
export const normalizeTransactionList = (
  transactions: DashboardTransactionModel[]
): DashboardTransactionModel[] => {
  return transactions.map(normalizeTransactionDates);
};

// Function to normalize transaction dates
export const normalizeTransactionDates = (
  transaction: DashboardTransactionModel
): DashboardTransactionModel => {
  if (transaction.dateTo?.startsWith("0001")) {
    transaction.dateTo = "--";
  }
  return transaction;
};
