<template>
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
        <ion-button shape="round" fill="outline" size="small" v-show="users.length < total" @click="handleLoadMore"
            >load more</ion-button
        >
    </div>
    <ion-label>{{ totalItems }}</ion-label>
</template>

<script>
import { IonItem, IonLabel, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonButton } from "@ionic/vue";
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

<style scoped>
.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
