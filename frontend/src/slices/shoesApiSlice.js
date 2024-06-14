import { SHOES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const shoesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShoes: builder.query({
      query: () => ({
        url: SHOES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getShoeById: builder.query({
      query: (id) => ({
        url: `${SHOES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createShoe: builder.mutation({
      query: (data) => ({
        url: `${SHOES_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shoe"],
    }),
    updateShoe: builder.mutation({
      query: (data) => ({
        url: `${SHOES_URL}/${data.shoeId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Menu"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${SHOES_URL}/${data.shoeId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shoe"],
    }),
  }),
});
export const {
  useGetShoesQuery,
  useGetShoeByIdQuery,
  useCreateShoeMutation,
  useUpdateShoeMutation,
  useUploadImageMutation,
  useCreateReviewMutation,
} = shoesApiSlice;
