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
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/\d/, "Password must contain at least 1 number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least 1 special character"
    ),

  verificationCode: z
    .string()
    .min(6, { message: "Verification code must be at least 6 characters long" })
    .max(6, { message: "Verification code must be exactly 6 characters long" }),
});

export const verificationSchema = z.object({
  verificationCode: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Verification code must be numeric"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/\d/, "Password must contain at least 1 number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least 1 special character"
    ),
});

// Utility function to check if a user is at least 18 years old
const isAtLeast18YearsOld = (dateString: string) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

export const registerSchema = z.object({
  cin: z
    .string()
    .min(8, "CIN must be exactly 8 digits.")
    .max(8, "CIN must be exactly 8 digits.")
    .regex(/^\d{8}$/, "Please provide a valid CIN number (8 digits)."),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/\d/, "Password must contain at least 1 number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least 1 special character"
    ),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .optional()
    .refine((value) => value === undefined || /^[25749]\d{7}$/.test(value), {
      message:
        "Please provide a valid phone number that starts with 2, 5, 9, 4, or 7 and is 8 digits long.",
    }),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({
      message: "Please enter a valid Gender (Male or Female)",
    }),
  }),
  dateOfBirth: z
    .string()
    .optional()
    .refine((date) => !date || isAtLeast18YearsOld(date), {
      message: "You must be at least 18 years old.",
    }),
});
