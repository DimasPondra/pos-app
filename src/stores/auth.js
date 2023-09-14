import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../router";
import { Preferences } from "@capacitor/preferences";
import { useAlertStore } from "./alerts";
import { useLoadingStore } from "./loading";

export const useAuthStore = defineStore("auth", () => {
    let token = ref(null);
    let ability = ref(null);

    const alertStore = useAlertStore();
    const loadingStore = useLoadingStore();

    const login = async (user) => {
        try {
            loadingStore.show();

            const res = await axios.post("auth/login", user);

            token.value = "Bearer " + res.data.access_token;
            ability.value = res.data.ability;

            await Preferences.set({ key: "token", value: "Bearer " + res.data.access_token });
            await Preferences.set({ key: "ability", value: res.data.ability });

            if (ability.value == "admin") {
                router.push("/");
            } else if (ability.value == "finance") {
                router.push("/purchase");
            }
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

    const logout = async () => {
        try {
            loadingStore.show();

            await axios.post("auth/logout", null, {
                headers: {
                    Authorization: token.value,
                },
            });

            await Preferences.remove({ key: "token" });
            await Preferences.remove({ key: "ability" });

            $reset();
            router.push("login");
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

    const $reset = () => {
        token.value = null;
        ability.value = null;
    };

    return { token, ability, login, logout, $reset };
});
