<template>
    <ion-page id="login-page">
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <div class="text-center">
                        <ion-card-title> POS APP </ion-card-title>
                    </div>
                </ion-card-header>

                <ion-card-content>
                    <div class="input-group">
                        <ion-input
                            label="Username"
                            label-placement="floating"
                            placeholder="Your username"
                            v-model="credential.username"
                        ></ion-input>
                    </div>

                    <div class="input-group">
                        <ion-input
                            label="Password"
                            label-placement="floating"
                            type="password"
                            placeholder="Your password"
                            v-model="credential.password"
                        ></ion-input>
                    </div>

                    <div class="button-form">
                        <ion-button size="small" expand="block" @click="handleSubmit">Login</ion-button>
                    </div>
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
