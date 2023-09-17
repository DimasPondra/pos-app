<template>
    <ion-card>
        <ion-card-content>
            <ion-list>
                <ion-item-sliding v-for="cart in carts" :key="cart.id" @ionSwipe="closeOptions">
                    <ion-item>
                        <ion-label>
                            <h3>{{ cart.product.name }}</h3>
                            <p>{{ cart.amount }} - Rp {{ cart.product.price }}</p>
                        </ion-label>
                    </ion-item>

                    <ion-item-options>
                        <ion-item-option @click="handleEdit(cart.id, $event)" color="tertiary">
                            <ion-icon :icon="pencilOutline"></ion-icon>
                        </ion-item-option>
                        <ion-item-option @click="handleDelete(cart.id, $event)" color="danger">
                            <ion-icon :icon="trashOutline"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>
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
import { pencilOutline, trashOutline } from "ionicons/icons";

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
        carts: {
            type: Array,
            default: [],
        },
    },
    emits: ["handleEdit", "handleDelete"],
    setup(props, context) {
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

        return { handleEdit, handleDelete, closeOptions, pencilOutline, trashOutline };
    },
};
</script>
