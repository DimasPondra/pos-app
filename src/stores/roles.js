import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { reactive } from "vue";
import axios from "axios";
import { useAlertStore } from "./alerts";

export const useRoleStore = defineStore("role", () => {
    const data = reactive({
        roles: [],
        role: {
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
            const res = await axios.get("admin/roles", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            if (load) {
                data.roles = data.roles.concat(res.data.data);
            } else {
                data.roles = res.data.data;
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
            const res = await axios.get(`admin/roles/${id}/show`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.role = res.data.data;
        } catch (error) {
            alertStore.handleError(error);
        }
    };

    const save = async (value, id) => {
        try {
            if (id == null) {
                await axios.post("admin/roles/store", value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/roles/${id}/update`, value, {
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
            await axios.delete(`admin/roles/${id}/delete`, {
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
        data.role.id = null;
        data.role.name = "";
    };

    return { data, get, show, save, deleteItem };
});
