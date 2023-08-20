<template>
    <ion-page>
        <ion-content>
            <ion-button @click="handleLogout">logout</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { useAuthStore } from "../stores/auth";

export default {
    components: { IonPage, IonContent, IonButton },
    setup() {
        const authStore = useAuthStore();

        const handleLogout = async () => {
            await authStore.logout();
        };

        return { handleLogout };
    },
};
</script>
