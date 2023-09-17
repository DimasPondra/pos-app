<template>
    <ion-card>
        <ion-card-content>
            <ion-list>
                <ion-item-sliding v-for="product in products" :key="product.id" @ionSwipe="closeOptions">
                    <ion-item>
                        <ion-label>
                            <h3>{{ product.name }}</h3>
                            <p>{{ product.amount }} items - Rp {{ product.price }}</p>
                        </ion-label>
                    </ion-item>

                    <ion-item-options v-if="add_cart == false">
                        <ion-item-option @click="handleEdit(product.id, $event)" color="tertiary">
                            <ion-icon :icon="pencilOutline"></ion-icon>
                        </ion-item-option>
                        <ion-item-option @click="handleDelete(product.id, $event)" color="danger">
                            <ion-icon :icon="trashOutline"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                    <ion-item-options v-else>
                        <ion-item-option @click="handleAddToCart(product.id, $event)">
                            <ion-icon :icon="addOutline"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>

            <div class="centered-container">
                <ion-button
                    shape="round"
                    fill="outline"
                    size="small"
                    v-show="products.length < total"
                    @click="handleLoadMore"
                    >load more</ion-button
                >
            </div>
            <div class="text-center">
                <ion-label>{{ totalItems }}</ion-label>
            </div>
        </ion-card-content>
    </ion-card>
</template>

<script>
import {
    IonItem,
    IonLabel,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonButton,
    IonCard,
    IonCardContent,
    alertController,
    IonIcon,
} from "@ionic/vue";
import { computed } from "vue";
import { pencilOutline, trashOutline, addOutline } from "ionicons/icons";

export default {
    components: {
        IonItem,
        IonLabel,
        IonList,
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
        IonButton,
        IonCard,
        IonCardContent,
        IonIcon,
    },
    props: {
        products: {
            type: Array,
            default: [],
        },
        total: {
            type: Number,
            default: "",
        },
        add_cart: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["handleLoadMore", "handleEdit", "handleDelete", "handleAddToCart"],
    setup(props, context) {
        const totalItems = computed(() => {
            return props.products.length + " of " + props.total;
        });

        const handleLoadMore = () => {
            context.emit("handleLoadMore");
        };

        const handleEdit = (id, event) => {
            context.emit("handleEdit", id);

            closeOptions(event);
        };

        const handleDelete = async (id, event) => {
            const alert = await alertController.create({
                header: "Are you sure?",
                message: "you won't be able to revert this!",
                backdropDismiss: false,
                buttons: [
                    {
                        text: "Cancel",
                        role: "cancel",
                    },
                    {
                        text: "OK",
                        role: "confirm",
                        handler: () => {
                            context.emit("handleDelete", id);
                        },
                    },
                ],
            });

            await alert.present();

            closeOptions(event);
        };

        const closeOptions = (event) => {
            const item = event.target.closest("ion-item-sliding");
            if (item) {
                item.closeOpened();
            }
        };

        const handleAddToCart = (id, event) => {
            context.emit("handleAddToCart", id);

            closeOptions(event);
        };

        return {
            totalItems,
            handleLoadMore,
            handleEdit,
            handleDelete,
            handleAddToCart,
            closeOptions,
            pencilOutline,
            trashOutline,
            addOutline,
        };
    },
};
</script>
