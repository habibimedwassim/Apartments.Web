import { UserModel } from "@/app/models/user.models";

// Login Model
export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  email: string;
  tempEmail?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  gender?: string;
  role?: string;
  accessToken: string;
}

// Register Model
export interface RegisterModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
}

// Verify Email Model
export interface VerifyEmailModel {
  email: string;
  verificationCode: string;
}

// Email Model (For forgot-password and resend-code)
export interface EmailModel {
  email: string;
}

// Reset Password Model
export interface ResetPasswordModel {
  email: string;
  verificationCode: string;
  newPassword: string;
}

// Change Password Model
export interface ChangePasswordModel {
  currentPassword: string;
  newPassword: string;
}

export const mapLoginResponseToUserModel = (
  loginResponse: LoginResponseModel
): UserModel => {
  return {
    fullName: loginResponse.fullName,
    firstName: loginResponse.firstName,
    lastName: loginResponse.lastName,
    email: loginResponse.email,
    tempEmail: loginResponse.tempEmail,
    phoneNumber: loginResponse.phoneNumber,
    gender: loginResponse.gender,
    dateOfBirth: loginResponse.dateOfBirth,
  };
};
