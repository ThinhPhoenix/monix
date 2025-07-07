import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../pages/HomePage.vue"),
      },
      {
        path: "download",
        name: "Download",
        component: () => import("../pages/DownloadPage.vue"),
      },
      {
        path: "expense-management",
        name: "ExpenseManagement",
        component: () => import("../pages/ExpenseManagementPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
