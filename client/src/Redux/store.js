import { configureStore } from '@reduxjs/toolkit';
import { clientesApi } from './api/clientesApi';
import { marcasApi } from './api/marcasApi';
import { polizasApi } from './api/polizasApi'; 

const store = configureStore({
  reducer: {
    [clientesApi.reducerPath]: clientesApi.reducer,
    [marcasApi.reducerPath]: marcasApi.reducer,
    [polizasApi.reducerPath]: polizasApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clientesApi.middleware)
      .concat(marcasApi.middleware)
      .concat(polizasApi.middleware), 
});

export default store;