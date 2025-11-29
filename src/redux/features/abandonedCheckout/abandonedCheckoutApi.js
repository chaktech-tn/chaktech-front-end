import { apiSlice } from "../../api/apiSlice";

export const abandonedCheckoutApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Save checkout data
    saveCheckoutData: builder.mutation({
      query: (data) => ({
        url: "/abandoned-checkout/save",
        method: "POST",
        body: data,
      }),
    }),

    // Get checkout by token
    getCheckoutByToken: builder.query({
      query: (token) => `/abandoned-checkout/${token}`,
    }),

    // Update checkout status
    updateCheckoutStatus: builder.mutation({
      query: ({ token, recoveryStatus }) => ({
        url: `/abandoned-checkout/${token}/status`,
        method: "PATCH",
        body: { recoveryStatus },
      }),
    }),
  }),
});

export const {
  useSaveCheckoutDataMutation,
  useGetCheckoutByTokenQuery,
  useUpdateCheckoutStatusMutation,
} = abandonedCheckoutApi;

