// Login Model
export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
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
