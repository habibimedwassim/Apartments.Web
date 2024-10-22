import { getReports, getUserReportById } from "@/app/api/report.api";
import { REPORT_TYPES } from "@/app/constants/report";
import {
  UserReportModel,
  UserReportQueryFilterModel,
} from "@/app/models/report.models";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetApartmentRequestByIdQuery = (id: number) => {
  return useQuery<UserReportModel>({
    queryKey: ["user-reports", id],
    queryFn: () => getUserReportById(id),
  });
};

export const useGetReportsQuery = (filter: UserReportQueryFilterModel) => {
  return useInfiniteQuery({
    queryKey: [`${filter.type}-reports`],
    queryFn: ({ pageParam = 1 }) =>
      getReports({ ...filter, pageNumber: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetSentReportsQuery = () =>
  useGetReportsQuery({ type: REPORT_TYPES.Sent, pageNumber: 1 });

export const useGetReceivedReportsQuery = () =>
  useGetReportsQuery({ type: REPORT_TYPES.Received, pageNumber: 1 });
