import { loadingController } from "@ionic/vue";
import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
    const show = async () => {
        const loading = await loadingController.create({
            // cssClass: ["loading"],
        });

        loading.present();
    };

    const hide = async () => {
        await loadingController.dismiss();
    };

    return { show, hide };
});
