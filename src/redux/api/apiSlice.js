import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get API base URL from environment variable only
const getApiBaseUrl = () => {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};

// Suppress rate limit errors in development mode
const SUPPRESS_RATE_LIMIT_ERRORS =
  process.env.NEXT_PUBLIC_SUPPRESS_RATE_LIMIT_ERRORS === "true" ||
  process.env.NODE_ENV === "development";

// Custom base query with better error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    prepareHeaders: async (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // Add CORS-friendly headers
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
    // Add timeout
    timeout: 10000, // 10 seconds
    // Add credentials for CORS if needed
    credentials: "omit", // Change to "include" if backend requires credentials
  });

  const result = await baseQuery(args, api, extraOptions);

  // Handle errors
  if (result.error) {
    // Handle rate limiting (429) errors
    if (result.error.status === 429) {
      if (SUPPRESS_RATE_LIMIT_ERRORS) {
        // In dev mode, suppress the error and return a silent error
        result.error = {
          ...result.error,
          status: "CUSTOM_ERROR",
          data: { message: "Rate limit exceeded. Please try again later." },
          isRateLimitError: true,
          suppressLog: true, // Flag to suppress console logging
        };
      } else {
        // In production, still return error but with a user-friendly message
        result.error = {
          ...result.error,
          data: { message: "Rate limit exceeded. Please try again later." },
          isRateLimitError: true,
        };
      }
    } else if (
      result.error.status === "FETCH_ERROR" ||
      result.error.status === "PARSING_ERROR"
    ) {
      // Check if it's a CORS error
      const isCorsError = 
        result.error.error?.message?.includes("CORS") ||
        result.error.error?.message?.includes("cors") ||
        result.error.error?.message?.includes("Failed to fetch") ||
        result.error.error?.name === "TypeError";
      
      // Network error - backend not responding or CORS issue
      result.error = {
        ...result.error,
        message: isCorsError
          ? "CORS error: The backend server needs to allow requests from this domain. Please configure CORS on the backend."
          : "Unable to connect to the server. Please check if the backend is running.",
        isNetworkError: true,
        isCorsError: isCorsError,
      };
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Category",
    "Products",
    "Discount",
    "Coupon",
    "Product",
    "RelatedProducts",
    "Settings",
  ],
  endpoints: () => ({}),
});
