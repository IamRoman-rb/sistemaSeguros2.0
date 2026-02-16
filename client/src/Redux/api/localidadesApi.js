import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const localidadesApi = createApi({
    reducerPath: 'localidadesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Localidades'],
    keepUnusedDataFor: 3600,
    endpoints: (builder) => ({
        getLocalidades: builder.query({
            query: () => '/localidades',
            providesTags: ['Localidades'],
        }),
        getLocalidadById: builder.query({
            query: (id) => `/localidades/${id}`,
            providesTags: (result, error, id) => [{ type: 'Localidades', id }],
        }),
        createLocalidad: builder.mutation({
            query: (newLocalidad) => ({
                url: '/localidades',
                method: 'POST',
                body: newLocalidad,
            }),
            invalidatesTags: ['Localidades'],
        }),
        updateLocalidad: builder.mutation({
            query: (localidadData) => ({
                url: '/localidades',
                method: 'PUT',
                body: localidadData,
            }),
            invalidatesTags: ['Localidades'],
        }),
        deleteLocalidad: builder.mutation({
            query: (id) => ({
                url: '/localidades',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Localidades'],
        }),
    }),
});

export const {
    useGetLocalidadesQuery,
    useGetLocalidadByIdQuery,
    useCreateLocalidadMutation,
    useUpdateLocalidadMutation,
    useDeleteLocalidadMutation
} = localidadesApi;