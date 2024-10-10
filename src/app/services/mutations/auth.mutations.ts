import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/hooks/use-store";
import { USER_ROLE } from "@/app/constants/user-role";
import {
  login,
  register,
  registerOwner,
  registerAdmin,
  resetPassword,
  changePassword,
  changeEmail,
  forgotPassword,
  resendVerificationCode,
} from "@/app/api/auth.api";
import {
  LoginModel,
  RegisterModel,
  ResetPasswordModel,
  ChangePasswordModel,
  EmailModel,
  LoginResponseModel,
} from "@/app/models/auth.models";
import { getErrorMessage } from "@/lib/utils";

// Login Mutation
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginModel) => login(data),
    onSuccess: (response: LoginResponseModel) => {
      if (response.role !== USER_ROLE.USER) {
        useAuthStore.getState().login(response);
      }
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};

// Register Mutation
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterModel) => register(data),
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};

// Register Owner Mutation
export const useRegisterOwnerMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterModel) => registerOwner(data),
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};

// Register Admin Mutation
export const useRegisterAdminMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterModel) => registerAdmin(data),
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};

// Forgot Password Mutation
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: EmailModel) => forgotPassword(data),
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};

// Reset Password Mutation
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordModel) => resetPassword(data),
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};

// Resend Code Mutation
export const useResendCodeMutation = () => {
  return useMutation({
    mutationFn: (data: EmailModel) => resendVerificationCode(data),
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};

// Change Password Mutation
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordModel) => changePassword(data),
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};

// Change Email Mutation
export const useChangeEmailMutation = () => {
  return useMutation({
    mutationFn: (data: EmailModel) => changeEmail(data),
    onError: (error: any) => {
      throw getErrorMessage(error);
    },
  });
};
