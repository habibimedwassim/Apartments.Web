import api from "@/app/api/base.api";
import { MessageResponseModel, PagedResult } from "@/app/models/api.models";
import {
  CreateUserReportModel,
  UpdateUserReportModel,
  UserReportModel,
  UserReportQueryFilterModel,
} from "@/app/models/report.models";

export const getUserReportById = async (
  id: number
): Promise<UserReportModel> => {
  const response = await api.get<UserReportModel>(`/reports/${id}`);
  return response.data;
};

export const getReports = async (
  filters: UserReportQueryFilterModel
): Promise<PagedResult<UserReportModel>> => {
  console.log(
    "Report API called: " + filters.type + " Page: " + filters.pageNumber
  );
  const response = await api.get<PagedResult<UserReportModel>>(`/reports`, {
    params: filters,
  });
  return response.data;
};

export const createUserReport = async (data: CreateUserReportModel) => {
  const formData = new FormData();

  formData.append("targetRole", data.targetRole);
  formData.append("message", data.message);

  if (data.targetId) {
    formData.append("targetId", data.targetId.toString());
  }
  if (data.attachment) {
    formData.append("attachment", data.attachment);
  }

  const response = await api.post("/reports", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateReport = async (id: number, data: UpdateUserReportModel) => {
  const formData = new FormData();

  if (data.message) {
    formData.append("message", data.message);
  }
  if (data.comments) {
    formData.append("comments", data.comments);
  }
  if (data.status) {
    formData.append("status", data.status);
  }
  if (data.resolvedDate) {
    formData.append("resolvedDate", data.resolvedDate);
  }
  if (data.attachment) {
    formData.append("attachment", data.attachment);
  }

  const response = await api.patch<MessageResponseModel>(
    `/reports/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
