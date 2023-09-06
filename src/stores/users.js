import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
    const data = reactive({
        users: [],
        user: {
            id: null,
            username: "",
            password: "",
            role_id: null,
        },
        infinite_set: {
            page: 1,
            per_page: 5,
            total: 0,
        },
    });

    const authStore = useAuthStore();

    const get = async (params, load = false) => {
        clear();

        try {
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
            console.log(error);
        }
    };

    const show = async (id) => {
        clear();

        try {
            const res = await axios.get(`admin/users/${id}/show`, {
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.user = res.data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const save = async (value, id) => {
        try {
            if (id == null) {
                await axios.post("admin/users/store", value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                console.log("successfully created.");
            } else {
                await axios.patch(`admin/users/${id}/update`, value, {
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

    const clear = () => {
        data.user.id = null;
        data.user.username = "";
        data.user.password = "";
        data.user.role_id = null;
    };

    return { data, get, show, save };
});
