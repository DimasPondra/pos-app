<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="payrollSettingStore.data.payroll_setting.id == null">Create</ion-title>
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
                                v-model="payrollSettingStore.data.payroll_setting.name"
                            >
                                <ion-input
                                    v-bind="fieldName"
                                    label="Name *"
                                    label-placement="floating"
                                    placeholder="Enter name"
                                    v-model="payrollSettingStore.data.payroll_setting.name"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="name" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="nominal"
                                rules="required|integer|min_value:1"
                                v-slot="{ fieldNominal }"
                                v-model="payrollSettingStore.data.payroll_setting.nominal"
                            >
                                <ion-input
                                    v-bind="fieldNominal"
                                    label="Nominal *"
                                    label-placement="floating"
                                    placeholder="Enter nominal"
                                    v-model="payrollSettingStore.data.payroll_setting.nominal"
                                    type="number"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="nominal" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="unit_type"
                                rules="required"
                                v-slot="{ fieldUnitType }"
                                v-model="payrollSettingStore.data.payroll_setting.unit_type_id"
                            >
                                <ion-select
                                    v-bind="fieldUnitType"
                                    label="Unit Type *"
                                    label-placement="floating"
                                    placeholder="Select a Type"
                                    v-model="payrollSettingStore.data.payroll_setting.unit_type_id"
                                >
                                    <ion-select-option
                                        v-for="unit_type in unit_types"
                                        :key="unit_type.id"
                                        :value="unit_type.id"
                                        >{{ unit_type.name }}</ion-select-option
                                    >
                                </ion-select>
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="unit_type" v-slot="{ message }">
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
    IonTextarea,
} from "@ionic/vue";
import { usePayrollSettingStore } from "../../stores/payroll_settings";
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
        unit_types: {
            type: Array,
            default: [],
        },
    },
    setup(props, { emit }) {
        const payrollSettingStore = usePayrollSettingStore();

        const params = computed(() => {
            return {
                include: "unit_type",
                name: payrollSettingStore.data.filter.name,
                unit_type_id: payrollSettingStore.data.filter.unit_type_id,
                page: 1,
                per_page: payrollSettingStore.data.infinite_set.per_page,
            };
        });

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await payrollSettingStore.save(
                payrollSettingStore.data.payroll_setting,
                payrollSettingStore.data.payroll_setting.id
            );

            await payrollSettingStore.get(params.value);

            dismissModal();
        };

        return { dismissModal, payrollSettingStore, handleSubmit };
    },
};
</script>
