import {
  ChangeLogDto,
  ChangeLogQueryFilter,
} from "@/app/models/changelog.models";
import { getChangeLogs } from "@/app/api/changelog.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetChangeLogsQuery = (
  dto: ChangeLogDto,
  filter: ChangeLogQueryFilter
) => {
  return useInfiniteQuery({
    queryKey: ["changeLogs"],
    queryFn: ({ pageParam = 1 }) =>
      getChangeLogs(dto, { ...filter, pageNumber: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};
