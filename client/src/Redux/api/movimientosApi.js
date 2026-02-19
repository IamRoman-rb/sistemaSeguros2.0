import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movimientosApi = createApi({
    reducerPath: 'movimientosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Movimientos'],
    endpoints: (builder) => ({
        getMovimientos: builder.query({
            query: () => '/movimientos',
            providesTags: ['Movimientos'],
        }),
        createMovimiento: builder.mutation({
            query: (newMovimiento) => ({
                url: '/movimientos',
                method: 'POST',
                body: newMovimiento,
            }),
            invalidatesTags: ['Movimientos'],
        }),
        updateMovimiento: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/movimientos/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Movimientos'],
        }),
        deleteMovimiento: builder.mutation({
            query: (id) => ({
                url: '/movimientos',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Movimientos'],
        }),
    }),
});

export const { 
    useGetMovimientosQuery, 
    useCreateMovimientoMutation, 
    useUpdateMovimientoMutation, 
    useDeleteMovimientoMutation 
} = movimientosApi;