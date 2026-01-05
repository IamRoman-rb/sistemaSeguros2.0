import { createBrowserRouter } from "react-router-dom";
import Default from "./Layouts/Default";
import Login from "./Pages/Website/Login";
import Logout from "./Pages/Website/Logout";
import Perfil from "./Pages/Website/Perfil";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "perfil",
        element: <Perfil />,
      },
      {
        
      }
    ]
  }
]);

export default router;