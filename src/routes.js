import Dashboard from "views/Dashboard";
import Administradores from "views/Administradores";
import Terapeutas from "views/Terapeutas";
import Citas from "views/Citas";
import Pacientes from "views/Pacientes";
import HistoriaClinica from "views/HistoriaClinica";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Tables from "views/examples/Tables.js";
import TablesFilter from "views/examples/TablesFilter.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/administradores",
    name: "Administradores",
    icon: "ni ni-badge text-blue",
    component: <Administradores />,
    layout: "/admin",
  },
  {
    path: "/terapeutas",
    name: "Terapeutas",
    icon: "ni ni-favourite-28 text-pink",
    component: <Terapeutas />,
    layout: "/admin",
  },
  {
    path: "/pacientes",
    name: "Pacientes",
    icon: "ni ni-single-02 text-yellow",
    component: <Pacientes />,
    layout: "/admin",
  },
  {
    path: "/citas",
    name: "Citas",
    icon: "ni ni-time-alarm text-info",
    component: <Citas />,
    layout: "/admin",
  },
  {
    path: "/historia-clinica/:paciente_id",
    name: "Historias Clinicas",
    icon: "ni ni-single-02 text-yellow",
    component: <HistoriaClinica />,
    layout: "/admin",
  },/*
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/tables-filter",
    name: "Tables filter",
    icon: "ni ni-bullet-list-67 text-red",
    component: <TablesFilter />,
    layout: "/admin",
  },*/
];

export default routes;
