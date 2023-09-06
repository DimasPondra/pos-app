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
            <ion-input
                v-show="userStore.data.user.id == null"
                label="Username"
                label-placement="stacked"
                placeholder="Enter username"
                v-model="userStore.data.user.username"
            ></ion-input>

            <ion-input
                label="Password"
                label-placement="stacked"
                placeholder="Enter password"
                v-model="userStore.data.user.password"
                type="password"
            ></ion-input>

            <ion-select
                v-show="userStore.data.user.id == null"
                label="Role"
                label-placement="stacked"
                placeholder="Select a Role"
                v-model="userStore.data.user.role_id"
            >
                <ion-select-option v-for="role in roles" :key="role.id" :value="role.id">{{
                    role.name
                }}</ion-select-option>
            </ion-select>

            <ion-button @click="handleSubmit">Save</ion-button>
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
} from "@ionic/vue";
import { useUserStore } from "../../stores/users";

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

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await userStore.save(userStore.data.user, userStore.data.user.id);

            dismissModal();
        };

        return { dismissModal, userStore, handleSubmit };
    },
};
</script>
