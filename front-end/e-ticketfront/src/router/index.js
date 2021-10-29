import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/Login";
import Register from "../components/Register";
import Projects from "../components/Projects";
import UserHistories from "../components/UserHistories";
import Tickets from "../components/Tickets";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/userhistories",
    name: "UserHistories",
    component: UserHistories,
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: Tickets,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
