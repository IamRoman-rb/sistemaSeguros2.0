import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rolesApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Roles'],
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => '/roles',
            providesTags: ['Roles'],
        }),
    }),
});

export const { useGetRolesQuery } = rolesApi;