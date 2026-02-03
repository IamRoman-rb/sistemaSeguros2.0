import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { clientesApi } from './api/clientesApi';
import { marcasApi } from './api/marcasApi';

export const store = configureStore({
  reducer: {
    [clientesApi.reducerPath]: clientesApi.reducer,
    [marcasApi.reducerPath]: marcasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clientesApi.middleware)
      .concat(marcasApi.middleware),
});

setupListeners(store.dispatch, (listenerBehavior) => ({
   ...listenerBehavior,
   refetchOnFocus: false, 
   refetchOnReconnect: true,
}));

export default store;