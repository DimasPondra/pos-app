import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import { useLoadingStore } from "./loading";
import axios from "axios";
import { reactive } from "vue";

export const useTransactionStore = defineStore("transaction", () => {
    const data = reactive({
        transactions: [],
        transaction: {
            id: null,
            sub_total: 0,
            total: 0,
            user: {},
            details: [],
        },
        infinite_set: {
            page: 1,
            per_page: 5,
            total: 0,
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const loadingStore = useLoadingStore();

    const get = async (params, load = false) => {
        clear();

        try {
            loadingStore.show();

            const res = await axios.get("admin/transactions", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            if (load) {
                data.transactions = data.transactions.concat(res.data.data);
            } else {
                data.transactions = res.data.data;
            }

            if (res.data.meta != null) {
                data.infinite_set.page = res.data.meta.current_page;
                data.infinite_set.per_page = res.data.meta.per_page;
                data.infinite_set.total = res.data.meta.total;
            }
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

    const show = async (id, params) => {
        clear();

        try {
            loadingStore.show();

            const res = await axios.get(`admin/transactions/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.transaction = res.data.data;
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

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

    const clear = () => {
        data.transaction.id = null;
        data.transaction.sub_total = 0;
        data.transaction.total = 0;
        data.transaction.user = {};
        data.transaction.details = [];
    };

    return { data, get, show, save, clear };
});
