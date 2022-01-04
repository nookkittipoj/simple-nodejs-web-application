import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiredAuthorization: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});
router.beforeEach((to, from, next) => {
  const isRequiredAuthorization = to.matched.some(
    (record) => record.meta.requiredAuthorization
  );
  const loggedIn = store.state.user.accessToken;

  if (!loggedIn && isRequiredAuthorization) {
    return next({
      path: "/login",
    });
  }
  return next();
});
export default router;
