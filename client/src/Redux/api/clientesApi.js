import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clientesApi = createApi({
  reducerPath: 'clientesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Clientes'],
  endpoints: (builder) => ({

    getClientes: builder.query({
      query: () => '/clientes',
      providesTags: ['Clientes'],
    }),

    getClienteByDni: builder.query({
      query: (dni) => `/clientes/${dni}`,
      providesTags: (result, error, dni) => [{ type: 'Clientes', id: dni }],
    }),
    createCliente: builder.mutation({
      query: (newCliente) => ({
        url: '/clientes',
        method: 'POST',
        body: newCliente,
      }),
      invalidatesTags: ['Clientes'],
    }),
    updateCliente: builder.mutation({
      query: (clienteData) => ({
        url: '/clientes',
        method: 'PUT',
        body: clienteData,
      }),
      invalidatesTags: ['Clientes'],
    }),

    deleteCliente: builder.mutation({
      query: (dni) => ({
        url: '/clientes',
        method: 'DELETE',
        body: { dni },
      }),
      invalidatesTags: ['Clientes'],
    }),
  }),
});

export const { 
  useGetClientesQuery, 
  useGetClienteByDniQuery,
  useCreateClienteMutation,
  useUpdateClienteMutation,
  useDeleteClienteMutation
} = clientesApi;