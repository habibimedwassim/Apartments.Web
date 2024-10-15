import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile, updatePassword } from "@/app/api/user.api";
import { ChangePasswordModel, UpdateUserModel } from "@/app/models/user.models";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: UpdateUserModel }) => updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
  return mutation;
};

export const useUpdatePasswordMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: ChangePasswordModel }) =>
      updatePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
  return mutation;
};
