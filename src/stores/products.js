import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";
import { useAlertStore } from "./alerts";
import { useFileStore } from "./files";

export const useProductStore = defineStore("product", () => {
    const data = reactive({
        products: [],
        product: {
            id: null,
            name: "",
            slug: "",
            description: "",
            price: 0,
            amount: 0,
            product_type_id: null,
            product_type: {},
            file_id: null,
            file: {},
        },
        infinite_set: {
            page: 1,
            per_page: 5,
            total: 0,
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const fileStore = useFileStore();

    const get = async (params, load = false) => {
        clear();

        try {
            const res = await axios.get("admin/products", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            if (load) {
                data.products = data.products.concat(res.data.data);
            } else {
                data.products = res.data.data;
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

    const show = async (id, params) => {
        clear();

        try {
            const res = await axios.get(`admin/products/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.product = res.data.data;
            data.product.price = parseInt(res.data.data.price);
            data.product.product_type_id = res.data.data.product_type.id;
            data.product.file_id = res.data.data.file == null ? null : res.data.data.file.id;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (value, id) => {
        try {
            if (id == null) {
                await axios.post("admin/products/store", value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/products/${id}/update`, value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully updated.");
            }

            clear();
            fileStore.clearFile();
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`admin/products/${id}/delete`, {
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
        data.product.id = null;
        data.product.name = "";
        data.product.slug = "";
        data.product.description = "";
        data.product.price = 0;
        data.product.amount = 0;
        data.product.product_type_id = null;
        data.product.product_type = {};
        data.product.file_id = null;
        data.product.file = {};
    };

    return { data, get, show, save, deleteItem };
});
