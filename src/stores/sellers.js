import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import { useLoadingStore } from "./loading";
import axios from "axios";

export const useSellerStore = defineStore("seller", () => {
    const data = reactive({
        sellers: [],
        seller: {
            id: null,
            name: "",
        },
        infinite_set: {
            page: 1,
            per_page: 5,
            total: 0,
        },
        filter: {
            name: "",
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const loadingStore = useLoadingStore();

    const get = async (params, load = false) => {
        clear();

        try {
            loadingStore.show();

            const res = await axios.get("admin/sellers", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            if (load) {
                data.sellers = data.sellers.concat(res.data.data);
            } else {
                data.sellers = res.data.data;
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

    const show = async (id) => {
        clear();

        try {
            loadingStore.show();

            const res = await axios.get(`admin/sellers/${id}/show`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.seller = res.data.data;
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
                await axios.post("admin/sellers/store", value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/sellers/${id}/update`, value, {
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

            await axios.delete(`admin/sellers/${id}/delete`, {
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
        data.seller.id = null;
        data.seller.name = "";
    };

    return { data, get, show, save, deleteItem, clear };
});
