<template>
    <ion-menu content-id="admin-main-content">
        <ion-header>
            <ion-toolbar>
                <ion-title>Admin</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list lines="none">
                <ion-item>
                    <ion-label router-link="/home">Home</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label router-link="/product-type">Product Type</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script>
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from "@ionic/vue";
import { useRouter } from "vue-router";

export default {
    components: { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel },
    setup() {
        const router = useRouter();

        const changePage = (url) => {
            router.push(url);
        };

        return { changePage };
    },
};
</script>
