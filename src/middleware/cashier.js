import { useAuthStore } from "../stores/auth";

export default (to, from, next) => {
    let authStore = useAuthStore();

    if (authStore.ability == "finance") {
        next({ name: "Purchase" });
        return false;
    } else if (authStore.ability == "admin") {
        next({ name: "Home" });
        return false;
    } else if (authStore.ability != "admin" && authStore.ability != "finance" && authStore.ability != "cashier") {
        authStore.$reset();

        next({ name: "Login" });
        return false;
    }
};
