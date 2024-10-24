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

export const mapToOwnerDashboardData = (
  data: OwnerDashboardData
): OwnerDashboardData => {
  return {
    ...data,
    recentTransactions: normalizeTransactionList(data.recentTransactions),
  };
};

export const normalizeTransactionList = (
  transactions: DashboardTransactionModel[]
): DashboardTransactionModel[] => {
  return transactions.map(normalizeTransactionDates);
};

export const normalizeTransactionDates = (
  transaction: DashboardTransactionModel
): DashboardTransactionModel => {
  if (transaction.dateTo?.startsWith("0001")) {
    transaction.dateTo = "--";
  }
  return transaction;
};

export interface AdminDashboardData {
  totalUsers: number;
  totalOwners: number;
  totalTenants: number;
  activeUsersLast30Days: number;
  reportsByMonth: ReportsByMonthModel[];
  recentReports: RecentReportModel[];
  recentChangeLogs: ChangeLogModel[];
}

export interface ReportsByMonthModel {
  month: string;
  reports: number;
}

export interface RecentReportModel {
  id: number;
  message: string;
  status: string;
  createdDate: string;
}

export interface ChangeLogModel {
  id: number;
  entityType: string;
  propertyName: string;
  propertyId: string;
  oldValue?: string;
  newValue?: string;
  changedAt: string;
  changedBy: string;
}

// Function to map the raw data to AdminDashboardData format
export const mapToAdminDashboardData = (
  data: AdminDashboardData
): AdminDashboardData => {
  return {
    ...data,
    recentReports: normalizeReportDates(data.recentReports),
    recentChangeLogs: normalizeChangeLogDates(data.recentChangeLogs),
  };
};

// Function to normalize dates in RecentReportModel
export const normalizeReportDates = (
  reports: RecentReportModel[]
): RecentReportModel[] => {
  return reports.map((report) => ({
    ...report,
    createdDate: formatDate(report.createdDate),
  }));
};

// Function to normalize dates in ChangeLogModel
export const normalizeChangeLogDates = (
  changeLogs: ChangeLogModel[]
): ChangeLogModel[] => {
  return changeLogs.map((log) => ({
    ...log,
    changedAt: formatDate(log.changedAt),
  }));
};

// Helper function to format dates
const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};
