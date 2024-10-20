import { z } from "zod";

export const createApartmentSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  city: z.string().min(1, { message: "City is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  postalCode: z.string().min(1, { message: "Postal Code is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  size: z.coerce.number().min(0, { message: "Size must be positive" }),
  rentAmount: z.coerce
    .number()
    .min(1, { message: "Rent amount must be positive" }),

  availableFrom: z.string().optional().nullable(),
  apartmentPhotos: z.array(z.instanceof(File)).optional(),
});

export const updateApartmentSchema = z
  .object({
    title: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }).optional(),
    street: z.string().optional(),
    postalCode: z
      .string()
      .min(1, { message: "Postal Code is required" })
      .optional(),
    description: z.string().optional(),
    size: z.coerce.number().optional(),
    rentAmount: z.coerce.number().optional(),
    availableFrom: z.string().optional().nullable(),
  })
  .refine((data) => data.city !== "" && data.postalCode !== "", {
    message: "City and Postal Code cannot be empty",
    path: ["city", "postalCode"],
  });
