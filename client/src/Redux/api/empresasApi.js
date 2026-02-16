import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const empresasApi = createApi({
    reducerPath: 'empresasApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Empresas'],
    keepUnusedDataFor: 3600,
    endpoints: (builder) => ({

        getEmpresas: builder.query({
            query: () => '/empresas',
            providesTags: ['Empresas'],
        }),
        getEmpresaById: builder.query({
            query: (id) => `/empresas/${id}`,
            providesTags: (result, error, id) => [{ type: 'Empresas', id }],
        }),
        createEmpresa: builder.mutation({
            query: (newEmpresa) => ({
                url: '/empresas',
                method: 'POST',
                body: newEmpresa,
            }),
            invalidatesTags: ['Empresas'],
        }),
        updateEmpresa: builder.mutation({
            query: (empresaData) => ({
                url: '/empresas',
                method: 'PUT',
                body: empresaData,
            }),
            invalidatesTags: ['Empresas'],
        }),
        deleteEmpresa: builder.mutation({
            query: (id) => ({
                url: '/empresas',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Empresas'],
        }),
        addCoberturaToEmpresa: builder.mutation({
            query: ({ empresaId, coberturaId }) => ({
                url: '/empresas/add/cobertura',
                method: 'POST',
                body: {
                    id_empresa: empresaId,
                    id_cobertura: coberturaId
                },
            }),
            invalidatesTags: ['Empresas'],
        }),

        removeCoberturaFromEmpresa: builder.mutation({
            query: ({ empresaId, coberturaId }) => ({
                url: '/empresas/remove/cobertura',
                method: 'POST',
                body: {
                    id_empresa: empresaId,
                    id_cobertura: coberturaId
                },
            }),
            invalidatesTags: ['Empresas'],
        }),
    }),
});

export const {
    useGetEmpresasQuery,
    useGetEmpresaByIdQuery,
    useCreateEmpresaMutation,
    useUpdateEmpresaMutation,
    useDeleteEmpresaMutation,
    useAddCoberturaToEmpresaMutation,
    useRemoveCoberturaFromEmpresaMutation,
} = empresasApi;