<template>
    <ion-card>
        <ion-card-content>
            <ion-list>
                <ion-item-sliding v-for="transaction in transactions" :key="transaction.id" @ionSwipe="closeOptions">
                    <ion-item>
                        <ion-label>
                            <h3>{{ transaction.details.length }} item</h3>
                            <p>Rp {{ transaction.total }}</p>
                        </ion-label>
                    </ion-item>

                    <ion-item-options>
                        <ion-item-option @click="handleShow(transaction.id, $event)" color="tertiary">
                            <ion-icon :icon="eyeOutline"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>

            <div class="centered-container">
                <ion-button
                    shape="round"
                    fill="outline"
                    size="small"
                    v-show="transactions.length < total"
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
    IonIcon,
} from "@ionic/vue";
import { computed } from "vue";
import { eyeOutline } from "ionicons/icons";

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
        transactions: {
            type: Array,
            default: [],
        },
        total: {
            type: Number,
            default: "",
        },
    },
    emits: ["handleLoadMore", "handleShow"],
    setup(props, context) {
        const totalItems = computed(() => {
            return props.transactions.length + " of " + props.total;
        });

        const handleLoadMore = () => {
            context.emit("handleLoadMore");
        };

        const handleShow = (id, event) => {
            context.emit("handleShow", id);

            closeOptions(event);
        };

        const closeOptions = (event) => {
            const item = event.target.closest("ion-item-sliding");
            if (item) {
                item.closeOpened();
            }
        };

        return {
            totalItems,
            handleLoadMore,
            handleShow,
            closeOptions,
            eyeOutline,
        };
    },
};
</script>
