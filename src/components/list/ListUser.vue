<template>
    <ion-card>
        <ion-card-content>
            <ion-list>
                <ion-item-sliding v-for="user in users" :key="user.id" @ionSwipe="closeOptions">
                    <ion-item>
                        <ion-label>
                            <h3>{{ user.username }}</h3>
                            <p>{{ user.role.name }}</p>
                        </ion-label>
                    </ion-item>

                    <ion-item-options>
                        <ion-item-option @click="handleEdit(user.id, $event)" color="tertiary">
                            <ion-icon :icon="pencilOutline"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>

            <div class="centered-container">
                <ion-button
                    shape="round"
                    fill="outline"
                    size="small"
                    v-show="users.length < total"
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
import { pencilOutline } from "ionicons/icons";

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
        users: {
            type: Array,
            default: [],
        },
        total: {
            type: Number,
            default: "",
        },
    },
    emits: ["handleLoadMore", "handleEdit"],
    setup(props, context) {
        const totalItems = computed(() => {
            return props.users.length + " of " + props.total;
        });

        const handleLoadMore = () => {
            context.emit("handleLoadMore");
        };

        const handleEdit = (id, event) => {
            context.emit("handleEdit", id);

            closeOptions(event);
        };

        const closeOptions = (event) => {
            const item = event.target.closest("ion-item-sliding");
            if (item) {
                item.closeOpened();
            }
        };

        return { totalItems, handleLoadMore, handleEdit, closeOptions, pencilOutline };
    },
};
</script>
