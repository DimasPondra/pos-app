<template>
    <ion-card>
        <ion-card-content>
            <ion-list>
                <ion-item-sliding v-for="unit_type in unit_types" :key="unit_type.id" @ionSwipe="closeOptions">
                    <ion-item>
                        <ion-label>
                            <p>{{ unit_type.name }}</p>
                        </ion-label>
                    </ion-item>

                    <ion-item-options>
                        <ion-item-option @click="handleEdit(unit_type.id, $event)" color="tertiary">
                            <ion-icon :icon="pencilOutline"></ion-icon>
                        </ion-item-option>
                        <ion-item-option @click="handleDelete(unit_type.id, $event)" color="danger">
                            <ion-icon :icon="trashOutline"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>

            <div class="centered-container">
                <ion-button
                    shape="round"
                    fill="outline"
                    size="small"
                    v-show="unit_types.length < total"
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
        unit_types: {
            type: Array,
            default: [],
        },
        total: {
            type: Number,
            default: "",
        },
    },
    emits: ["handleLoadMore", "handleEdit", "handleDelete"],
    setup(props, context) {
        const totalItems = computed(() => {
            return props.unit_types.length + " of " + props.total;
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

        return { totalItems, handleLoadMore, handleEdit, handleDelete, closeOptions, pencilOutline, trashOutline };
    },
};
</script>
