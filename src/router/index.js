import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/chart",
  },
  {
    path: "/chart",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/404View.vue"),
    meta: { title: "404" },
  },
  {
    path: "/403",
    component: () =>
      import(/* webpackChunkName: "403" */ "../views/403View.vue"),
    meta: { title: "403" },
  },
  { path: "/nodata", component: () => import("../views/NoData.vue") },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
