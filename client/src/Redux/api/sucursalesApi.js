import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sucursalesApi = createApi({
    reducerPath: 'sucursalesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Sucursales'],
    keepUnusedDataFor: 3600,
    endpoints: (builder) => ({
        getSucursales: builder.query({
            query: () => '/sucursales',
            providesTags: ['Sucursales'],
        }),
        getSucursalById: builder.query({
            query: (id) => `/sucursales/${id}`,
            providesTags: (result, error, id) => [{ type: 'Sucursales', id }],
        }),
        createSucursal: builder.mutation({
            query: (newSucursal) => ({
                url: '/sucursales',
                method: 'POST',
                body: newSucursal,
            }),
            invalidatesTags: ['Sucursales'],
        }),
        updateSucursal: builder.mutation({
            query: (sucursalData) => ({
                url: '/sucursales',
                method: 'PUT',
                body: sucursalData,
            }),
            invalidatesTags: ['Sucursales'],
        }),
        deleteSucursal: builder.mutation({
            query: (id) => ({
                url: '/sucursales',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Sucursales'],
        }),
    }),
});

export const {
    useGetSucursalesQuery,
    useGetSucursalByIdQuery,
    useCreateSucursalMutation,
    useUpdateSucursalMutation,
    useDeleteSucursalMutation,
} = sucursalesApi;