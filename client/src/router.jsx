import { createBrowserRouter } from "react-router-dom";
import Default from "./Layouts/Default";
import Login from "./Pages/Website/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "login",
        element: <Login />,
      }
    ]
  }
]);

export default router;