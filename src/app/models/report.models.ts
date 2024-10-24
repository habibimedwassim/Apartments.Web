export interface UserReportModel {
  id: number;
  createdDate: string;
  resolvedDate?: string;
  reporterId: number;
  reporterAvatar?: string;
  reporterInitials?: string;
  reporterRole?: string;
  targetId?: number;
  targetRole: string;
  message: string;
  status: string;
  attachmentUrl?: string;
  comments?: string;
}

export interface UpdateUserReportModel {
  resolvedDate?: string;
  status?: string;
  message?: string;
  comments?: string;
  attachment?: File | null;
}

export interface CreateUserReportModel {
  targetId?: number | null;
  targetRole: string;
  message: string;
  attachment?: File | null;
}

export interface UserReportQueryFilterModel {
  pageNumber: number;
  type: string;
  sortBy?: string;
  sortDirection?: 0 | 1; // 0 = Ascending, 1 = Descending
  status?: string;
  fromDate?: string;
  toDate?: string;
}
