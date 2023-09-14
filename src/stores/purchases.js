import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from "axios";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import { useLoadingStore } from "./loading";

export const usePurchaseStore = defineStore("purchase", () => {
    const data = reactive({
        purchases: [],
        purchase: {
            id: null,
            date: "",
            price: 0,
            amount: 0,
            product_id: null,
            product: {},
            seller_id: null,
            seller: {},
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

            const res = await axios.get("finance/purchases", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            if (load) {
                data.purchases = data.purchases.concat(res.data.data);
            } else {
                data.purchases = res.data.data;
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

            const res = await axios.get(`finance/purchases/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.purchase = res.data.data;
            data.purchase.price = parseInt(res.data.data.price);
            data.purchase.product_id = res.data.data.product.id;
            data.purchase.seller_id = res.data.data.seller.id;
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

    const save = async (value, id) => {
        try {
            loadingStore.show();

            if (id == null) {
                await axios.post("finance/purchases/store", value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`finance/purchases/${id}/update`, value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully updated.");
            }

            clear();
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

    const deleteItem = async (id) => {
        try {
            loadingStore.show();

            await axios.delete(`finance/purchases/${id}/delete`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            alertStore.handleSuccess("successfully deleted.");
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

    const clear = () => {
        data.purchase.id = null;
        data.purchase.date = "";
        data.purchase.price = 0;
        data.purchase.amount = 0;
        data.purchase.product_id = null;
        data.purchase.product = {};
        data.purchase.seller_id = null;
        data.purchase.seller = {};
    };

    return { data, get, show, save, deleteItem, clear };
});
