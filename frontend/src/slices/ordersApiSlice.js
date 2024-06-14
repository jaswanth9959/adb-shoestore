import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),

    getMyOrders: builder.query({
      query: (customerId) => ({
        url: `${ORDERS_URL}/mine/${customerId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getReadyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/ready`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/${data.id}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    deliveredByMe: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/delivered/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useDeliveredByMeQuery,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetAllOrdersQuery,
  useGetReadyOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetMyOrdersQuery,
} = ordersApiSlice;
