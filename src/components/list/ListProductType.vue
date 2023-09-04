<template>
    <ion-list>
        <ion-item-sliding v-for="product_type in product_types" :key="product_type.id">
            <ion-item>
                <ion-label>{{ product_type.name }}</ion-label>
            </ion-item>

            <ion-item-options>
                <ion-item-option @click="handleEdit(product_type.id)">Edit</ion-item-option>
                <ion-item-option @click="handleDelete(product_type.id)" color="danger">Delete</ion-item-option>
            </ion-item-options>
        </ion-item-sliding>
    </ion-list>

    <div class="centered-container">
        <ion-button
            shape="round"
            fill="outline"
            size="small"
            v-show="product_types.length < total"
            @click="handleLoadMore"
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
        product_types: {
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
            return props.product_types.length + " of " + props.total;
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

<style scoped>
.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
