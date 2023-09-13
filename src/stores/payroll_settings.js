import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from "axios";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import { useLoadingStore } from "./loading";

export const usePayrollSettingStore = defineStore("payroll_setting", () => {
    const data = reactive({
        payroll_settings: [],
        payroll_setting: {
            id: null,
            name: "",
            nominal: 0,
            unit_type_id: null,
            unit_type: {},
        },
        infinite_set: {
            page: 1,
            per_page: 5,
            total: 0,
        },
        filter: {
            name: "",
            unit_type_id: null,
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const loadingStore = useLoadingStore();

    const get = async (params, load = false) => {
        clear();

        try {
            loadingStore.show();

            const res = await axios.get("admin/payroll-settings", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            if (load) {
                data.payroll_settings = data.payroll_settings.concat(res.data.data);
            } else {
                data.payroll_settings = res.data.data;
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

            const res = await axios.get(`admin/payroll-settings/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.payroll_setting = res.data.data;
            data.payroll_setting.nominal = parseInt(res.data.data.nominal);
            data.payroll_setting.unit_type_id = res.data.data.unit_type.id;
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
                await axios.post("admin/payroll-settings/store", value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`admin/payroll-settings/${id}/update`, value, {
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

            await axios.delete(`admin/payroll-settings/${id}/delete`, {
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
        data.payroll_setting.id = null;
        data.payroll_setting.name = "";
        data.payroll_setting.nominal = 0;
        data.payroll_setting.unit_type_id = null;
        data.payroll_setting.unit_type = {};
    };

    return { data, get, show, save, deleteItem, clear };
});
