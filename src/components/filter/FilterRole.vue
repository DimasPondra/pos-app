<template>
    <ion-input placeholder="Search name" v-model="filter.name"></ion-input>
</template>

<script>
import { IonInput } from "@ionic/vue";

export default {
    components: { IonInput },
    props: {
        filter: {
            type: Object,
            default: {},
        },
    },
};
</script>
