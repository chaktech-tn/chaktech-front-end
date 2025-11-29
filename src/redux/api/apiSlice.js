import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get API base URL - detect from current host, override env if needed
const getApiBaseUrl = () => {
  // 1. Priority: Environment Variable (Production/Staging)
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // 2. Browser-side dynamic detection for local network development
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    
    // Check if it's a local IP address (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
    const isLocalNetwork = 
      /^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname);

    if (isLocalNetwork) {
      const networkUrl = `http://${hostname}:5001`;
      return networkUrl;
    }
  }

  // 3. Fallback default
  return "https://api.chaktech.tn";
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
