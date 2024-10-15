import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/app/api/user.api";
import { UserModel } from "@/app/models/user.models";

export const useGetUserProfileQuery = () => {
  return useQuery<UserModel>({
    queryKey: ["user-details"],
    queryFn: getMyProfile,
  });
};
