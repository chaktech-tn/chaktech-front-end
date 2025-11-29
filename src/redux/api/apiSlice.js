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
      return headers;
    },
    // Add timeout
    timeout: 10000, // 10 seconds
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
      // Network error - backend not responding
      result.error = {
        ...result.error,
        message:
          "Unable to connect to the server. Please check if the backend is running.",
        isNetworkError: true,
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
