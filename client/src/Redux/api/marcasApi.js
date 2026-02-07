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

    createMarca: builder.mutation({
      query: (body) => ({
        url: '/marcas',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Marcas'],
    }),
    updateMarca: builder.mutation({
      query: (data) => ({
        url: '/marcas',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Marcas'],
    }),

    deleteMarca: builder.mutation({
      query: (id) => ({
        url: '/marcas',
        method: 'DELETE',
        body: { id }, 
      }),
      invalidatesTags: ['Marcas'],
    }),
  }),
});

export const { 
    useGetMarcasQuery, 
    useCreateMarcaMutation, 
    useUpdateMarcaMutation, 
    useDeleteMarcaMutation 
} = marcasApi;