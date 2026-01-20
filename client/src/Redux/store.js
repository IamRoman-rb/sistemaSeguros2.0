import { configureStore } from '@reduxjs/toolkit';
import { clientesApi } from './api/clientesApi';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    
    // La API slice:
    [clientesApi.reducerPath]: clientesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientesApi.middleware),
});

export default store;