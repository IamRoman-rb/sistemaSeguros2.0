import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const polizasApi = createApi({
  reducerPath: 'polizasApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Polizas', 'TiposPoliza'],
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getPolizas: builder.query({
      query: () => '/polizas',
      providesTags: ['Polizas'],
    }),
    
    getPolizaByNumero: builder.query({
      query: (numero) => `/polizas/${numero}`,
      providesTags: (result, error, numero) => [{ type: 'Polizas', id: numero }],
    }),

    getPolizasByCliente: builder.query({
      query: (clienteId) => `/polizas/cliente/${clienteId}`,
      providesTags: ['Polizas'],
    }),

    createPoliza: builder.mutation({
      query: (newPoliza) => ({
        url: '/polizas',
        method: 'POST',
        body: newPoliza,
      }),
      invalidatesTags: ['Polizas'],
    }),

    updatePoliza: builder.mutation({
      query: (polizaData) => ({
        url: '/polizas',
        method: 'PUT',
        body: polizaData,
      }),
      invalidatesTags: ['Polizas'],
    }),

    deletePoliza: builder.mutation({
      query: (numero) => ({
        url: '/polizas',
        method: 'DELETE',
        body: { numero },
      }),
      invalidatesTags: ['Polizas'],
    }),

    getTiposPoliza: builder.query({
      query: () => '/polizas/tipo',
      providesTags: ['TiposPoliza'],
    }),

    // --- NUEVO: Endpoint para buscar vehículo usando este mismo slice ---
    getVehiculoByPatente: builder.query({
        query: (patente) => `/vehiculos/${patente}`, // Consultamos al endpoint de vehículos
    }),

    addVehiculoToPoliza: builder.mutation({
      query: (data) => ({
        url: '/polizas/vehiculo',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Polizas'],
    }),
    
    addCoberturaToPoliza: builder.mutation({
      query: (data) => ({
        url: '/polizas/cobertura',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Polizas'],
    }),
    
    deleteTipoPoliza: builder.mutation({
      query: (id) => ({
        url: '/polizas/tipo',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['TiposPoliza'],
    }),

    createTipoPoliza: builder.mutation({
      query: (body) => ({
        url: '/polizas/tipo',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TiposPoliza'],
    }),

  }),
});

export const { 
    useGetPolizasQuery,
    useGetPolizaByNumeroQuery,
    useGetPolizasByClienteQuery,
    useCreatePolizaMutation,
    useUpdatePolizaMutation,
    useDeletePolizaMutation,
    useGetTiposPolizaQuery,
    useDeleteTipoPolizaMutation,
    useAddVehiculoToPolizaMutation,
    useAddCoberturaToPolizaMutation,
    useCreateTipoPolizaMutation,
    useLazyGetVehiculoByPatenteQuery 
} = polizasApi;