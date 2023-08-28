<template>
    <ion-list>
        <ion-list-header>
            <ion-label>Product Types</ion-label>
        </ion-list-header>

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
</template>

<script>
import { IonItem, IonLabel, IonList, IonListHeader, IonItemSliding, IonItemOptions, IonItemOption } from "@ionic/vue";

export default {
    components: { IonItem, IonLabel, IonList, IonListHeader, IonItemSliding, IonItemOptions, IonItemOption },
    props: {
        product_types: {
            type: Array,
            default: [],
        },
    },
    setup(props, context) {
        const handleEdit = (id) => {
            context.emit("handleEdit", id);
        };

        const handleDelete = (id) => {
            context.emit("handleDelete", id);
        };

        return { handleEdit, handleDelete };
    },
};
</script>
