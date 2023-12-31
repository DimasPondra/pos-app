import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";
import { useAlertStore } from "./alerts";
import { useLoadingStore } from "./loading";

export const useUserStore = defineStore("user", () => {
    const data = reactive({
        users: [],
        user: {
            id: null,
            username: "",
            password: "",
            role_id: null,
            role: {},
            file_id: null,
            file: {},
        },
        infinite_set: {
            page: 1,
            per_page: 5,
            total: 0,
        },
        filter: {
            username: "",
            role_id: null,
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const loadingStore = useLoadingStore();

    const get = async (params, load = false) => {
        clear();

        try {
            loadingStore.show();

            const res = await axios.get("admin/users", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            if (load) {
                data.users = data.users.concat(res.data.data);
            } else {
                data.users = res.data.data;
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

            const res = await axios.get(`admin/users/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.user = res.data.data;
            data.user.role_id = res.data.data.role.id;
            data.user.file_id = res.data.data.file == null ? null : res.data.data.file.id;
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
                await axios.post("admin/users/store", value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/users/${id}/update`, value, {
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

    const clear = () => {
        data.user.id = null;
        data.user.username = "";
        data.user.password = "";
        data.user.role_id = null;
        data.user.role = {};
        data.user.file_id = null;
        data.user.file = {};
    };

    return { data, get, show, save, clear };
});
