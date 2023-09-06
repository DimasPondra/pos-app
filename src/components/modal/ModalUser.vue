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
            <ion-card>
                <ion-card-content>
                    <div class="input-group">
                        <ion-input
                            v-show="userStore.data.user.id == null"
                            label="Username"
                            label-placement="floating"
                            placeholder="Enter username"
                            v-model="userStore.data.user.username"
                        ></ion-input>
                    </div>

                    <div class="input-group">
                        <ion-input
                            label="Password"
                            label-placement="floating"
                            placeholder="Enter password"
                            v-model="userStore.data.user.password"
                            type="password"
                        ></ion-input>
                    </div>

                    <div class="input-group">
                        <ion-select
                            v-show="userStore.data.user.id == null"
                            label="Role"
                            label-placement="floating"
                            placeholder="Select a Role"
                            v-model="userStore.data.user.role_id"
                        >
                            <ion-select-option v-for="role in roles" :key="role.id" :value="role.id">{{
                                role.name
                            }}</ion-select-option>
                        </ion-select>
                    </div>

                    <div class="button-form">
                        <ion-button size="small" expand="block" @click="handleSubmit">Save</ion-button>
                    </div>
                </ion-card-content>
            </ion-card>
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
    IonCard,
    IonCardContent,
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
        IonCard,
        IonCardContent,
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
