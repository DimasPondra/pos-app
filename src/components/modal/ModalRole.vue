<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="roleStore.data.role.id == null">Create</ion-title>
                <ion-title v-else>Edit</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-input
                label="Name"
                label-placement="stacked"
                placeholder="Enter name"
                v-model="roleStore.data.role.name"
            ></ion-input>

            <ion-button @click="handleSubmit">Save</ion-button>
        </ion-content>
    </ion-modal>
</template>

<script>
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonInput } from "@ionic/vue";
import { useRoleStore } from "../../stores/roles";

export default {
    components: { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonInput },
    props: {
        isOpen: Boolean,
    },
    setup(props, { emit }) {
        const roleStore = useRoleStore();

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await roleStore.save(roleStore.data.role, roleStore.data.role.id);

            dismissModal();
        };

        return { dismissModal, roleStore, handleSubmit };
    },
};
</script>
