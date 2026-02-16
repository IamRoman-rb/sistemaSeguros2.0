import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coberturasApi = createApi({
    reducerPath: 'coberturasApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Coberturas'],
    endpoints: (builder) => ({
        getCoberturas: builder.query({
            query: () => '/coberturas',
            providesTags: ['Coberturas'],
        }),
        getCoberturaById: builder.query({
            query: (id) => `/coberturas/${id}`,
            providesTags: (result, error, id) => [{ type: 'Coberturas', id }],
        }),
        createCobertura: builder.mutation({
            query: (newCobertura) => ({
                url: '/coberturas',
                method: 'POST',
                body: newCobertura,
            }),
            invalidatesTags: ['Coberturas'],
        }),
        updateCobertura: builder.mutation({
            query: ({ id, ...coberturaData }) => ({
                url: `/coberturas/${id}`,
                method: 'PUT',
                body: { id, ...coberturaData },
            }),
            invalidatesTags: ['Coberturas'],
        }),
        deleteCobertura: builder.mutation({
            query: (id) => ({
                url: '/coberturas',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Coberturas'],
        }),
    }),
});

export const {
    useGetCoberturasQuery,
    useGetCoberturaByIdQuery,
    useCreateCoberturaMutation,
    useUpdateCoberturaMutation,
    useDeleteCoberturaMutation,
} = coberturasApi;