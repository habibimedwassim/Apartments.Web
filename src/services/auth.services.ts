import {
  login,
  register,
  registerOwner,
  registerAdmin,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
  changePassword,
  changeEmail,
} from "@/http/auth.api";
import {
  LoginModel,
  ResetPasswordModel,
  EmailModel,
  LoginResponseModel,
  RegisterModel,
  VerifyEmailModel,
  ChangePasswordModel,
} from "@/models/auth.models";
import { getErrorMessage, getInfoMessage } from "@/lib/utils";
import { useAuthStore } from "@/store";

// Handle login service
export const loginService = async (
  data: LoginModel
): Promise<LoginResponseModel> => {
  try {
    const response = await login(data);

    // Use zustand store to handle login
    useAuthStore.getState().login(response);

    return response;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Helper function to handle API service calls that return `void` and capture messages.
 */
const handleApiCall = async (apiCall: () => Promise<any>): Promise<string> => {
  try {
    const response = await apiCall();
    return getInfoMessage(response.data?.message);
  } catch (error: any) {
    throw getErrorMessage(error);
  }
};

// Other service methods using handleApiCall
export const registerService = (data: RegisterModel): Promise<string> =>
  handleApiCall(() => register(data));

export const registerOwnerService = (data: RegisterModel): Promise<string> =>
  handleApiCall(() => registerOwner(data));

export const registerAdminService = (data: RegisterModel): Promise<string> =>
  handleApiCall(() => registerAdmin(data));

export const verifyEmailService = (data: VerifyEmailModel): Promise<string> =>
  handleApiCall(() => verifyEmail(data));

export const resendVerificationCodeService = (
  data: EmailModel
): Promise<string> => handleApiCall(() => resendVerificationCode(data));

export const forgotPasswordService = (data: EmailModel): Promise<string> =>
  handleApiCall(() => forgotPassword(data));

export const resetPasswordService = (
  data: ResetPasswordModel
): Promise<string> => handleApiCall(() => resetPassword(data));

export const changePasswordService = (
  data: ChangePasswordModel
): Promise<string> => handleApiCall(() => changePassword(data));

export const changeEmailService = (data: EmailModel): Promise<string> =>
  handleApiCall(() => changeEmail(data));
