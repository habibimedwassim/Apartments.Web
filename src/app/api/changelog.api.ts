import api from "@/app/api/base.api";
import {
  ChangeLogDto,
  ChangeLogQueryFilter,
  ChangeLog,
} from "@/app/models/changelog.models";
import { PagedResult } from "@/app/models/api.models";

export const getChangeLogs = async (
  dto: ChangeLogDto,
  filter: ChangeLogQueryFilter
): Promise<PagedResult<ChangeLog>> => {
  console.log("CL API CALLED");
  const response = await api.post<PagedResult<ChangeLog>>(
    `/admin/changelogs`,
    dto,
    {
      params: filter,
    }
  );
  return response.data;
};
