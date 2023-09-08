<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Home">
            <h1>Homepage</h1>
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import { IonPage } from "@ionic/vue";

export default {
    components: { LayoutAdmin, IonPage },
};
</script>
