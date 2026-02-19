import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pagosApi = createApi({
    reducerPath: 'pagosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Pagos', 'Polizas'],
    endpoints: (builder) => ({
        getPagos: builder.query({
            query: () => '/pagos',
            providesTags: ['Pagos'],
        }),
        createPago: builder.mutation({
            query: (newPago) => ({
                url: '/pagos',
                method: 'POST',
                body: newPago,
            }),
            invalidatesTags: ['Pagos', 'Polizas'],
        }),
        getPagoById: builder.query({
            query: (id) => `/pagos/${id}`,
            providesTags: (result, error, id) => [{ type: 'Pagos', id }],
        }),
        deletePago: builder.mutation({
            query: (id) => ({
                url: '/pagos',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Pagos'],
        }),
    }),
});

export const { useGetPagosQuery, useCreatePagoMutation, useDeletePagoMutation, useGetPagoByIdQuery } = pagosApi;