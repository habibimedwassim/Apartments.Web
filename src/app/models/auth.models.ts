import { UserModel } from "@/app/models/user.models";

export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  id: number;
  avatar?: string;
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

// export interface RegisterModel {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber?: string;
//   gender?: string;
//   dateOfBirth?: string;
// }

export interface VerifyEmailModel {
  email: string;
  verificationCode: string;
}

export interface EmailModel {
  email: string;
}

export interface ResetPasswordModel {
  email: string;
  verificationCode: string;
  newPassword: string;
}

export interface ChangePasswordModel {
  currentPassword: string;
  newPassword: string;
}

export const mapLoginResponseToUserModel = (
  loginResponse: LoginResponseModel
): UserModel => {
  return {
    id: loginResponse.id,
    avatar: loginResponse.avatar,
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
