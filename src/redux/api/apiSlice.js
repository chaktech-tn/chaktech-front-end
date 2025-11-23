import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get API base URL - detect from current host, override env if needed
const getApiBaseUrl = () => {
  // In browser, detect current host and use same IP for backend
  // This ensures network IP access works correctly
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    // If accessing via network IP, use network IP for backend (override env)
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      const networkUrl = `http://${hostname}:5001`;
      console.log("Using network API URL:", networkUrl);
      return networkUrl;
    }
    // If localhost, use env or default
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";
    }
  }

  // Server-side or fallback
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";
};

// Suppress rate limit errors in development mode
const SUPPRESS_RATE_LIMIT_ERRORS =
  process.env.NEXT_PUBLIC_SUPPRESS_RATE_LIMIT_ERRORS === "true" ||
  process.env.NODE_ENV === "development";

// Custom base query with better error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    // Add timeout
    timeout: 10000, // 10 seconds
  });

  let result = await baseQuery(args, api, extraOptions);

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
  endpoints: (builder) => ({}),
});
