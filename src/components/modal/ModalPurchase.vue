<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="purchaseStore.data.purchase.id == null">Create</ion-title>
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
                                name="date"
                                rules="required"
                                v-slot="{ fieldDate }"
                                v-model="purchaseStore.data.purchase.date"
                            >
                                <ion-input
                                    v-bind="fieldDate"
                                    label="Date *"
                                    label-placement="floating"
                                    placeholder="Enter date"
                                    v-model="purchaseStore.data.purchase.date"
                                    type="date"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="date" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="price"
                                rules="required|integer|min_value:1"
                                v-slot="{ fieldPrice }"
                                v-model="purchaseStore.data.purchase.price"
                            >
                                <ion-input
                                    v-bind="fieldPrice"
                                    label="Price *"
                                    label-placement="floating"
                                    placeholder="Enter price"
                                    v-model="purchaseStore.data.purchase.price"
                                    type="number"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="price" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="amount"
                                rules="required|integer|min_value:1"
                                v-slot="{ fieldAmount }"
                                v-model="purchaseStore.data.purchase.amount"
                            >
                                <ion-input
                                    v-bind="fieldAmount"
                                    label="Amount *"
                                    label-placement="floating"
                                    placeholder="Enter amount"
                                    v-model="purchaseStore.data.purchase.amount"
                                    type="number"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="amount" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="product"
                                rules="required"
                                v-slot="{ fieldProduct }"
                                v-model="purchaseStore.data.purchase.product_id"
                            >
                                <ion-select
                                    v-bind="fieldProduct"
                                    label="Product *"
                                    label-placement="floating"
                                    placeholder="Select a Product"
                                    v-model="purchaseStore.data.purchase.product_id"
                                >
                                    <ion-select-option
                                        v-for="product in products"
                                        :key="product.id"
                                        :value="product.id"
                                        >{{ product.name }}</ion-select-option
                                    >
                                </ion-select>
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="product" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="seller"
                                rules="required"
                                v-slot="{ fieldSeller }"
                                v-model="purchaseStore.data.purchase.seller_id"
                            >
                                <ion-select
                                    v-bind="fieldSeller"
                                    label="Seller *"
                                    label-placement="floating"
                                    placeholder="Select a Seller"
                                    v-model="purchaseStore.data.purchase.seller_id"
                                >
                                    <ion-select-option v-for="seller in sellers" :key="seller.id" :value="seller.id">{{
                                        seller.name
                                    }}</ion-select-option>
                                </ion-select>
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="seller" v-slot="{ message }">
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
import { usePurchaseStore } from "../../stores/purchases";
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
        products: {
            type: Array,
            default: [],
        },
        sellers: {
            type: Array,
            default: [],
        },
    },
    setup(props, { emit }) {
        const purchaseStore = usePurchaseStore();

        const params = computed(() => {
            return {
                include: "product,seller,user",
                page: 1,
                per_page: purchaseStore.data.infinite_set.per_page,
            };
        });

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await purchaseStore.save(purchaseStore.data.purchase, purchaseStore.data.purchase.id);

            await purchaseStore.get(params.value);

            dismissModal();
        };

        return { dismissModal, purchaseStore, handleSubmit };
    },
};
</script>
