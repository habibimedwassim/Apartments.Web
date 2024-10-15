import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore, useProfileStore } from "@/hooks/use-store";
import { USER_ROLE } from "@/app/constants/user-role";
import {
  login,
  registerOwner,
  registerAdmin,
  resetPassword,
  forgotPassword,
  resendVerificationCode,
} from "@/app/api/auth.api";
import {
  LoginModel,
  RegisterModel,
  ResetPasswordModel,
  EmailModel,
  LoginResponseModel,
  mapLoginResponseToUserModel,
} from "@/app/models/auth.models";

// Login Mutation
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginModel) => login(data),
    onSuccess: (response: LoginResponseModel) => {
      if (response.role !== USER_ROLE.USER) {
        useAuthStore.getState().login(response);
        const userModel = mapLoginResponseToUserModel(response);
        useProfileStore.getState().setProfile(userModel);
      }
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
  });
};

// Register Owner Mutation
export const useRegisterOwnerMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterModel) => registerOwner(data),
  });
};

// Register Admin Mutation
export const useRegisterAdminMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterModel) => registerAdmin(data),
  });
};

// Forgot Password Mutation
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: EmailModel) => forgotPassword(data),
  });
};

// Reset Password Mutation
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordModel) => resetPassword(data),
  });
};

// Resend Code Mutation
export const useResendCodeMutation = () => {
  return useMutation({
    mutationFn: ({ data, type }: { data: EmailModel; type: string }) =>
      resendVerificationCode(data, type),
  });
};
