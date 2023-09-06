<template>
    <ion-card>
        <ion-card-content>
            <ion-list>
                <ion-item-sliding v-for="user in users" :key="user.id">
                    <ion-item>
                        <ion-label>{{ user.username }}</ion-label>
                    </ion-item>

                    <ion-item-options>
                        <ion-item-option @click="handleEdit(user.id)">Edit</ion-item-option>
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
} from "@ionic/vue";
import { computed } from "vue";

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

        const handleEdit = (id) => {
            context.emit("handleEdit", id);
        };

        return { totalItems, handleLoadMore, handleEdit };
    },
};
</script>
