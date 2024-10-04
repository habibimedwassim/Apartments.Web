// apartments.models.ts

// Create Apartment Model
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

// Update Apartment Model
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

// Apartment Response Model
export interface ApartmentResponseModel {
  id: number;
  title: string;
  city: string;
  street: string;
  postalCode: string;
  size: number;
  rentAmount: number;
  isOccupied: boolean;
  availableFrom?: string;
  createdDate: string;
  isDeleted: boolean;
  apartmentPhotos: ApartmentPhotoModel[];
}

export interface ApartmentPhotoModel {
  id: number;
  createdDate: string;
  url: string;
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

export interface PagedResult<T> {
  items: T[];
  totalPages: number;
  totalCount: number;
  itemsFrom: number;
  itemsTo: number;
}
