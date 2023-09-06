<template>
    <ion-card>
        <ion-card-content>
            <ion-list>
                <ion-item-sliding v-for="role in roles" :key="role.id">
                    <ion-item>
                        <ion-label>{{ role.name }}</ion-label>
                    </ion-item>

                    <ion-item-options>
                        <ion-item-option @click="handleEdit(role.id)">Edit</ion-item-option>
                        <ion-item-option @click="handleDelete(role.id)" color="danger">Delete</ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>

            <div class="centered-container">
                <ion-button
                    shape="round"
                    fill="outline"
                    size="small"
                    v-show="roles.length < total"
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
        roles: {
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
            return props.roles.length + " of " + props.total;
        });

        const handleLoadMore = () => {
            context.emit("handleLoadMore");
        };

        const handleEdit = (id) => {
            context.emit("handleEdit", id);
        };

        const handleDelete = (id) => {
            context.emit("handleDelete", id);
        };

        return { totalItems, handleLoadMore, handleEdit, handleDelete };
    },
};
</script>
