<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="unitTypeStore.data.unit_type.id == null">Create</ion-title>
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
                                v-model="unitTypeStore.data.unit_type.name"
                            >
                                <ion-input
                                    v-bind="fieldName"
                                    label="Name *"
                                    label-placement="floating"
                                    placeholder="Enter name"
                                    v-model="unitTypeStore.data.unit_type.name"
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
import { useUnitTypeStore } from "../../stores/unit_types";
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
        const unitTypeStore = useUnitTypeStore();

        const params = computed(() => {
            return {
                name: unitTypeStore.data.filter.name,
                page: 1,
                per_page: unitTypeStore.data.infinite_set.per_page,
            };
        });

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await unitTypeStore.save(unitTypeStore.data.unit_type, unitTypeStore.data.unit_type.id);

            await unitTypeStore.get(params.value);

            dismissModal();
        };

        return { dismissModal, unitTypeStore, handleSubmit };
    },
};
</script>
