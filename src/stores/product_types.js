import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";
import { useAlertStore } from "./alerts";

export const useProductTypeStore = defineStore("product_type", () => {
    const data = reactive({
        product_types: [],
        product_type: {
            id: null,
            name: "",
        },
        infinite_set: {
            page: 1,
            per_page: 5,
            total: 0,
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();

    const get = async (params, load = false) => {
        clear();

        try {
            const res = await axios.get("admin/product-types", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            if (load) {
                data.product_types = data.product_types.concat(res.data.data);
            } else {
                data.product_types = res.data.data;
            }

            if (res.data.meta != null) {
                data.infinite_set.page = res.data.meta.current_page;
                data.infinite_set.per_page = res.data.meta.per_page;
                data.infinite_set.total = res.data.meta.total;
            }
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const show = async (id) => {
        clear();

        try {
            const res = await axios.get(`admin/product-types/${id}/show`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.product_type = res.data.data;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (value, id) => {
        try {
            if (id == null) {
                await axios.post("admin/product-types/store", value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/product-types/${id}/update`, value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully updated.");
            }

            clear();
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`admin/product-types/${id}/delete`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            alertStore.handleSuccess("successfully deleted.");
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const clear = () => {
        data.product_type.id = null;
        data.product_type.name = "";
    };

    return { data, get, show, save, deleteItem };
});
