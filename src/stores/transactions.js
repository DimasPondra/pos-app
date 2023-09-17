import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import { useLoadingStore } from "./loading";
import axios from "axios";

export const useTransactionStore = defineStore("transaction", () => {
    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const loadingStore = useLoadingStore();

    const save = async (value) => {
        try {
            loadingStore.show();

            await axios.post("cashier/transactions/store", value, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            alertStore.handleSuccess("checkout successfully.");
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

    return { save };
});
