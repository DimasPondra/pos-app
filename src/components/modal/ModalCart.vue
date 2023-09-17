<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="cartStore.data.cart.id == null">Create</ion-title>
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
                            <ion-input
                                label="Product"
                                label-placement="floating"
                                :value="productStore.data.product.name"
                                disabled
                            />
                        </div>

                        <div class="input-group">
                            <Field
                                name="amount"
                                rules="required|integer|min_value:1"
                                v-slot="{ fieldAmount }"
                                v-model="cartStore.data.cart.amount"
                            >
                                <ion-input
                                    v-bind="fieldAmount"
                                    label="Amount *"
                                    label-placement="floating"
                                    placeholder="Enter amount"
                                    v-model="cartStore.data.cart.amount"
                                    type="number"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="amount" v-slot="{ message }">
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
import { computed } from "vue";
import { useCartStore } from "../../stores/carts";
import { useProductStore } from "../../stores/products";

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
    },
    setup(props, { emit }) {
        const cartStore = useCartStore();
        const productStore = useProductStore();

        const params = computed(() => {
            return {
                include: "product",
            };
        });

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await cartStore.save(cartStore.data.cart, cartStore.data.cart.id);

            await cartStore.get(params.value);
            productStore.clear();

            dismissModal();
        };

        return { dismissModal, cartStore, productStore, handleSubmit };
    },
};
</script>
