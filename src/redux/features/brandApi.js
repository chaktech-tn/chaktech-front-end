import { apiSlice } from "src/redux/api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "/brand/active",
      transformResponse: (response) => {
        if (Array.isArray(response)) return response;
        if (Array.isArray(response?.data)) return response.data;
        if (Array.isArray(response?.result)) return response.result;
        if (Array.isArray(response?.data?.result)) return response.data.result;
        if (Array.isArray(response?.data?.data)) return response.data.data;
        return [];
      },
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
