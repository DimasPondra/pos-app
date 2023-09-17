import { createRouter, createWebHistory } from "@ionic/vue-router";

import VueRouteMiddleware from "vue-route-middleware";
import AuthMiddleware from "../middleware/auth";
import AdminMiddleware from "../middleware/admin";
import GuestMiddleware from "../middleware/guest";
import FinanceMiddleware from "../middleware/finance";
import CashierMiddleware from "../middleware/cashier";

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
    {
        path: "/setting",
        name: "Setting",
        component: () => import("../views/Setting.vue"),
        meta: {
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/product-type",
        name: "Product-Type",
        component: () => import("../views/ProductType.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
        },
    },
    {
        path: "/product",
        name: "Product",
        component: () => import("../views/Product.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
        },
    },
    {
        path: "/seller",
        name: "Seller",
        component: () => import("../views/Seller.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
        },
    },
    {
        path: "/role",
        name: "Role",
        component: () => import("../views/Role.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
        },
    },
    {
        path: "/user",
        name: "User",
        component: () => import("../views/User.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
        },
    },
    {
        path: "/salary",
        name: "Salary",
        component: () => import("../views/Salary.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
        },
    },
    {
        path: "/unit-type",
        name: "Unit Type",
        component: () => import("../views/UnitType.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
        },
    },
    {
        path: "/payroll-setting",
        name: "Payroll Setting",
        component: () => import("../views/PayrollSetting.vue"),
        meta: {
            middleware: [AuthMiddleware, AdminMiddleware],
        },
    },
    {
        path: "/purchase",
        name: "Purchase",
        component: () => import("../views/Purchase.vue"),
        meta: {
            middleware: [AuthMiddleware, FinanceMiddleware],
        },
    },
    {
        path: "/payroll",
        name: "Payroll",
        component: () => import("../views/Payroll.vue"),
        meta: {
            middleware: [AuthMiddleware, FinanceMiddleware],
        },
    },
    {
        path: "/cart",
        name: "Cart",
        component: () => import("../views/Cart.vue"),
        meta: {
            middleware: [AuthMiddleware, CashierMiddleware],
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(VueRouteMiddleware());
export default router;
