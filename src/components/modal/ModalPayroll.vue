<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="payrollStore.data.payroll.id == null">Create</ion-title>
                <ion-title v-else>Edit</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <Form @submit="handleSubmit">
                        <div class="input-group" v-show="payrollStore.data.payroll.id == null">
                            <Field
                                name="user"
                                rules="required"
                                v-slot="{ fieldUser }"
                                v-model="payrollStore.data.payroll.user_id"
                            >
                                <ion-select
                                    v-bind="fieldUser"
                                    label="User *"
                                    label-placement="floating"
                                    placeholder="Select a User"
                                    v-model="payrollStore.data.payroll.user_id"
                                >
                                    <ion-select-option v-for="user in users" :key="user.id" :value="user.id">{{
                                        user.username
                                    }}</ion-select-option>
                                </ion-select>
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="user" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="payment_date"
                                :rules="rules"
                                v-slot="{ fieldPaymentDate }"
                                v-model="payrollStore.data.payroll.payment_date"
                            >
                                <ion-input
                                    v-bind="fieldPaymentDate"
                                    label="Payment Date"
                                    label-placement="floating"
                                    placeholder="Enter payment date"
                                    v-model="payrollStore.data.payroll.payment_date"
                                    type="date"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="payment_date" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="status"
                                rules="required"
                                v-slot="{ fieldStatus }"
                                v-model="payrollStore.data.payroll.status"
                            >
                                <ion-select
                                    v-bind="fieldStatus"
                                    label="Status *"
                                    label-placement="floating"
                                    placeholder="Select a Status"
                                    v-model="payrollStore.data.payroll.status"
                                >
                                    <ion-select-option value="Pending">Pending</ion-select-option>
                                    <ion-select-option value="Paid">Paid</ion-select-option>
                                </ion-select>
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="status" v-slot="{ message }">
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
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonThumbnail,
} from "@ionic/vue";
import { usePayrollStore } from "../../stores/payrolls";
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
    },
    props: {
        isOpen: Boolean,
        users: {
            type: Array,
            default: [],
        },
    },
    setup(props, { emit }) {
        const payrollStore = usePayrollStore();

        const rules = computed(() => {
            return payrollStore.data.payroll.status == "Paid" ? "required" : "";
        });

        const params = computed(() => {
            return {
                include: "user",
                name: payrollStore.data.filter.name,
                status: payrollStore.data.filter.status,
                month: payrollStore.data.filter.month,
                year: payrollStore.data.filter.year,
                page: 1,
                per_page: payrollStore.data.infinite_set.per_page,
            };
        });

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await payrollStore.save(payrollStore.data.payroll, payrollStore.data.payroll.id);

            await payrollStore.get(params.value);

            dismissModal();
        };

        return { dismissModal, payrollStore, rules, handleSubmit };
    },
};
</script>
