<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="userStore.data.user.id == null">Create</ion-title>
                <ion-title v-else>Edit</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-content>
                    <div class="input-group">
                        <ion-input
                            v-show="userStore.data.user.id == null"
                            label="Username"
                            label-placement="floating"
                            placeholder="Enter username"
                            v-model="userStore.data.user.username"
                        ></ion-input>
                    </div>

                    <div class="input-group">
                        <ion-input
                            label="Password"
                            label-placement="floating"
                            placeholder="Enter password"
                            v-model="userStore.data.user.password"
                            type="password"
                        ></ion-input>
                    </div>

                    <div class="input-group">
                        <ion-select
                            v-show="userStore.data.user.id == null"
                            label="Role"
                            label-placement="floating"
                            placeholder="Select a Role"
                            v-model="userStore.data.user.role_id"
                        >
                            <ion-select-option v-for="role in roles" :key="role.id" :value="role.id">{{
                                role.name
                            }}</ion-select-option>
                        </ion-select>
                    </div>

                    <div class="input-group" v-show="userStore.data.user.id == null">
                        <div class="thumbnail" v-if="userStore.data.user.file_id != null">
                            <ion-thumbnail>
                                <img :src="userStore.data.user.file.url" alt="Image user." />
                            </ion-thumbnail>
                        </div>

                        <div class="file-upload-container">
                            <label class="file-upload-label">
                                <input type="file" class="file-upload-input" @change="handleUpload" />
                                <span class="file-upload-button">Select Image</span>
                            </label>
                        </div>
                    </div>

                    <div class="button-form">
                        <ion-button size="small" expand="block" color="success" @click="handleSubmit">Save</ion-button>
                    </div>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-modal>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonThumbnail,
} from "@ionic/vue";
import { useUserStore } from "../../stores/users";
import { useFileStore } from "../../stores/files";
import { computed } from "vue";

export default {
    components: {
        IonButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonModal,
        IonTitle,
        IonToolbar,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonCard,
        IonCardContent,
        IonThumbnail,
    },
    props: {
        isOpen: Boolean,
        roles: {
            type: Array,
            default: [],
        },
    },
    setup(props, { emit }) {
        const userStore = useUserStore();
        const fileStore = useFileStore();

        const params = computed(() => {
            return {
                include: "role,file",
                username: userStore.data.filter.username,
                role_id: userStore.data.filter.role_id,
                page: 1,
                per_page: userStore.data.infinite_set.per_page,
            };
        });

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await userStore.save(userStore.data.user, userStore.data.user.id);

            await userStore.get(params.value);

            dismissModal();
        };

        const handleUpload = async (event) => {
            const form = new FormData();
            const file = event.target.files;

            for (let i = 0; i < file.length; i++) {
                form.append(`files[${i}]`, file[i]);
            }

            form.append("folder_name", "users");

            await fileStore.upload(form);
            userStore.data.user.file = fileStore.data.file;
            userStore.data.user.file_id = fileStore.data.file.id;
        };

        return { dismissModal, userStore, handleSubmit, handleUpload };
    },
};
</script>
