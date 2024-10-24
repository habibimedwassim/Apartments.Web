import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeUserRole,
  disableUser,
  registerAdmin,
  registerOwner,
  updateEmail,
  updateMyProfile,
  updatePassword,
  verifyNewEmail,
} from "@/app/api/user.api";
import {
  ChangePasswordModel,
  EmailModel,
  RegisterModel,
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

export const useChangeUserRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, roleName }: { id: number; roleName: string }) =>
      changeUserRole(id, roleName),
    onSuccess: () => {
      // Invalidate queries related to users to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["All-users"] });
      queryClient.invalidateQueries({ queryKey: ["Admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["Owner-users"] });
      queryClient.invalidateQueries({ queryKey: ["User-users"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};

export const useDisableUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => disableUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["All-users"] });
      queryClient.invalidateQueries({ queryKey: ["Admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["Owner-users"] });
      queryClient.invalidateQueries({ queryKey: ["User-users"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};

export const useRegisterOwnerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterModel) => registerOwner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["All-users"] });
      queryClient.invalidateQueries({ queryKey: ["Owner-users"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};

export const useRegisterAdminMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterModel) => registerAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["All-users"] });
      queryClient.invalidateQueries({ queryKey: ["Admin-users"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });
};
