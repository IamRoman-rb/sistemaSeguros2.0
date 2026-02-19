import { configureStore } from '@reduxjs/toolkit';
import { clientesApi } from './api/clientesApi';
import { marcasApi } from './api/marcasApi';
import { polizasApi } from './api/polizasApi'; 
import { empresasApi } from './api/empresasApi';
import { vehiculosApi } from './api/vehiculosApi';
import { localidadesApi } from './api/localidadesApi';
import { provinciasApi } from './api/provinciasApi';
import { empleadosApi } from './api/empleadosApi';
import { rolesApi } from './api/rolesApi';
import { sucursalesApi } from './api/sucursalesApi';
import { coberturasApi } from './api/coberturasApi';
import { pagosApi } from './api/pagosApi';
import { metodosApi } from './api/metodosApi';
import { movimientosApi } from './api/movimientosApi';

const store = configureStore({
  reducer: {
    [clientesApi.reducerPath]: clientesApi.reducer,
    [marcasApi.reducerPath]: marcasApi.reducer,
    [polizasApi.reducerPath]: polizasApi.reducer, 
    [empresasApi.reducerPath]: empresasApi.reducer,
    [vehiculosApi.reducerPath]: vehiculosApi.reducer,
    [localidadesApi.reducerPath]: localidadesApi.reducer,
    [provinciasApi.reducerPath]: provinciasApi.reducer,
    [empleadosApi.reducerPath]: empleadosApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [sucursalesApi.reducerPath]: sucursalesApi.reducer,
    [coberturasApi.reducerPath]: coberturasApi.reducer,
    [pagosApi.reducerPath]: pagosApi.reducer,
    [metodosApi.reducerPath]: metodosApi.reducer,
    [movimientosApi.reducerPath]: movimientosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clientesApi.middleware)
      .concat(marcasApi.middleware)
      .concat(polizasApi.middleware)
      .concat(empresasApi.middleware)
      .concat(vehiculosApi.middleware)
      .concat(localidadesApi.middleware)
      .concat(provinciasApi.middleware)
      .concat(empleadosApi.middleware)
      .concat(rolesApi.middleware)
      .concat(sucursalesApi.middleware)
      .concat(coberturasApi.middleware)
      .concat(pagosApi.middleware)
      .concat(metodosApi.middleware)
      .concat(movimientosApi.middleware),
      
});

export default store;