import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Email validation regular expression
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates if a given string is a valid email address.
 * @param email - The email string to validate.
 * @returns boolean - True if the email is valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

/**
 * Formats dates to a more readable format (e.g., "MM/DD/YYYY").
 * @param date - The date string to format.
 * @returns string - The formatted date.
 */
export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

/**
 * Converts a UTC date string to a local date-time string formatted as "YYYY-MM-DD hh:mm A".
 *
 * @param utcDate - The UTC date string to be converted.
 * @returns The formatted local date-time string.
 */
dayjs.extend(utc);
dayjs.extend(localizedFormat);
export const formatToLocalDateTime = (utcDate: string): string => {
  return dayjs.utc(utcDate).local().format("YYYY-MM-DD HH:mm");
};

/**
 * Extracts the error message from an API error response.
 * @param error - The error object to extract the message from.
 * @returns string - The extracted error message.
 */
export const getInfoMessage = (data: any): string => {
  return data.data?.message || data.data?.Message || "Operation successful";
};

/**
 * Extracts the error message from an API error response.
 * @param error - The error object to extract the message from.
 * @returns string - The extracted error message.
 */
export const getErrorMessage = (error: any): string => {
  return (
    error.response?.data?.message ||
    error.response?.data?.Message ||
    "An error occurred"
  );
};
