import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateEmail,
  updateMyProfile,
  updatePassword,
  verifyNewEmail,
} from "@/app/api/user.api";
import {
  ChangePasswordModel,
  EmailModel,
  UpdateUserModel,
  VerifyNewEmailModel,
} from "@/app/models/user.models";

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
  const mutation = useMutation({
    mutationFn: ({ data }: { data: ChangePasswordModel }) =>
      updatePassword(data),
    onError: (error: string) => {
      throw error;
    },
  });
  return mutation;
};

export const useUpdateEmailMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: EmailModel }) => updateEmail(data),
    onError: (error: string) => {
      throw error;
    },
  });
  return mutation;
};

export const useVerifyNewEmailMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: VerifyNewEmailModel }) =>
      verifyNewEmail(data),
    onError: (error: string) => {
      throw error;
    },
  });
  return mutation;
};
