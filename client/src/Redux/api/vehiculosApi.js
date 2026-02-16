import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vehiculosApi = createApi({
    reducerPath: 'vehiculosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Vehiculos'],
    keepUnusedDataFor: 3600,
    endpoints: (builder) => ({
        getVehiculos: builder.query({
            query: () => '/vehiculos',
            providesTags: ['Vehiculos'],
        }),
        getVehiculoById: builder.query({
            query: (id) => `/vehiculos/${id}`,
            providesTags: (result, error, id) => [{ type: 'Vehiculos', id }],
        }),
        createVehiculo: builder.mutation({
            query: (newVehiculo) => ({
                url: '/vehiculos',
                method: 'POST',
                body: newVehiculo,
            }),
            invalidatesTags: ['Vehiculos'],
        }),
        updateVehiculo: builder.mutation({
            query: (vehiculoData) => ({
                url: '/vehiculos',
                method: 'PUT',
                body: vehiculoData,
            }),
            invalidatesTags: ['Vehiculos'],
        }),
        deleteVehiculo: builder.mutation({
            query: (id) => ({
                url: '/vehiculos',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Vehiculos'],
        }),
    }),
});

export const { 
    useGetVehiculosQuery, 
    useGetVehiculoByIdQuery,
    useLazyGetVehiculoByIdQuery,
    useCreateVehiculoMutation,
    useUpdateVehiculoMutation,
    useDeleteVehiculoMutation
} = vehiculosApi;