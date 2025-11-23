import { apiSlice } from "src/redux/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    // get showing products
    getShowingProducts: builder.query({
      query: () => `/api/products/show`,
      transformResponse: (response) => {
        // Backend returns {success: true, products: [...]}
        // Return the response as-is so products.products works
        return response;
      },
      providesTags: ["Products"],
      keepUnusedDataFor: 600,
    }),
    // get discount products
    getDiscountProducts: builder.query({
      query: () => `api/products/discount`,
      providesTags: ["Discount"],
      keepUnusedDataFor: 600,
    }),
    // get single product by id
    getProduct: builder.query({
      query: (id) => `api/products/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    // get single product by slug
    getProductBySlug: builder.query({
      query: (slug) => `api/products/slug/${slug}`,
      providesTags: (result, error, arg) => [{ type: "Product", slug: arg }],
    }),
    // getRelatedProducts
    getRelatedProducts: builder.query({
      query: ({ id, tags }) => {
        const queryString = 
        `api/products/relatedProduct?tags=${tags.join(",")}`;
        return queryString;
      },
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg.id },
      ],
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    // search products - live search with debouncing
    searchProducts: builder.query({
      query: ({ q, limit = 10 }) => {
        if (!q || q.trim().length === 0) {
          return `/api/products/search?q=&limit=${limit}`;
        }
        return `/api/products/search?q=${encodeURIComponent(q.trim())}&limit=${limit}`;
      },
      keepUnusedDataFor: 0, // Don't cache search results
    }),
  }),
});

export const {
  useGetShowingProductsQuery,
  useGetDiscountProductsQuery,
  useGetProductQuery,
  useGetProductBySlugQuery,
  useGetRelatedProductsQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
} = authApi;
