import { ORDERS_URL,} from "../constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orders) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...orders },
      }),
    }),
    getOrderDetail: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders : builder.query({
      query: () => ({
        url: ORDERS_URL
      }),
      keepUnusedDataFor: 5
    }),
    deliverOrder : builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT'
      })
    })
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation
} = orderApiSlice;
