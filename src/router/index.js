import { createRouter, createWebHistory } from "@ionic/vue-router";

import VueRouteMiddleware from "vue-route-middleware";
import AuthMiddleware from "../middleware/auth";
import AdminMiddleware from "../middleware/admin";
import GuestMiddleware from "../middleware/guest";

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../views/HomePage.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
        meta: {
            middleware: [GuestMiddleware],
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(VueRouteMiddleware());
export default router;
