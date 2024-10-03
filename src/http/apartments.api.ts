import api from "./api";

export enum SortDirection {
  Ascending = 0,
  Descending = 1,
}

// Get all apartments with filters
export const getAllApartments = async (filters?: {
  pageNumber?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  city?: string;
  street?: string;
  postalCode?: string;
  apartmentSize?: number;
  minPrice?: number;
  maxPrice?: number;
  isOccupied?: boolean;
  availableFrom?: string;
}) => {
  const queryParams = new URLSearchParams();

  // Append filters to query parameters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
  }

  return await api.get(
    `/apartments${queryParams.toString() ? `?${queryParams}` : ""}`
  );
};

// Get an apartment by ID
export const getApartmentById = async (id: number) => {
  return await api.get(`/apartments/${id}`);
};

// Create a new apartment (multipart/form-data)
export const createApartment = async (data: {
  city: string;
  street: string;
  postalCode: string;
  description: string;
  size: number;
  rentAmount: number;
  availableFrom?: string;
  apartmentPhotos?: File[];
}) => {
  const formData = new FormData();

  // Append fields to formData
  formData.append("City", data.city);
  formData.append("Street", data.street);
  formData.append("PostalCode", data.postalCode);
  formData.append("Description", data.description);
  formData.append("Size", data.size.toString());
  formData.append("RentAmount", data.rentAmount.toString());

  if (data.availableFrom) {
    formData.append("AvailableFrom", data.availableFrom);
  }

  if (data.apartmentPhotos) {
    data.apartmentPhotos.forEach((file) => {
      formData.append(`ApartmentPhotos`, file);
    });
  }

  return await api.post("/apartments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update an apartment
export const updateApartment = async (id: number, data: any) => {
  return await api.patch(`/apartments/${id}`, data);
};

// Delete an apartment
export const deleteApartment = async (id: number) => {
  return await api.delete(`/apartments/${id}`);
};

// Restore an apartment
export const restoreApartment = async (id: number) => {
  return await api.get(`/apartments/${id}/restore`);
};

// Apply for an apartment
export const applyForApartment = async (id: number) => {
  return await api.post(`/apartments/${id}/apply`);
};

// Dismiss a tenant from an apartment
export const dismissTenantFromApartment = async (id: number, data: any) => {
  return await api.post(`/apartments/${id}/dismiss`, data);
};

// Leave an apartment request
export const leaveApartmentRequest = async (id: number, data: any) => {
  return await api.post(`/apartments/${id}/leave`, data);
};

// Pay for an apartment
export const payForApartment = async (id: number) => {
  return await api.post(`/apartments/${id}/pay`);
};
