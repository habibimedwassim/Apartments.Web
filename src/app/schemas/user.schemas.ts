// user.schemas.ts
import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/\d/, "Password must contain at least 1 number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least 1 special character"
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const verifyNewEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  verificationCode: z.string().min(1, "Verification code is required"),
});
