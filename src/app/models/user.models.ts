export interface UserResponseModel {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  tempEmail?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  currentApartment?: object;
}

export interface UpdateUserModel {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface ChangePasswordModel {
  currentPassword: string;
  newPassword: string;
}

export interface EmailModel {
  email: string;
}

export interface VerifyNewEmailModel {
  email: string;
  password: string;
  verificationCode: string;
}

export interface UserModel {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  tempEmail?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface OwnerModel {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface TenantModel {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
}

export const mapToUserModel = async (
  userResponseModel: UserResponseModel
): Promise<UserModel> => {
  return {
    fullName: userResponseModel.fullName,
    firstName: userResponseModel.firstName,
    lastName: userResponseModel.lastName,
    email: userResponseModel.email,
    tempEmail: userResponseModel.tempEmail,
    phoneNumber: userResponseModel.phoneNumber,
    gender: userResponseModel.gender,
    dateOfBirth: userResponseModel.dateOfBirth,
  };
};

export const mapToTenantsList = async (
  responseModel: UserResponseModel[]
): Promise<TenantModel[]> => {
  return Promise.all(responseModel.map(mapToTenantModel));
};

export const mapToTenantModel = async (
  userResponseModel: UserResponseModel
): Promise<TenantModel> => {
  return {
    id: userResponseModel.id,
    firstName: userResponseModel.firstName,
    lastName: userResponseModel.lastName,
    email: userResponseModel.email,
    phoneNumber: userResponseModel.phoneNumber,
    gender: userResponseModel.gender,
    dateOfBirth: userResponseModel.dateOfBirth,
  };
};
