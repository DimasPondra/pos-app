<template>
    <ion-card>
        <ion-card-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-input placeholder="Search name" v-model="filter.name"></ion-input>
                    </ion-col>

                    <ion-col>
                        <ion-select placeholder="Select a Status" v-model="filter.status">
                            <ion-select-option value="Pending">Pending</ion-select-option>
                            <ion-select-option value="Paid">Paid</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-input placeholder="Search month" v-model="filter.month"></ion-input>
                    </ion-col>

                    <ion-col>
                        <ion-input placeholder="Search year" v-model="filter.year"></ion-input>
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
import {
    IonInput,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonCard,
    IonCardContent,
} from "@ionic/vue";

export default {
    components: { IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardContent },
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
