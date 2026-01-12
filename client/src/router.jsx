import { createBrowserRouter, Navigate } from "react-router-dom";
import Default from "./Layouts/Default";
import Login from "./Pages/Website/Login";
import Logout from "./Pages/Website/Logout";
import Perfil from "./Pages/Website/Perfil";
import Autenticados from "./Layouts/Autenticados";
import ListadoClientes from "./Pages/Clientes/Listado";
import NuevoClietne from "./Pages/Clientes/Nuevo"
import DetalleCliente from "./Pages/Clientes/Detalle";

import ListadoPolizas from "./Pages/Polizas/Listado";
import DetallePoliza from "./Pages/Polizas/Detalle";
import Nueva from "./Pages/Polizas/Nueva";
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
            element: <Nueva />,
          },
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