import { useAuthStore } from "../stores/auth";

export default (to, from, next) => {
    let authStore = useAuthStore();

    if (authStore.ability != "admin") {
        authStore.$reset();

        next({ name: "Login" });
        return false;
    }
};
