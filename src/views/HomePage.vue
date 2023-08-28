<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Home">
            <h1>Homepage</h1>
            <ion-button router-link="/">Home</ion-button>
            <ion-button router-link="/product-type">Product Type</ion-button>
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import { IonPage, IonButton } from "@ionic/vue";

export default {
    components: { LayoutAdmin, IonPage, IonButton },
};
</script>
