import { apiSlice } from "./apiSlice";
import { STAFF_URL } from "../constants";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    staffLogin: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getStaff: builder.query({
      query: () => ({
        url: STAFF_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["STAFF"],
    }),
    createStaff: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Staff"],
    }),
    updateStaff: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/${data.staffId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    getStaffByID: builder.query({
      query: (id) => ({
        url: `${STAFF_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteStaff: builder.mutation({
      query: (staffId) => ({
        url: `${STAFF_URL}/${staffId}`,
        method: "DELETE",
      }),
      providesTags: ["Staff"],
    }),
    staffprofile: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/${data.staffId}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useStaffLoginMutation,
  useGetStaffQuery,
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useGetStaffByIDQuery,
  useUpdateStaffMutation,
  useStaffprofileMutation,
} = staffApiSlice;
