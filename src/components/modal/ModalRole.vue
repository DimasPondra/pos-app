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
            <ion-card>
                <ion-card-content>
                    <Form @submit="handleSubmit">
                        <div class="input-group">
                            <Field
                                name="name"
                                rules="required|max:255"
                                v-slot="{ fieldName }"
                                v-model="roleStore.data.role.name"
                            >
                                <ion-input
                                    v-bind="fieldName"
                                    label="Name *"
                                    label-placement="floating"
                                    placeholder="Enter name"
                                    v-model="roleStore.data.role.name"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="name" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="button-form">
                            <ion-button type="submit" size="small" expand="block">Save</ion-button>
                        </div>
                    </Form>
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
    IonCard,
    IonCardContent,
} from "@ionic/vue";
import { useRoleStore } from "../../stores/roles";
import { computed } from "vue";

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
        IonCard,
        IonCardContent,
    },
    props: {
        isOpen: Boolean,
    },
    setup(props, { emit }) {
        const roleStore = useRoleStore();

        const params = computed(() => {
            return {
                name: roleStore.data.filter.name,
                page: 1,
                per_page: roleStore.data.infinite_set.per_page,
            };
        });

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await roleStore.save(roleStore.data.role, roleStore.data.role.id);

            await roleStore.get(params.value);

            dismissModal();
        };

        return { dismissModal, roleStore, handleSubmit };
    },
};
</script>
