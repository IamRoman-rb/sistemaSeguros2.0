import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const polizasApi = createApi({
  reducerPath: 'polizasApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Polizas', 'TiposPoliza'],
  keepUnusedDataFor: 3600, // Cache de 1 hora
  endpoints: (builder) => ({
    
    // --- PÓLIZAS ---
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

    // Nota: Tu ruta backend es PUT / (espera el ID o Numero en el body)
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
        body: { numero }, // Tu backend espera el numero en el body
      }),
      invalidatesTags: ['Polizas'],
    }),

    // --- TIPOS DE PÓLIZA (Para los selectores) ---
    getTiposPoliza: builder.query({
      query: () => '/polizas/tipo',
      providesTags: ['TiposPoliza'],
    }),
    
    // --- ASOCIACIONES (Coberturas y Vehículos) ---
    addVehiculoToPoliza: builder.mutation({
      query: (data) => ({
        url: '/polizas/vehiculo',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Polizas'], // Refresca la póliza para mostrar el vehículo nuevo
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
        body: { id }, // Tu backend espera el ID en el body
      }),
      invalidatesTags: ['TiposPoliza'], // Esto refrescará la tabla automáticamente
    }),

    createTipoPoliza: builder.mutation({
      query: (body) => ({
        url: '/polizas/tipo',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TiposPoliza'], // Para que se actualice la lista automáticamente
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
    useCreateTipoPolizaMutation
} = polizasApi;