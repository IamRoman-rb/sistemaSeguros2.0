import { createBrowserRouter, Navigate } from "react-router-dom";
import Default from "./Layouts/Default";
import Login from "./Pages/Website/Login";
import Logout from "./Pages/Website/Logout";
import Perfil from "./Pages/Website/Perfil";
import Autenticados from "./Layouts/Autenticados";

import ListadoUsuario from "./Pages/Usuarios/Listado";
import NuevoUsuario from "./Pages/Usuarios/Nuevo";
import DetalleUsuario from "./Pages/Usuarios/Detalle";
import EditarUsuario from "./Pages/Usuarios/Editar";

import ListadoEmpresas from "./Pages/Empresas/Listado";
import NuevaEmpresa from "./Pages/Empresas/Nueva";
import EditarEmpresa from "./Pages/Empresas/Editar";

import ListadoCoberturas from "./Pages/Coberturas/Listado";
import NuevaCobertura from "./Pages/Coberturas/Nueva";
import EditarCobertura from "./Pages/Coberturas/Editar";

import ListadoTipoPolizas from "./Pages/TipoPolizas/Listado";
import NuevoTipoPoliza from "./Pages/TipoPolizas/Nuevo";
import EditarTipoPoliza from "./Pages/TipoPolizas/Editar";

import ListadoClientes from "./Pages/Clientes/Listado";
import NuevoClietne from "./Pages/Clientes/Nuevo"
import DetalleCliente from "./Pages/Clientes/Detalle";

import ListadoPolizas from "./Pages/Polizas/Listado";
import DetallePoliza from "./Pages/Polizas/Detalle";
import NuevaPoliza from "./Pages/Polizas/Nueva";

import ListadoCaja from "./Pages/Caja/Listado"
import Egreso from "./Pages/Caja/Egreso";
import Ingreso from "./Pages/Caja/Ingreso";
import Resumen from "./Pages/Caja/Resumen";

import DetallePago from "./Pages/Pagos/Detalle";

import ActividadesListado from "./Pages/Actividades/Listado";
import ActividadesDatos from "./Pages/Actividades/Datos";

import AuxiliaresListado from "./Pages/Auxiliares/Listado";
import NuevoAuxiliar from "./Pages/Auxiliares/Nuevo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        index: true,
        element: <Navigate to={"login"} />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: <Autenticados />,
        children: [
          {
            index: true,
            element: <Navigate to={"clientes/listado"} />,
          },
          // --- Usuarios ---
          {
            path: "usuarios/listado",
            element: <ListadoUsuario />,
          },
          {
            path: "usuarios/nuevo",
            element: <NuevoUsuario />,
          },
          {
            path: "usuarios/detalle/:id",
            element: <DetalleUsuario />
          },
          {
            path: "usuarios/editar/:id",
            element: <EditarUsuario />
          },
          // --- Empresas ---
          {
            path: "empresas/listado",
            element: <ListadoEmpresas />
          },
          {
            path: "empresas/nueva",
            element: <NuevaEmpresa />
          },
          {
            path: "empresas/editar/:id",
            element: <EditarEmpresa />
          },
          // --- Coberturas ---
          {
            path: "coberturas/listado",
            element: <ListadoCoberturas />
          },
          {
            path: "coberturas/nueva",
            element: <NuevaCobertura />
          },
          {
            path: "coberturas/editar/:id",
            element: <EditarCobertura />
          },
          // --- Tipo Polizas (Agregadas porque estaban importadas) ---
          {
            path: "tipo_polizas/listado",
            element: <ListadoTipoPolizas />
          },
          {
            path: "tipo_polizas/nuevo",
            element: <NuevoTipoPoliza />
          },
          {
            path: "tipo_polizas/editar/:id",
            element: <EditarTipoPoliza />
          },
          // --- Clientes ---
          {
            path: "clientes/listado",
            element: <ListadoClientes />,
          },
          {
            path: "clientes/nuevo",
            element: <NuevoClietne />,
          },
          {
            path: "clientes/detalle/:id",
            element: <DetalleCliente />,
          },
          // --- Polizas ---
          {
            path: "polizas/listado",
            element: <ListadoPolizas />,
          },
          {
            path: "polizas/detalle/:id",
            element: <DetallePoliza />,
          },
          {
            path: "polizas/nueva",
            element: <NuevaPoliza />,
          },
          // --- Caja ---
          {
            path: "caja/listado",
            element: <ListadoCaja />
          },
          {
            path: "caja/egresos",
            element: <Egreso />
          },
          {
            path: "caja/ingresos",
            element: <Ingreso />
          },
          {
            path: "caja/resumen",
            element: <Resumen />
          },
          // --- Pagos ---
          {
            path: "pagos/detalle/:id",
            element: <DetallePago />
          },
          // --- Actividades ---
          {
            path: "actividades/listado",
            element: <ActividadesListado />
          },
          {
            path: "actividades/datos",
            element: <ActividadesDatos />
          },
          // --- Auxiliares ---
          {
            path: "auxiliares/listado",
            element: <AuxiliaresListado />
          },
          {
            path: "auxiliares/nuevo",
            element: <NuevoAuxiliar />
          },
          // --- General ---
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "perfil",
            element: <Perfil />,
          },
        ],
      }
    ]
  }
]);

export default router;