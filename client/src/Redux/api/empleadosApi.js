import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const empleadosApi = createApi({
    reducerPath: 'empleadosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Empleados'],
    endpoints: (builder) => ({
        getEmpleados: builder.query({
            query: () => '/empleados',
            providesTags: ['Empleados'],
        }),
        getEmpleadoById: builder.query({
            query: (id) => `/empleados/${id}`,
            providesTags: (result, error, id) => [{ type: 'Empleados', id }],
        }),
        createEmpleado: builder.mutation({
            query: (newEmpleado) => ({
                url: '/empleados',
                method: 'POST',
                body: newEmpleado,
            }),
            invalidatesTags: ['Empleados'],
        }),
        updateEmpleado: builder.mutation({
            query: (empleadoData) => ({
                url: '/empleados',
                method: 'PUT',
                body: empleadoData,
            }),
            invalidatesTags: ['Empleados'],
        }),
        deleteEmpleado: builder.mutation({
            query: (id) => ({
                url: '/empleados',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Empleados'],
        }),
        validateEmpleado: builder.mutation({
            query: (data) => ({
                url: '/empleados/validate',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetEmpleadosQuery,
    useGetEmpleadoByIdQuery,
    useCreateEmpleadoMutation,
    useUpdateEmpleadoMutation,
    useDeleteEmpleadoMutation,
    useValidateEmpleadoMutation
} = empleadosApi;