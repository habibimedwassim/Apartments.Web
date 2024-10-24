export interface ChangeLogDto {
  entityName: string;
  startDate: string;
  endDate?: string;
}

export interface ChangeLogQueryFilter {
  pageNumber: number;
  sortBy?: string;
  sortDirection?: 0 | 1;
}

export interface ChangeLog {
  id: number;
  entityType: string;
  propertyName: string;
  propertyId: string;
  oldValue?: string;
  newValue?: string;
  changedAt: string;
  changedBy: string;
}
