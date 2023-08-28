import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";

export const useProductTypeStore = defineStore("product_type", () => {
    const data = reactive({
        product_types: [],
        product_type: {
            id: null,
            name: "",
        },
    });

    const authStore = useAuthStore();

    const get = async () => {
        clear();

        try {
            const res = await axios.get("admin/product-types", {
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.product_types = res.data.data;
        } catch (error) {
            console.log(error);
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
            console.log(error);
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

                console.log("successfully created.");
            } else {
                await axios.patch(`admin/product-types/${id}/update`, value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                console.log("successfully updated.");
            }

            clear();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`admin/product-types/${id}/delete`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            console.log("successfully deleted.");
        } catch (error) {
            console.log(error);
        }
    };

    const clear = () => {
        data.product_type.id = null;
        data.product_type.name = "";
    };

    return { data, get, show, save, deleteItem };
});
