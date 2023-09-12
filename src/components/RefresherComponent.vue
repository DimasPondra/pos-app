<template>
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
</template>

<script>
import { IonRefresher, IonRefresherContent } from "@ionic/vue";

export default {
    components: { IonRefresher, IonRefresherContent },
    setup(props, { emit }) {
        const handleRefresh = (event) => {
            emit("handleRefresh", event);
        };

        return { handleRefresh };
    },
};
</script>
