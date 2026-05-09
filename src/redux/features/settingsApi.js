import { apiSlice } from "../api/apiSlice";

export const settingsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get settings
    getSettings: builder.query({
      query: () => `/settings`,
      providesTags: ["Settings"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useGetSettingsQuery,
} = settingsApi;

