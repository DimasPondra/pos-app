import router from "../router";
import { useAuthStore } from "../stores/auth";
import { Preferences } from "@capacitor/preferences";

export default async (to, from, next) => {
    let authStore = useAuthStore();

    let token = await Preferences.get({ key: "token" });
    let ability = await Preferences.get({ key: "ability" });

    authStore.token = token.value;
    authStore.ability = ability.value;

    if (authStore.token != null) {
        router.push({ name: "Home" });
        return false;
    }
};
