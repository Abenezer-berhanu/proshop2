import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductDetail: builder.query({
            query: (productId) => ({
                url : `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct : builder.mutation({
            query: () => ({
                url: PRODUCT_URL,
                method: 'POST'
            }),
            invalidatesTags:['product']
        })
    })
})

export const {useGetProductsQuery, useGetProductDetailQuery, useCreateProductMutation} = productsApiSlice