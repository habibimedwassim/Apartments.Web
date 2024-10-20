import { formatToLocalDateTime } from "@/lib/utils";

export interface CreateApartmentModel {
  title: string;
  city: string;
  street: string;
  postalCode: string;
  description: string;
  size: number;
  rentAmount: number;
  availableFrom?: string;
  apartmentPhotos: File[];
}

export interface UpdateApartmentModel {
  title?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  description?: string;
  size?: number;
  rentAmount?: number;
  availableFrom?: string;
}

export interface ApartmentResponseModel {
  id: number;
  title: string;
  city: string;
  street: string;
  postalCode: string;
  description: string;
  size: number;
  rentAmount: number;
  isOccupied: boolean;
  availableFrom?: string;
  createdDate: string;
  isDeleted: boolean;
  apartmentPhotos: ApartmentPhotoModel[];
}

export interface ApartmentModel {
  id: number;
  title: string;
  city: string;
  street: string;
  postalCode: string;
  description: string;
  size: number;
  rentAmount: number;
  status: string;
  availableFrom?: string;
  createdDate: string;
  apartmentPhotos: ApartmentPhotoModel[];
}

export interface ApartmentPhotoModel {
  id: number;
  createdDate: string;
  url: string;
}

export interface UploadApartmentPhotosModel {
  apartmentPhotos: File[];
}

export interface ApartmentQueryFilter {
  pageNumber: number;
  sortBy?: string;
  sortDirection?: string;
  title?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  apartmentSize?: number;
  minPrice?: number;
  maxPrice?: number;
  isOccupied?: boolean;
  availableFrom?: string;
}

export interface DismissModel {
  reason: string;
  requestDate?: string;
}

export const mapApartmentData = async (
  responseModel: ApartmentResponseModel[]
): Promise<ApartmentModel[]> => {
  return Promise.all(responseModel.map(mapSingleApartmentData));
};

export const mapSingleApartmentData = async (
  apartment: ApartmentResponseModel
): Promise<ApartmentModel> => {
  var result = {
    ...apartment,
    status: apartment.isDeleted
      ? ApartmentStatus.Archived
      : apartment.isOccupied
      ? ApartmentStatus.Occupied
      : ApartmentStatus.Available,
    createdDate: formatToLocalDateTime(apartment.createdDate),
    availableFrom: apartment.availableFrom ? apartment.availableFrom : "--",
  };

  return result;
};

export const ApartmentStatus = {
  Archived: "archived",
  Occupied: "occupied",
  Available: "available",
};
