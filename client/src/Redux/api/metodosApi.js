import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const metodosApi = createApi({
    reducerPath: 'metodosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Metodos'],
    endpoints: (builder) => ({
        getMetodos: builder.query({
            query: () => '/metodos',
            providesTags: ['Metodos'],
        }),
    }),
});

export const { useGetMetodosQuery } = metodosApi;