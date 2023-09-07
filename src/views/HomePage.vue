<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Home">
            <h1>Homepage</h1>
            <br />

            <div class="file-upload-container">
                <label class="file-upload-label">
                    <input type="file" class="file-upload-input" @change="handleUpload" />
                    <span class="file-upload-button">Select Image</span>
                </label>
            </div>
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import { IonPage, IonButton } from "@ionic/vue";
import { useFileStore } from "../stores/files";

export default {
    components: { LayoutAdmin, IonPage, IonButton },
    setup() {
        const fileStore = useFileStore();

        const handleUpload = async (event) => {
            const form = new FormData();
            const file = event.target.files;

            for (let i = 0; i < file.length; i++) {
                form.append(`files[${i}]`, file[i]);
            }

            form.append("folder_name", "products");

            await fileStore.upload(form);
        };

        return { handleUpload };
    },
};
</script>
