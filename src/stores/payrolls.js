import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import { useLoadingStore } from "./loading";
import axios from "axios";

export const usePayrollStore = defineStore("payroll", () => {
    const data = reactive({
        payrolls: [],
        payroll: {
            id: null,
            role: "",
            basic_salary: 0,
            allowances: 0,
            tax: 0,
            net_pay: 0,
            payment_date: "",
            status: "",
            user_id: null,
            user: {},
        },
        infinite_set: {
            page: 1,
            per_page: 5,
            total: 0,
        },
        filter: {
            name: "",
            status: "",
            month: "",
            year: "",
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const loadingStore = useLoadingStore();

    const get = async (params, load = false) => {
        clear();

        try {
            loadingStore.show();

            const res = await axios.get("finance/payrolls", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            if (load) {
                data.payrolls = data.payrolls.concat(res.data.data);
            } else {
                data.payrolls = res.data.data;
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

            const res = await axios.get(`finance/payrolls/${id}/show`, {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            data.payroll = res.data.data;
            data.payroll.user_id = res.data.data.user.id;
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
                await axios.post("finance/payrolls/store", value, {
                    headers: {
                        Authorization: authStore.token,
                    },
                });

                alertStore.handleSuccess("successfully created.");
            } else {
                await axios.patch(`finance/payrolls/${id}/update`, value, {
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

    const generatePDF = async (params) => {
        try {
            loadingStore.show();

            const res = await axios.get("finance/payrolls/report", {
                params: params,
                headers: {
                    Authorization: authStore.token,
                },
            });

            const link = document.createElement("a");
            link.href = res.data.data.pdf_url;
            link.download = "payroll_report.pdf";
            link.target = "_blank";
            link.click();

            alertStore.handleSuccess("Generate PDF successfully.");
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

    const clear = () => {
        data.payroll.id = null;
        data.payroll.role = "";
        data.payroll.basic_salary = 0;
        data.payroll.allowances = 0;
        data.payroll.tax = 0;
        data.payroll.net_pay = 0;
        data.payroll.payment_date = "";
        data.payroll.status = "";
        data.payroll.user_id = null;
        data.payroll.user = {};
    };

    return { data, get, show, save, generatePDF, clear };
});
