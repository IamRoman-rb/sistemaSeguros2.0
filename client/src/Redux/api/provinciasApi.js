import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const provinciasApi = createApi({
    reducerPath: 'provinciasApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Provincias'],
    keepUnusedDataFor: 3600,
    endpoints: (builder) => ({
        getProvincias: builder.query({
            query: () => '/provincias',
            providesTags: ['Provincias'],
        }),
        getProvinciaById: builder.query({
            query: (id) => `/provincias/${id}`,
            providesTags: (result, error, id) => [{ type: 'Provincias', id }],
        }),
        createProvincia: builder.mutation({
            query: (newProvincia) => ({
                url: '/provincias',
                method: 'POST',
                body: newProvincia,

            }),
            invalidatesTags: ['Provincias'],
        }),
        updateProvincia: builder.mutation({
            query: (provinciaData) => ({
                url: '/provincias',
                method: 'PUT',
                body: provinciaData,
            }),
            invalidatesTags: ['Provincias'],
        }),
        deleteProvincia: builder.mutation({
            query: (id) => ({
                url: '/provincias',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Provincias'],
        }),
    }),
});

export const {
    useGetProvinciasQuery,
    useGetProvinciaByIdQuery,
    useCreateProvinciaMutation,
    useUpdateProvinciaMutation,
    useDeleteProvinciaMutation
} = provinciasApi;