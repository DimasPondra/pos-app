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
                    <Form @submit="handleSubmit">
                        <div class="input-group">
                            <Field
                                name="username"
                                rules="required|max:255"
                                v-slot="{ fieldUsername }"
                                v-model="credential.username"
                            >
                                <ion-input
                                    v-bind="fieldUsername"
                                    label="Username *"
                                    label-placement="floating"
                                    placeholder="Your username"
                                    v-model="credential.username"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="username" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="password"
                                rules="required|min:6|max:12"
                                v-slot="{ fieldPassword }"
                                v-model="credential.password"
                            >
                                <ion-input
                                    v-bind="fieldPassword"
                                    label="Password *"
                                    label-placement="floating"
                                    placeholder="Your password"
                                    type="password"
                                    v-model="credential.password"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="password" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="button-form">
                            <ion-button type="submit" size="small" expand="block">Login</ion-button>
                        </div>
                    </Form>
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
