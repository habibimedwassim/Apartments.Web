import { z } from "zod";

// Define the schema for creating an apartment
export const createApartmentSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  city: z.string().min(1, { message: "City is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  postalCode: z.string().min(1, { message: "Postal Code is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  size: z.coerce.number().min(1, { message: "Size must be at least 1" }),
  rentAmount: z.coerce
    .number()
    .min(1, { message: "Rent amount must be positive" }),

  availableFrom: z.string().optional().nullable(),
  apartmentPhotos: z.array(z.instanceof(File)).optional(),
});

// Define the schema for updating an apartment
export const updateApartmentSchema = z.object({
  title: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  postalCode: z.string().optional(),
  description: z.string().optional(),
  size: z.coerce.number().optional(),
  rentAmount: z.coerce.number().optional(),
  availableFrom: z.string().optional().nullable(),
});
