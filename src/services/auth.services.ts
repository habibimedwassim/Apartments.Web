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
import { getErrorMessage } from "@/utils/utils";

/**
 * Helper function to handle API service calls with error handling and message retrieval.
 */
const handleApiCall = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    const response = await apiCall();
    return response;
  } catch (error: any) {
    throw getErrorMessage(error);
  }
};

/**
 * Helper function to handle API service calls that return `void` and capture messages.
 */
const handleApiCallWithMessage = async (
  apiCall: () => Promise<any>
): Promise<string> => {
  try {
    const response = await apiCall();
    return response.data?.message || "Operation successful";
  } catch (error: any) {
    throw getErrorMessage(error);
  }
};

export const loginService = (data: LoginModel): Promise<LoginResponseModel> =>
  handleApiCall(() => login(data));

export const registerService = (data: RegisterModel): Promise<string> =>
  handleApiCallWithMessage(() => register(data));

export const registerOwnerService = (data: RegisterModel): Promise<string> =>
  handleApiCallWithMessage(() => registerOwner(data));

export const registerAdminService = (data: RegisterModel): Promise<string> =>
  handleApiCallWithMessage(() => registerAdmin(data));

export const verifyEmailService = (data: VerifyEmailModel): Promise<string> =>
  handleApiCallWithMessage(() => verifyEmail(data));

export const resendVerificationCodeService = (
  data: EmailModel
): Promise<string> =>
  handleApiCallWithMessage(() => resendVerificationCode(data));

export const forgotPasswordService = (data: EmailModel): Promise<string> =>
  handleApiCallWithMessage(() => forgotPassword(data));

export const resetPasswordService = (
  data: ResetPasswordModel
): Promise<string> => handleApiCallWithMessage(() => resetPassword(data));

export const changePasswordService = (
  data: ChangePasswordModel
): Promise<string> => handleApiCallWithMessage(() => changePassword(data));

export const changeEmailService = (data: EmailModel): Promise<string> =>
  handleApiCallWithMessage(() => changeEmail(data));
