<template>
    <ion-page>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title> Card Title </ion-card-title>
                    <ion-card-subtitle> Card Subtitle </ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    <ion-input label="Username :" placeholder="Your email" v-model="credential.username"></ion-input>
                    <ion-input
                        label="Password :"
                        type="password"
                        placeholder="Your password"
                        v-model="credential.password"
                    ></ion-input>
                    <ion-button @click="handleSubmit">Login</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonInput,
    IonButton,
} from "@ionic/vue";
import { reactive } from "vue";
import { useAuthStore } from "../stores/auth";

export default {
    components: {
        IonPage,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonInput,
        IonButton,
    },
    setup() {
        const credential = reactive({
            username: "",
            password: "",
        });

        const authStore = useAuthStore();

        const handleSubmit = async () => {
            await authStore.login(credential);
        };

        return { credential, handleSubmit };
    },
};
</script>
