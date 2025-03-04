import Login from "views/Index.jsx";
import Register from "views/examples/Register.js";
import PacientesNuevo from "views/PacienteNuevo";

var authRoutes = [
  {
    path: "/login",
    name: "Iniciar sesión",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Registro",
    component: <PacientesNuevo />,
    layout: "/auth",
  },
];

export default authRoutes;
