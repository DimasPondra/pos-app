<template>
    <ion-card>
        <ion-card-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-input placeholder="Search name" v-model="filter.name"></ion-input>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-button expand="block" size="small" @click="clearFilter">clear</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonInput, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";

export default {
    components: { IonInput, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonButton },
    props: {
        filter: {
            type: Object,
            default: {},
        },
    },
    emits: ["clearFilter"],
    setup(props, { emit }) {
        const clearFilter = () => {
            emit("clearFilter", null);
        };

        return { clearFilter };
    },
};
</script>
