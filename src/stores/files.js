import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAuthStore } from "./auth";
import { useAlertStore } from "./alerts";
import axios from "axios";
import { useLoadingStore } from "./loading";

export const useFileStore = defineStore("file", () => {
    const data = reactive({
        file: {
            id: null,
            url: null,
        },
    });

    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const loadingStore = useLoadingStore();

    const upload = async (formData) => {
        try {
            loadingStore.show();

            const res = await axios.post("admin/files/store", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: authStore.token,
                },
            });

            data.file = res.data.data[0];

            alertStore.handleSuccess("image successfully uploaded.");
        } catch (error) {
            alertStore.handleError(error);
        } finally {
            loadingStore.hide();
        }
    };

    const clearFile = () => {
        data.file.id = null;
        data.file.url = null;
    };

    return { data, upload, clearFile };
});
