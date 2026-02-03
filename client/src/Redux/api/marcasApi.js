import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const marcasApi = createApi({
  reducerPath: 'marcasApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Marcas'],
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getMarcas: builder.query({
      query: () => '/marcas',
      providesTags: ['Marcas'],
    }),
    deleteMarca: builder.mutation({
      query: (id) => ({
        url: `/marcas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Marcas'],
    }),
    createMarca: builder.mutation({
      query: (body) => ({
        url: '/marcas',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Marcas'],
    }),
  }),
});

export const { 
    useGetMarcasQuery, 
    useDeleteMarcaMutation,
    useCreateMarcaMutation 
} = marcasApi;