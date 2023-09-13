<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="salaryStore.data.salary.id == null">Create</ion-title>
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
                                name="nominal"
                                rules="required|integer|min_value:1"
                                v-slot="{ fieldNominal }"
                                v-model="salaryStore.data.salary.nominal"
                            >
                                <ion-input
                                    v-bind="fieldNominal"
                                    label="Nominal *"
                                    label-placement="floating"
                                    placeholder="Enter nominal"
                                    v-model="salaryStore.data.salary.nominal"
                                    type="number"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="nominal" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="role"
                                rules="required"
                                v-slot="{ fieldRole }"
                                v-model="salaryStore.data.salary.role_id"
                            >
                                <ion-select
                                    v-bind="fieldRole"
                                    label="Role *"
                                    label-placement="floating"
                                    placeholder="Select a Role"
                                    v-model="salaryStore.data.salary.role_id"
                                >
                                    <ion-select-option v-for="role in roles" :key="role.id" :value="role.id">{{
                                        role.name
                                    }}</ion-select-option>
                                </ion-select>
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="role" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="button-form">
                            <ion-button type="submit" size="small" expand="block" color="success">Save</ion-button>
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
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonThumbnail,
    IonTextarea,
} from "@ionic/vue";
import { useSalaryStore } from "../../stores/salaries";
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
        IonSelect,
        IonSelectOption,
        IonCard,
        IonCardContent,
        IonThumbnail,
        IonTextarea,
    },
    props: {
        isOpen: Boolean,
        roles: {
            type: Array,
            default: [],
        },
    },
    setup(props, { emit }) {
        const salaryStore = useSalaryStore();

        const params = computed(() => {
            return {
                include: "role",
                page: 1,
                per_page: salaryStore.data.infinite_set.per_page,
            };
        });

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await salaryStore.save(salaryStore.data.salary, salaryStore.data.salary.id);

            await salaryStore.get(params.value);

            dismissModal();
        };

        return { dismissModal, salaryStore, handleSubmit };
    },
};
</script>
