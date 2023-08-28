<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="productTypeStore.data.product_type.id == null">Create</ion-title>
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
                v-model="productTypeStore.data.product_type.name"
            ></ion-input>

            <ion-button @click="handleSubmit">Save</ion-button>
        </ion-content>
    </ion-modal>
</template>

<script>
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonInput } from "@ionic/vue";
import { useProductTypeStore } from "../../stores/product_types";

export default {
    components: { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonInput },
    props: {
        isOpen: Boolean,
    },
    setup(props, { emit }) {
        const productTypeStore = useProductTypeStore();

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await productTypeStore.save(productTypeStore.data.product_type, productTypeStore.data.product_type.id);

            dismissModal();
        };

        return { dismissModal, productTypeStore, handleSubmit };
    },
};
</script>
