import { defineStore } from "pinia";
import { reactive } from "vue";
import { toastController } from "@ionic/vue";
import { useAuthStore } from "./auth";
import router from "../router";
import { Preferences } from "@capacitor/preferences";

export const useAlertStore = defineStore("alert", () => {
    const data = reactive({
        code: null,
        message: "",
        color: "",
    });

    const authStore = useAuthStore();

    const presentToast = async () => {
        const toast = await toastController.create({
            message: data.message,
            duration: 2000,
            position: "bottom",
            color: data.color,
        });

        await toast.present();
    };

    const handleSuccess = (message) => {
        data.message = message;
        data.color = "success";
        presentToast();
    };

    const handleError = async (error) => {
        data.code = error.response.status;
        data.message = error.response.data.message;
        data.color = "danger";

        if (data.code == 400) {
            presentToast();
        } else if (data.code == 401) {
            presentToast();

            authStore.$reset();

            await Preferences.remove({ key: "token" });
            await Preferences.remove({ key: "ability" });

            router.push("login");
        } else if (data.code == 403) {
            presentToast();
        } else if (data.code == 404) {
            router.push("/");
        } else if (data.code == 422) {
            presentToast();
        }
    };

    return { handleSuccess, handleError };
});
